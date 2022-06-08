import * as React from 'react';

import { Link } from 'react-router-dom';

// Assets
import neonLogo from '../assets/neon-logo.svg';

import tier1Preview from '../assets/the-one-and-only.png';
import tier2Preview from '../assets/dealers-choice.png';
import tier3Preview from '../assets/neon-idol.png';
import tier4Preview from '../assets/off-the-rack.png';

import utilitySummerBash from '../assets/summer-bash.jpg';
import utilitySuiteStays from '../assets/suite-stays.jpg';
import utilityVIPExperiences from '../assets/vip-experiences.jpg';


function Home() {

  let bodyText = 'font-gilroy text-white text-xl';

  return (
    <>
      {/* logo Section */}
      <div className="col-span-12 bg-header-dark ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex h-screen md:items-center md:justify-center">
            <img src={neonLogo} alt="Neon Logo" className="max-h-72 md:max-h-full m-auto"/>
        </div>
      </div>

      {/* Hero Section */}
      <div className="col-span-12 bg-legacy-lounge bg-fit">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex h-screen md:items-center md:justify-center">
          <div className='w-full h-fit'>
            <h1 className='font-gilroy font-bold text-4xl tracking-widest text-white mb-4'>Own iconic artwork and get access to legendary perks and VIP experiences at Circa Resort &amp; Casino this summer.</h1>
            <p className={`${bodyText} py-4 w-2/3`}>Vegas Vickie NFT, a first for Las Vegas casino, is an opportunity to own iconic art, get access to VIP experiences at Circa: exclusive entry to the Vegas Vickie NFT Summer Bash, hotel rooms and VIP experiences.  We will have four collections based on BORBAY’s Vegas Vickie.</p>
            <p className={`${bodyText} w-2/3`}>We plan exclusive in-person events for NFT holders this summer and will be building out future games and utility.</p>
            
            <button className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow mt-8">Join the Community</button>
          </div>
        </div>
      </div>

      {/* The collections */}
      <div className="col-span-12 bg-pattern bg-center">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-center">
          <h2 className="text-3xl text-white tracking-widest uppercase">The Collections</h2>
        </div>

        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:flex-col md:align-center md:items-center md:space-y-10">
          <div className='w-full flex flex-row space-x-10'>
            <img src={tier1Preview} className='w-1/3' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>The one and only</h1>
              <p className={`${bodyText}`}>A digital version of the 40”x40” painting by BORBAY. Currently hanging at the Legacy Lounge. Includes a Founder's suite, entry to the Summer Bash and VIP experiences.</p>
            </div>
          </div>

          <div className='w-full flex flex-row space-x-10'>
            <img src={tier2Preview} className='w-1/3' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Dealer's Choice</h1>
              <p className={`${bodyText}`}>A deck of 54 cards. Includes suite stays, entry to Summer Bash, Food &amp; Beverage credit.</p>
            </div>
          </div>

          <div className='w-full flex flex-row space-x-10'>
            <img src={tier3Preview} className='w-1/3' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Neon Idol</h1>
              <p className={`${bodyText}`}>In this collection 250 unique monochromatic versions of the neon icon herself, Vegas Vickie. Owning one of these cards will give you a room, entry into the Summer Bash and food &amp; drinks</p>
            </div>
          </div>

          <div className='w-full flex flex-row space-x-10'>
            <img src={tier4Preview} className='w-1/3' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Off the rack</h1>
              <p className={`${bodyText}`}>We’ve created 2500 unique chips. Owning one of these chips will get you access to the Summer Bash..</p>
            </div>
          </div>
        </div>
      </div>

      {/* Utility */}
      <div className="col-span-12 bg-black bg-center h-screen">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-center">
          <h2 className="text-3xl text-white tracking-widest uppercase">Utility</h2>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:align-center md:items-top md:space-x-4">
          <div className='w-1/3 flex flex-col'>
            <img src={utilitySummerBash} className='w-full' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Summer Bash</h1>
            </div>
          </div>

          <div className='w-1/3 flex flex-col'>
            <img src={utilitySuiteStays} className='w-full' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Suite Stays</h1>
            </div>
          </div>

          <div className='w-1/3 flex flex-col'>
            <img src={utilityVIPExperiences} className='w-full' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>VIP Experiences</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="col-span-12 bg-pattern bg-center h-screen">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-center">
          <h2 className="text-3xl text-white tracking-widest uppercase">Our Story</h2>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:justify-center md:align-center md:items-top md:space-x-4">
          <div className='w-1/3 flex flex-col'>
            <img src={utilitySummerBash} className='w-full' />
            <div className='pl-2'>
              <h1 className='font-gilroy font-bold text-xl text-white pt-2 pb-2'>Summer Bash</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Community */}
      <div className="col-span-12 bg-center h-screen">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-center">
          <h2 className="text-3xl text-white tracking-widest uppercase">Join the Community</h2>
        </div>
      </div>
    </>
  )
}

export default Home;