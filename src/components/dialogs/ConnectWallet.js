import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useChain, useMoralis } from 'react-moralis';
import useUserInitialize from '../../hooks/useUserInitialize';

import vvLogo from '../../assets/vv-logo.png';
import metamaskLogo from '../../assets/metamask.svg';

export default function ConnectWallet({open, onClose}) {
  const {enableWeb3, Moralis, user, authenticate} = useMoralis();
  const { chainId } = useChain();
  const { initUser } = useUserInitialize();

  const connectWallet = async () => {
    await authenticate({
      signingMessage: "Sign into Vegas Vickie NFT",

      onComplete: async (user) => {
        console.log("Authenticated User through Metamask", user);
        
        initUser()

        onClose();
      },

      onError: (error) => {
        console.error('ERROR IN AUTH:', error);
      },

      onSuccess: (obj) => {
        console.info('SUCCESS IN AUTH:', obj);
      }
    })
  };

  const connectWalletConnect = async () => {
    await authenticate({
      provider: "walletconnect",

      onComplete: async (user) => {
        console.log("Authenticated User through walletconnect", user);
        
        // save the email and provider to User object, optionally check if already set
        // user.set('email', email)
        user.set('provider', 'magicLink')
        user.save()
        initUser()

        onClose();
      },

      onError: (error) => {
        console.log('ERROR IN AUTH:', error);
      },

      onSuccess: (obj) => {
        console.log('SUCCESS IN AUTH:', obj);
      }
    })
  };

  const connectWeb3Auth = async () => {
    onClose();

    // TODO: Remove hardcoded chainId
    authenticate({
      provider: "web3Auth",
      clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT_ID,
      chainId: '0x4',
      theme: 'light',
      appLogo: vvLogo,

      onComplete: async (obj) => {
        console.log("Authenticated User through Web3Auth", user);
        
        if(user) {
          // save the email and provider to User object, optionally check if already set
          // user.set('email', email)
          user.set('provider', 'magicLink')
          user.save()
        }
        initUser()


        onClose();
      },

      onError: (error) => {
        console.log('ERROR IN AUTH:', error);
      },

      onSuccess: (obj) => {
        console.log('SUCCESS IN AUTH:', obj);
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
                  <div className="mt-2">
                    <button onClick={connectWallet} className="flex items-center justify-start px-4 py-2 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full">MetaMask<img src={metamaskLogo}/></button>
                    <button onClick={connectWalletConnect} className="flex items-center justify-start px-4 py-2 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full">WalletConnect</button>
                    <button onClick={connectWeb3Auth} className="flex items-center justify-start px-4 py-2 border text-base font-medium rounded-md text-black bg-stone-200 hover:bg-stone-200 hover:text-black mx-auto mt-2 border-1 border-stone-400 hover:border-vickie-yellow w-full">Web3 Auth</button>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
