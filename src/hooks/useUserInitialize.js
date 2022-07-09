import {useMoralis} from 'react-moralis';
import CoinbaseWalletWeb3Connector from '../lib/moralis/CoinbaseWalletWeb3Connector';
import {useFlagsmith} from 'flagsmith/react';
import useNetwork from "./useNetwork.js";

function useUserInitialize() {
  const {Moralis, user, enableWeb3, isWeb3EnableLoading, logout} = useMoralis();
  const flagsmith = useFlagsmith();
  const {chainId} = useNetwork();

  const initUser = async function() {
    if (user && !Moralis.ensureWeb3IsInstalled() && !isWeb3EnableLoading) {
      const userProvider = user.get('provider');
      let providerOptions;
      switch (userProvider) {
        case 'web3Auth':
          providerOptions = {
            provider: 'web3Auth',
            chainId: chainId,
            theme: 'light'
          }
          break
        case 'coinbasewallet':
          providerOptions = {
            connector: CoinbaseWalletWeb3Connector,
            provider: 'coinbasewallet',
            chainId: chainId
          }
          break
        default:
          // metamask
          providerOptions = {
            chainId: chainId
          }
      }
      
      try {
        console.log(providerOptions);
        await enableWeb3(providerOptions)
      } catch (err) {
        console.log(err);
      }
    }

    if(user) {
      flagsmith.identify(user.get("username"));
      flagsmith.setTrait('walletID', user.get("ethAddress"));
    }

    const unsubscribe = Moralis.onChainChanged((chain) => {
      console.log('chain changed to', chain);
      if (chain != chainId) {
        console.log("Chain changed to unsupported chain, logging out");
        logout();
      }
    });

    // Subscribe to onDisconnect events
    const unsubscribeDisconnect = Moralis.onDisconnect(async (error) => {
      console.log("Disconnected");
      console.log(error);
      // returns a ProviderRpcError
      await logout();
    });

    // Unsubscribe to onDisconnect events
    // unsubscribe();
  }

  return {
    initUser
  }
}

export default useUserInitialize;