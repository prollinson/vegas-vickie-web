
import { Link } from 'react-router-dom';

import discordLogo from '../../assets/discord-logo.svg';
import twitterLogo from '../../assets/twitter-logo.svg';

let discordLink = 'https://discord.com/invite/vegasvickienft';
let twitterLink = 'https://twitter.com/VegasVickie';

function Footer() {
  const navItems = [
    { name: 'Home', link: "/" },
    { name: 'Collections', link: "/collections" },
    { name: 'Our Story', link: "/story" }
  ];

  return (
    <footer className="col-span-12 flex flex-col bg-black border-t border-[#1E1708]">
      <div className="max-w-7xl mx-auto w-full flex sm:h-auto justify-between pt-8">
        <div className="hidden sm:flex sm:space-x-8 w-2/3 justify-start align-center font-gilroy uppercase mb-6">
          <ul className="flex flex-inital text-white space-x-4">
            {navItems.map((item, index) => (
              <li key={index} className="hover:text-vickie-yellow"><Link to={item.link}>{item.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-inital space-x-2 justify-end">
            <li className="w-fit">
              <a href={discordLink} target="_window" className="block w-fit p-2 rounded-full hover:bg-[#5865F2] aspect-square flex justify-center items-center">
                <img src={discordLogo} className="w-4"/>
              </a>
            </li>
            <li className="w-fit">
              <a href={twitterLink} target="_window" className="block w-fit p-2 rounded-full hover:bg-[#1DA1F2] aspect-square flex justify-center items-center">
                <img src={twitterLogo} className="w-4"/>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex sm:h-auto justify-between">
        <p className='font-gilroy text-sm uppercase text-zinc-600 pb-8'>&copy; {new Date().getFullYear()} Vegas Vickie</p>
      </div>
    </footer>
  )
}

export default Footer;