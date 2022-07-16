
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline'
import { useMoralis } from "react-moralis";

import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useFlags } from 'flagsmith/react';
import ConnectWallet from '../dialogs/ConnectWallet';

import vvLogo from '../../assets/vv-logo-small.png';
import vvLogoWebP from '../../assets/vv-logo-small_lossyalpha.webp';

function Header({showLogo=true}) {
  const {isAuthenticated, login, logout, user} = useMoralis();
  const flags = useFlags(['perks_and_benefits']);
  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  let navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" },
    { name: 'Perks & Benefits', link: "/perks" },
    { name: 'Our Story', link: "/story" },
    { name: 'Mint', link: "/mint" },
    { name: 'Leaderboard', link: "/leaderboard", beta: true},
  ];

  return (
    <header className="col-span-12 flex flex-col bg-black border-b-2 border-[#130E04]">
      <Disclosure as="nav" >
        {({ open }) => (
          <>
            <div className="relative flex justify-between h-16 sm:h-full">
              <div className="absolute inset-y-0 left-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex h-20 w-full">
                {showLogo && (
                <div className="hidden shrink-0 sm:flex sm:flex-col md:flex-row place-content-center content-center justify-center align-center">
                  <picture>
                    <source srcSet={`${vvLogoWebP} 744w`} type="image/webp" />
                    <img src={vvLogo} alt="Vegas Vickie Logo" className="h-12 sm:h-20 aspect-[417/112]" />
                  </picture>
                </div>
                )}
                <div className="hidden sm:flex grow sm:space-x-8 font-display justify-center justify-self-stretch font-gilroy uppercase">
                  <ul className="flex flex-inital text-white font-bold leading-6 w-full justify-center">
                    {navItems.map((item, index) => (
                      <li key={index} className={`flex flex-col justify-center relative`}>
                        <NavLink
                          to={item.link}
                          className={({isActive}) =>
                                      "block p-3 w-full h-full align-middle flex flex-row items-center justify-center hover:text-vickie-yellow " + (isActive ? "text-vickie-yellow" : "text-white")
                                    }
                        >
                        {item.name}
                        {item.beta && <span className="text-xs bg-vickie-yellow text-black px-1 py-0.5 rounded h-5 ml-1">Beta</span>}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                {isAuthenticated && (
                <div className="flex w-full sm:w-1/4 flex-row justify-end sm:justify-center items-center border-l border-stone-600 bg-stone-900 p-2">
                  <>
                    <div className="inline-flex items-center justify-center p-2 rounded-md text-stone-400">
                      <span className="sr-only">Open main menu</span>
                      <UserCircleIcon className="block h-6 w-6" aria-hidden="true" />
                      <span className="block w-36 truncate pl-1">{user.get("ethAddress")}</span>
                    </div>
                    <div className="hidden sm:flex">
                      <div className="pt-1 pb-2 space-y-1">
                          <button
                            className="w-auto flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white uppercase bg-stone-600 hover:bg-white hover:text-black mx-auto text-sm"
                            onClick={ () => { logout() }}
                          >
                            Log out
                          </button>
                      </div>
                    </div>
                  </>
                </div>
                )}
                {!isAuthenticated && (
                <div className="flex w-full sm:w-1/4 flex-row justify-end sm:justify-center items-center border-l border-stone-600 bg-stone-900 p-2">
                  <>
                    <div className="hidden sm:flex">
                      <div className="pt-1 pb-2 space-y-1">
                          <button
                            className="w-auto flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white uppercase bg-stone-600 hover:bg-white hover:text-black mx-auto text-sm"
                            onClick={ () => setIsConnectWalletOpen(true) }
                          >
                            Login with Wallet
                          </button>
                      </div>
                    </div>
                  </>
                </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-1 pb-2 space-y-1">
                {navItems.map((item, index) => (
                  <Disclosure.Button
                    as="div"
                    className="bg-gray-900 text-white block pl-3 pr-4 py-2 font-gilroy uppercase text-base font-medium"
                    key={index}
                  >
                    <Link to={item.link} className="w-full">
                    {item.name}
                    </Link>
                  </Disclosure.Button>
                ))}
                {isAuthenticated && (
                  <Disclosure.Button
                    as="a"
                    className="bg-gray-900 text-white block pl-3 pr-4 py-2 font-gilroy uppercase text-base font-medium"
                    onClick={ () => { logout() }}
                  >
                    Log out
                  </Disclosure.Button>
                )}
                {!isAuthenticated && (
                  <button
                    className="w-auto bg-gray-900 text-white block pl-3 pr-4 py-2 font-gilroy uppercase text-base font-medium"
                    onClick={ () => setIsConnectWalletOpen(true) }
                  >
                    Login
                  </button>
                )}
              </div>
            </Disclosure.Panel>
          </>
      )}
      </Disclosure>

      <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />
    </header>
  )
}

export default Header;