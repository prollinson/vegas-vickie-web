import {useChain, useMoralis} from 'react-moralis';
import {chainId as supportedChainId} from '../contracts.config.js';
import CoinbaseWalletWeb3Connector from '../lib/moralis/CoinbaseWalletWeb3Connector';

function useUserInitialize() {
  const {Moralis, user, enableWeb3, disableWeb3, logout} = useMoralis();
  const {chainId} = useChain();

  const initUser = async function() {
    if (user && !Moralis.ensureWeb3IsInstalled()) {
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
            chainId: supportedChainId
          }
      }
      
      try {
        console.log(providerOptions);
        await enableWeb3(providerOptions)
      } catch (err) {
        console.log(err);
      }
    }

    const unsubscribe = Moralis.onChainChanged((chain) => {
      if (chain != supportedChainId) {
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