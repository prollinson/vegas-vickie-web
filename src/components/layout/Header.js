
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline'
import { useMoralis } from "react-moralis";

import { Link } from 'react-router-dom';
import { useFlags } from 'flagsmith/react';

import vvLogo from '../../assets/vv-logo-small.png';
import vvLogoWebP from '../../assets/vv-logo-small_lossyalpha.webp';

function Header() {
  const {isAuthenticated, logout, user} = useMoralis();
  const flags = useFlags(['perks_and_benefits']);

  let navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" },
    { name: 'Our Story', link: "/story" },
    { name: 'Mint', link: "/mint" }
  ];

  if(flags.perks_and_benefits.enabled) {
    navItems = [
      { name: 'Home', link: "/" },
      { name: 'Collections', link: "/collections" },
      { name: 'Perks & Benefits', link: "/perks" },
      { name: 'Our Story', link: "/story" },
      { name: 'Mint', link: "/mint" }
    ];
  }

  return (
    <header className="col-span-12 flex flex-col bg-black border-b-2 border-[#130E04] sm:bg-header-dark overflow-hidden">
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
              <div className="flex-1 flex-cols">
                <div className="flex place-content-center content-center justify-center align-center">
                  <picture>
                    <source srcSet={`${vvLogoWebP} 744w`} type="image/webp" />
                    <img src={vvLogo} alt="Vegas Vickie Logo" className="h-16 sm:h-28 aspect-[417/112]" />
                  </picture>
                </div>
                <div className="hidden sm:relative sm:flex sm:space-x-8 font-display justify-center font-gilroy uppercase">
                  <ul className="flex flex-inital text-white border-t border-gray-600 w-1/2 justify-center">
                    {navItems.map((item, index) => (
                      <li key={index} className="p-3 hover:text-vickie-yellow"><Link to={item.link}>{item.name}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-0 right-0 p-5">
                  {isAuthenticated && (
                    <>
                      <Disclosure as="user-menu" >
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Open main menu</span>
                        <UserCircleIcon className="block h-6 w-6" aria-hidden="true" />
                        <span className="block w-32 truncate pl-1">{user.get("ethAddress")}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="">
                        <div className="pt-1 pb-2 space-y-1">
                            <Disclosure.Button
                              as="a"
                              className="w-auto flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-md"
                              onClick={ () => { logout() }}
                            >
                              Log out
                            </Disclosure.Button>
                        </div>
                      </Disclosure.Panel>
                    </Disclosure>
                  </>
                  )}
                </div>
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
              </div>
            </Disclosure.Panel>
          </>
      )}
      </Disclosure>


    </header>
  )
}

export default Header;