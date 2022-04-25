import * as React from 'react';

import { Link } from 'react-router-dom';

// Assets
import borbayLogo from '../assets/BORBAY_LOGO.jpg';
import legendCard from '../assets/legend_bv-01.jpg';

function Home() {
  return (
    <>
      {/* Vision Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white md:flex md:space-x-4">
          <div className='w-1/2 mx-auto md:w-1/3'>
            <img src={borbayLogo} alt="BORBAY Logo" className="w-full mx-auto max-h-4xl"/>
          </div>
          <div className="max-w-3xl md:w-2/3 mx-auto pt-6 text-center">
            <h2 className="text-2xl text-white tracking-widest uppercase">Vision</h2>
            <p className="font-gilroy mt-4 text-lg text-white">Borbay's work is collected globally and has been featured in Forbes, BBC World, Wall Street Journal Japan,
             Los Angeles Magazine, and the New York Post. From Time Out New York Magazine naming him their Most Creative New Yorker, to having original works in
the permanent Universal Hip Hop Museum collection, to
his 20-year Guggenheim Series - Borbay has been
circumventing the art world since 2009.</p>
            <p className="font-gilroy mt-4 text-lg text-white">Follow him on Twitter: <a href="https://twitter.com/borbay">@Borbay</a></p>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white md:flex md:flex-row-reverse">
          <div className='w-1/2 mx-auto md:w-1/3 md:ml-4'>
            <img src={legendCard} alt="Legend Card" className=""/>
          </div>
          <div className="max-w-3xl md:w-2/3 mx-auto pt-6 text-center">
            <h2 className="text-2xl text-white tracking-widest uppercase">Collections</h2>
            <p className="font-gilroy mt-4 text-lg text-white">
            The best words to describe this event: Rich,
Classy &amp; Elegant. Everyone is dressed in
beautiful attire, dancing, and creating lifelong
memories together. By attending, you will
participate in a way that broadens your view of
the world and enriches the depth of your
experience.
            </p>
            <Link to="/collections" className="block font-gilroy uppercase bg-amber-400 rounded-lg py-2 px-4 mt-4 text-lg text-white">View Collections</Link>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white md:flex">
          <div className="max-w-3xl md:w-1/2 mx-auto text-center">
            <h2 className="text-2xl text-white tracking-widest uppercase">
              Join The
              <span className='block text-4xl'>Vegas Vickie</span>
              NFT
              Community
            </h2>

          </div>
          <div className="max-w-3xl md:w-1/2 mx-auto text-center">
            <p className="font-gilroy  mt-4 text-lg text-white">
            Originally designed by Charles F Bernard and
installed over Bob Stupa's Glitter Gulch Casino
in 1980 - Vegas Vickie has always been a
dazzling tourist attraction.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white">
          <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl text-white tracking-widest uppercase">FAQ</h2>
            <ul className='text-white'>
              <li>Who is Vegas Vickie?</li>
              <li>Who is BORBAY?</li>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home;