
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom';

function Header() {
  const navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" },
    { name: 'Our Story', link: "/story" }
  ];

  return (
    <header className="col-span-12 flex flex-col bg-black border-b-2 border-[#130E04]">
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
                  <h1 className="font-gilroy font-bold uppercase text-4xl tracking-widest text-white text-center mt-8">Vegas Vickie NFT</h1>
                </div>
                <div className="hidden sm:flex sm:space-x-8 font-display justify-center font-gilroy uppercase mb-6">
                  <ul className="flex flex-inital text-white">
                    {navItems.map((item, index) => (
                      <li key={index} className="p-3 hover:text-vickie-yellow"><Link to={item.link}>{item.name}</Link></li>
                    ))}
                  </ul>
                </div>
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