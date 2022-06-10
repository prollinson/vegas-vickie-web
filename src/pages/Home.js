import * as React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

// Assets
import neonLogo from '../assets/neon-logo.svg';

import discordLogo from '../assets/discord-logo.svg';
import twitterLogo from '../assets/twitter-logo.svg';

import tier1Preview from '../assets/the-one-and-only.png';
import tier2Preview from '../assets/dealers-choice.png';
import tier3Preview from '../assets/neon-idol.png';
import tier4Preview from '../assets/off-the-rack.png';

import utilitySummerBash from '../assets/summer-bash.jpg';
import utilitySuiteStays from '../assets/suite-stays.jpg';
import utilityVIPExperiences from '../assets/vip-experiences.jpg';
import { isContentEditable } from '@testing-library/user-event/dist/utils';

let faqs = [
  {
    question: 'What is Vegas Vickie NFT?',
    answer: '[TODO]'   
  },
  {
    question: 'Who is behind it?',
    answer: 'Vegas Vickie is a collaboration between Circa Casino, BORBAY and NFT of The Art.'
  },
  {
    question: 'What is the minting price?',
    answer: 'Prices will be released closer to minting.'
  },
  {
    question: 'Which blockchain is Vegas Vickie NFT on?',
    answer: 'Ethereum'
  },
  { 
    question: 'What is the Vegas Vickie NFT Summer Bash?',
    answer: 'It is a three day event for all Vegas Vickie NFT owners held at various locations at Circa Resort & Casino.'
  }
]


