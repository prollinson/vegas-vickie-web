
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { useMoralis } from "react-moralis";

import { Link } from 'react-router-dom';

function Header() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" }
  ]

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log into Vegas Vickie NFT" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });  
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <header className="flex flex-col bg-black border-b border-white">
      <Disclosure as="nav" >
        {({ open }) => (
          <>
            <div className="relative flex justify-between h-16 sm:h-auto">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex-cols items-center justify-center">
                <div className="flex items-center justify-center">
                  <h1 className="font-gilroy black uppercase text-3xl tracking-widest text-white text-center pt-3">Vegas Vickie NFT</h1>
                </div>
                <div className="hidden sm:flex sm:space-x-8 font-display justify-center font-gilroy uppercase">
                  <ul className="flex flex-inital text-white">
                    {navItems.map((item, index) => (
                      <li key={index} className="p-3 hover:text-vickie-yellow"><Link to={item.link}>{item.name}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6 justify-center mr-6">
                { !isAuthenticated && (
                  <button onClick={login} className='flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-black font-bold bg-vickie-yellow hover:bg-vickie-yellow md:py-1 md:text-md md:px-4 uppercase font-gilroy'>Login</button>
                )}
                { isAuthenticated && (
                  <>
                    <p className="text-white">Wallet: {user.get("ethAddress")}</p>
                    <button onClick={logOut} disabled={isAuthenticating} className='w-32 flex items-center justify-center p-1 border border-transparent text-base font-medium rounded-md text-black bg-gray-600 hover:bg-vickie-yellow'>Logout</button>
                  </>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-1 pb-2 space-y-1">
                {navItems.map((item, index) => (
                  <Disclosure.Button
                    as="a"
                    href={item.link}
                    className="bg-gray-900 text-white block pl-3 pr-4 py-2 border-l-4 font-gilroy uppercase text-base font-medium"
                    key={index}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
      )}
      </Disclosure>


    </header>
  )
}

export default Header;