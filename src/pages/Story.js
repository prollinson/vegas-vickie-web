import * as React from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import JoinCommunitySection from '../components/elements/JoinCommunitySection';

// Assets
import vegasVickie from '../assets/vegas-vickie.jpg';

import borbayLogo from '../assets/BORBAY_LOGO.jpg';
import borbayArtwork1 from '../assets/borbay-artwork-1.jpg';
import borbayArtwork2 from '../assets/borbay-artwork-2.jpg';
import borbayArtwork3 from '../assets/borbay-artwork-3.jpg';
import borbayArtwork4 from '../assets/borbay-artwork-4.jpg';
import borbayArtwork5 from '../assets/borbay-artwork-5.jpg';

import circaImage from '../assets/circa-rooftop.jpg';

function Story() {
  return (
    <>
      <Header />
      <PageHeader pageTitle="Our Story" />

      {/* Vegas Vickie Section */}
      <div className="col-span-12 border-t border-[#130E04] bg-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:space-x-24">
          <div className='w-1/2 mx-auto flex justify-center'>
            <img src={vegasVickie} alt="Vegas Vickie in Circa" className="w-full mx-auto max-h-4xl"/>
          </div>
          <div className="max-w-3xl md:w-2/3 mx-auto pt-6 py-16  lg:py-24">
            <h2 className="text-2xl text-white tracking-widest uppercase">Who is Vegas Vickie?</h2>
            <p className="font-gilroy mt-4 text-lg text-white">Originally designed by Charles F Bernard and installed over Bob Stupak's Glitter Gulch Casino in 1980 - Vegas Vickie has always been a dazzling tourist attraction. To this day, the old gal doesn’t disappoint, still driving visitors to see her famous leg kick one more time at her new home at Circa Resort &amp; Casino in Downtown Las Vegas. You can even grab a drink with her at her very own bar - Vegas Vickie's.</p>
            <p className="font-gilroy mt-4 text-lg text-white">Follow her on Twitter: <a href="https://twitter.com/vegasvickie" className='font-bold hover:text-vickie-yellow'>@VegasVickie</a></p>
          </div>
        </div>
      </div>

      {/* BORBAY Section */}
      <div className="col-span-12 border-t border-[#130E04]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6  lg:px-8 md:flex md:space-x-24 md:flex-row-reverse">
          <div className='w-full md:w-1/2 mx-auto md:w-1/3 flex flex-wrap grow-0 justify-center content-center'>
            <img src={borbayLogo} alt="BORBAY Logo" className="w-1/2 aspect-square border-2 border-transparent"/>
            <img src={borbayArtwork1} alt="BORBAY Artwork" className="w-1/2 aspect-square border-2 border-transparent"/>
            <img src={borbayArtwork2} alt="BORBAY Artwork" className="w-1/2 aspect-square border-2 border-transparent"/>
            <img src={borbayArtwork3} alt="BORBAY Artwork" className="w-1/2 aspect-square border-2 border-transparent"/>
            <img src={borbayArtwork4} alt="BORBAY Artwork" className="hidden md:block w-1/2 aspect-square border-2 border-transparent"/>
            <img src={borbayArtwork5} alt="BORBAY Artwork" className="hidden md:block w-1/2 aspect-square border-2 border-transparent"/>
          </div>
          <div className="max-w-3xl md:w-2/3 mx-auto pt-6 py-16 lg:py-24 lg:pr-16">
            <h2 className="text-2xl text-white tracking-widest uppercase">Who is BORBAY?</h2>
            <p className="font-gilroy mt-4 text-lg text-white">Borbay's work is collected globally and has been featured in Forbes, BBC World, Wall Street Journal Japan,
             Los Angeles Magazine, and the New York Post. From Time Out New York Magazine naming him their Most Creative New Yorker, to having original works in
the permanent Universal Hip Hop Museum collection, to
his 20-year Guggenheim Series - Borbay has been
circumventing the art world since 2009.</p>
            <p className="font-gilroy mt-4 text-lg text-white">Follow him on Twitter: <a href="https://twitter.com/borbay" className='font-bold hover:text-vickie-yellow'>@Borbay</a></p>
          </div>
        </div>
      </div>

      {/* Circa Section */}
      <div className="col-span-12 border-t border-[#130E04] bg-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:space-x-24">
          <div className='w-full md:w-1/2 flex align-center'>
            <img src={circaImage} alt="Circa's rooftop" className="w-full mx-auto max-h-4xl"/>
          </div>
          <div className="max-w-3xl md:w-2/3 mx-auto pt-6 py-16 lg:py-24">
            <h2 className="text-2xl text-white tracking-widest uppercase">About Circa</h2>
            <p className="font-gilroy mt-4 text-lg text-white">Circa Resort &amp; Casino is Downtown Las Vegas's newest entertainment destination located downtown on Fremont Street. This AAA Four Diamond resort features luxurious rooms, a two-level casino, the world's largest sportsbook, Stadium Swim® - a multi-tiered pool amphitheatre, million-dollar rooftop views at Legacy Club, and 12 restaurants and bars. Circa is the place to have the time of your life.</p>
            <p className="font-gilroy mt-4 text-lg text-white">Find out more at <a href="https://circalasvegas.com" className='font-bold hover:text-vickie-yellow'>circalasvegas.com</a></p>
          </div>
        </div>
      </div>

      <JoinCommunitySection />

      <Footer />
    </>
  )
}

export default Story;