function Home() {

  let discordLink = 'https://discord.com/invite/vegasvickienft';
  let twitterLink = 'https://twitter.com/VegasVickie';

  let heroHeading = 'font-gilroy font-bold text-5xl uppercase';
  let sectionHeading = "text-3xl text-white font-bold tracking-widest uppercase";
  let sectionHeading2 = "text-xl text-white font-bold tracking-wide uppercase";
  let bodyText = 'font-gilroy text-white text-xl';
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <>
      {/* logo Section */}
      <div className="col-span-12 bg-header-dark ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex min-h-screen md:items-center md:justify-center">
            <img src={neonLogo} alt="Neon Logo" className="max-h-72 md:max-h-full m-auto"/>
        </div>
      </div>

      {/* Hero Section */}
      <div className="col-span-12 bg-legacy-lounge bg-cover border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex min-h-screen md:items-center md:justify-center">
          <div className='w-full h-fit'>
            <h1 className={`${heroHeading} text-white mb-4`}>Own iconic artwork. Access legendary perks and VIP experiences at Circa Resort &amp; Casino</h1>
            <p className={`${bodyText} py-4 w-2/3`}>Vegas Vickie NFT, a first for Las Vegas casino, is an opportunity to own iconic art, get access to VIP experiences at Circa: exclusive entry to the Vegas Vickie NFT Summer Bash, hotel rooms and VIP experiences.  We will have four collections based on BORBAY’s Vegas Vickie.</p>
            <p className={`${bodyText} w-2/3`}>We plan exclusive in-person events for NFT holders this summer and will be building out future games and utility.</p>
            
            <div className="flex flex-row flex-initial pt-2 items-center mt-8 space-x-4">
              <a href={discordLink} target="_window" className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Join the Community</a>
              <a href={discordLink} target="_window" className="block w-fit p-3 rounded-full bg-[#5865F2] aspect-square flex justify-center items-center">
                <img src={discordLogo} className="w-8"/>
              </a>
              <a href={twitterLink} target="_window" className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
                <img src={twitterLogo} className="w-8"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The collections */}
      <div className="col-span-12 bg-pattern bg-center py-24 border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>The Collections</h2>
        </div>

        <div className="max-w-8xl mx-auto py-16 px-20 sm:px-6 lg:px-20 md:flex md:flex-row md:align-center md:items-start md:space-x-16">
          <div className='w-full flex flex-col'>
            <img src={tier1Preview} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>The one and only</h1>
              <p className={`${bodyTextSmall}`}>A digital version of the 40”x40” painting by BORBAY. Currently hanging at the Legacy Lounge. Includes a Founder's suite, entry to the Summer Bash and VIP experiences.</p>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <img src={tier2Preview} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>Dealer's Choice</h1>
              <p className={`${bodyTextSmall}`}>A deck of 54 cards. Includes suite stays, entry to Summer Bash, Food &amp; Beverage credit.</p>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <img src={tier3Preview} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>Neon Idol</h1>
              <p className={`${bodyTextSmall}`}>In this collection 250 unique monochromatic versions of the neon icon herself, Vegas Vickie. Owning one of these cards will give you a room, entry into the Summer Bash and food &amp; drinks</p>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <img src={tier4Preview} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>Off the rack</h1>
              <p className={`${bodyTextSmall}`}>We’ve created 2500 unique chips. Owning one of these chips will get you access to the Summer Bash..</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <a href="/collections" className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700">See the Collections</a>
        </div>
      </div>

      {/* Utility */}
      <div className="col-span-12 bg-black bg-center py-24 border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Utility</h2>
        </div>

        <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:align-center md:items-top md:space-x-12">
          <div className='w-1/3 flex flex-col'>
            <img src={utilitySummerBash} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>Summer Bash</h1>
              <p className={`${bodyTextSmall}`}>An exclusive VIP party for all Vegas Vickie NFT holders held at Circa Resort &amp; Casino. This three day event will incorporate some of Circa's top venues such as Stadium Swim, Legacy Club Rooftop Cocktails, and more. </p>
            </div>
          </div>

          <div className='w-1/3 flex flex-col'>
            <img src={utilitySuiteStays} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>Suite Stays</h1>
              <p className={`${bodyTextSmall}`}>An exclusive VIP party for all Vegas Vickie NFT holders held at Circa Resort &amp; Casino. This three day event will incorporate some of Circa's top venues such as Stadium Swim, Legacy Club Rooftop Cocktails, and more. </p>
            </div>
          </div>

          <div className='w-1/3 flex flex-col'>
            <img src={utilityVIPExperiences} className='w-full' />
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-8 pb-2`}>VIP Experiences</h1>
              <p className={`${bodyTextSmall}`}>An exclusive VIP party for all Vegas Vickie NFT holders held at Circa Resort &amp; Casino. This three day event will incorporate some of Circa's top venues such as Stadium Swim, Legacy Club Rooftop Cocktails, and more. </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <button className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700">See the utility</button>
        </div>
      </div>

      {/* Our Story */}
      <div className="col-span-12 bg-pattern bg-center py-24 border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Our Story</h2>
        </div>

        <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:justify-center md:align-center md:items-top md:space-x-4">
          <div className='w-2/3 flex flex-col'>
            <iframe class="w-full aspect-video" src="https://www.youtube.com/embed/GrmE60q4f6M?controls=0&rel=0&modestbranding" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <button className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700">Read our story</button>
        </div>
      </div>

      {/* Join the Community */}
      <div className="col-span-12 bg-center py-24 border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Keep up-to-date &amp; Join Fellow Fans</h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-row flex-initial pt-2 justify-center mt-8 space-x-4">
          <p></p>
          <div className="flex flex-row flex-initial pt-2 items-center mt-8 space-x-4">
            <button className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Join the Community</button>
            <a href={discordLink} className="block w-fit p-3 rounded-full bg-[#5865F2] aspect-square flex justify-center items-center">
              <img src={discordLogo} className="w-8"/>
            </a>
            <a href={discordLink} className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
              <img src={twitterLogo} className="w-8"/>
            </a>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="col-span-12 bg-pattern bg-center py-24 border-t border-[#130E04]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Common Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-row flex-initial pt-2 justify-start mt-8 space-x-4">
          <ul>
            {faqs.map((item, index) => (
            <li className='pt-8'>
              <h3 className={sectionHeading2}>{item.question}</h3>
              <p className={`${bodyTextSmall}`}>{item.answer}</p>
            </li>
            ))}
          </ul>
          
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home;