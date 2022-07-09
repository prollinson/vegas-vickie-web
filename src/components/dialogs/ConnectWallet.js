import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useMoralis } from 'react-moralis';
import useUserInitialize from '../../hooks/useUserInitialize';
import CoinbaseWalletWeb3Connector from '../../lib/moralis/CoinbaseWalletWeb3Connector';
import useNetwork from '../../hooks/useNetwork.js';

import vvLogo from '../../assets/vv-logo.png';
import metamaskLogo from '../../assets/metamask.png';
import walletConnectLogo from '../../assets/walletconnect-logo.svg';
import coinbaseLogo from '../../assets/coinbase-c-logo.png';

import { useFlags } from 'flagsmith/react';

export default function ConnectWallet({open, onClose}) {
  const {user, authenticate} = useMoralis();
  const { initUser } = useUserInitialize();
  const {chainId} = useNetwork();

  // feature flags
  const flags = useFlags(['coinbase_wallet']);

  const connectMetamaskWallet = async () => {
    console.log(parseInt(chainId, 16));
    await authenticate({
      chainId: parseInt(chainId, 16),
      signingMessage: "Sign into Vegas Vickie NFT",

      onError: (error) => {
        console.error('ERROR IN AUTH:', error);
      },

      onSuccess: (obj) => {
        console.log("Authenticated User through Metamask", user);
        
        initUser();
        onClose();
      }
    });
  };

  const connectWalletConnect = async () => {
    console.log(chainId);
    await authenticate({
      provider: "walletconnect",
      chainId: parseInt(chainId, 16),

      onSuccess: async (user) => {
        console.log("Authenticated User through walletconnect", user);
        
        // save the email and provider to User object, optionally check if already set
        // user.set('email', email)
        user.set('provider', 'walletconnect')
        user.save()
        initUser()

        onClose();
      },

      onError: (error) => {
        console.log('ERROR IN AUTH:', error);
      }
    })
  };

  const connectCoinbaseWallet = async () => {
    console.log(parseInt(chainId, 16));
    console.log("Network id:", parseInt(chainId, 16));
    let user = await authenticate({
      connector: CoinbaseWalletWeb3Connector,
      chainId: parseInt(chainId, 16),
      // Moralis
      signingMessage: "Sign into Vegas Vickie NFT",
      // CoinbaseWallet config
      appName: 'Vegas Vickie NFT',
      appLogoUrl: 'https://example.com/logo.png',
      darkMode: true,

      onError: (error) => {
        console.log('ERROR IN AUTH:', error);
      }
    });

    console.log("Authenticated User through CoinbaseWallet", user);

    user.set('provider', 'coinbasewallet');
    user.save();

    initUser();
    onClose();
  };

  const connectWeb3Auth = async () => {
    onClose();

    authenticate({
      provider: "web3Auth",
      clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT_ID,
      chainId: parseInt(chainId, 16),
      theme: 'light',
      appLogo: vvLogo,

      onComplete: async (obj) => {        
        if(user) {
          user.set('provider', 'web3Auth')
          user.save()
        }
        initUser()

        onClose();
      },

      onError: (error) => {
        console.log('ERROR IN AUTH:', error);
      }
    });
  };

  

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Connect Wallet
                  </Dialog.Title>
                  <p></p>
                  <div className="mt-2">
                    <button onClick={connectMetamaskWallet} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>MetaMask</span><img src={metamaskLogo} className="w-6"/></button>
                    <button onClick={connectWalletConnect} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>WalletConnect</span><img src={walletConnectLogo} className="w-6"/></button>
                    {flags.coinbase_wallet.enabled && (
                      <button onClick={connectCoinbaseWallet} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>Coinbase</span><img src={coinbaseLogo} className="w-6"/></button>
                    )}
                    <button onClick={connectWeb3Auth} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>Web3Auth</span></button>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-stone-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
