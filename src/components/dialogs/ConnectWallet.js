import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useChain, useMoralis } from 'react-moralis';
import useUserInitialize from '../../hooks/useUserInitialize';
import CoinbaseWalletWeb3Connector from '../../lib/moralis/CoinbaseWalletWeb3Connector';

import vvLogo from '../../assets/vv-logo.png';
import metamaskLogo from '../../assets/metamask.png';
import walletConnectLogo from '../../assets/walletconnect-logo.svg';

export default function ConnectWallet({open, onClose}) {
  const {user, authenticate} = useMoralis();
  const { chainId } = useChain();
  const { initUser } = useUserInitialize();

  const connectWallet = async () => {
    await authenticate({
      chainId: chainId,
      signingMessage: "Sign into Vegas Vickie NFT",

      onComplete: async (user) => {
        console.log("Authenticated User through Metamask", user);
        
        initUser();
        onClose();
      },

      onError: (error) => {
        console.error('ERROR IN AUTH:', error);
      },

      onSuccess: (obj) => {
        console.info('SUCCESS IN AUTH:', obj);
      }
    });
  };

  const connectWalletConnect = async () => {
    await authenticate({
      provider: "walletconnect",
      chainId: chainId,

      onComplete: async (user) => {
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
    let user = await authenticate({
      connector: CoinbaseWalletWeb3Connector,
      chainId: chainId,
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

    user.set('provider', 'Coinbasewallet');
    user.save();

    initUser();
    onClose();
  };

  const connectWeb3Auth = async () => {
    onClose();

    authenticate({
      provider: "web3Auth",
      clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT_ID,
      chainId: chainId,
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
                    <button onClick={connectWallet} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>MetaMask</span><img src={metamaskLogo} className="w-6"/></button>
                    <button onClick={connectWalletConnect} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full"><span>WalletConnect</span><img src={walletConnectLogo} className="w-6"/></button>
                    <button onClick={connectWeb3Auth} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full">Web3Auth</button>
                    <button onClick={connectCoinbaseWallet} className="flex items-center justify-between px-4 py-4 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full">Coinbase</button>
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
