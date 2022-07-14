
import { Link } from 'react-router-dom';

import { useFlags } from 'flagsmith/react';

import discordLogo from '../../assets/discord-logo.svg';
import twitterLogo from '../../assets/twitter-logo.svg';

let discordLink = 'https://discord.com/invite/vegasvickienft';
let twitterLink = 'https://twitter.com/VegasVickie';

function Footer() {
  const flags = useFlags(['perks_and_benefits']);

  let navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" },
    { name: 'Our Story', link: "/story" },
    { name: 'Mint', link: "/mint" },
  ];

  if(flags.perks_and_benefits.enabled) {
    navItems = [
      { name: 'Home', link: "/" },
      { name: 'Collections', link: "/collections" },
      { name: 'Perks & Benefits', link: "/perks" },
      { name: 'Our Story', link: "/story" },
      { name: 'Mint', link: "/mint" },
      { name: 'Leaderboard', link: "/leaderboard" },
    ];
  }

  return (
    <footer className="col-span-12 flex flex-col bg-black border-t border-[#1E1708]">
      <div className="max-w-7xl mx-auto w-full flex sm:h-auto justify-between pt-2 sm:pt-8 px-4">
        <div className="sm:flex sm:space-x-8 w-2/3 justify-start align-center font-gilroy uppercase mb-6">
          <ul className="flex flex-col sm:flex-row flex-inital text-white space-y-1 sm:space-y-0 sm:space-x-4">
            {navItems.map((item, index) => (
              <li key={index} className="hover:text-vickie-yellow"><Link to={item.link}>{item.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-inital space-x-2 justify-end">
            <li className="w-fit">
              <a href={discordLink} target="_window" className="block w-fit p-2 rounded-full hover:bg-[#5865F2] aspect-square flex justify-center items-center">
                <img src={discordLogo} width="16" alt="Discord Logo" className="w-4 aspect-[16/18]"/>
              </a>
            </li>
            <li className="w-fit">
              <a href={twitterLink} target="_window" className="block w-fit p-2 rounded-full hover:bg-[#1DA1F2] aspect-square flex justify-center items-center">
                <img src={twitterLogo} alt="Twitter Logo" className="w-4 aspect-square"/>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex sm:h-auto justify-between px-4">
        <p className='font-gilroy text-sm uppercase text-zinc-600 pb-8'>&copy; {new Date().getFullYear()} Vegas Vickie</p>
      </div>
    </footer>
  )
}

export default Footer;