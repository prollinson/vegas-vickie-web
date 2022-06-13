import * as React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

// Assets
import neonLogo from '../assets/neon-logo.png';
import neonLogoWebP from '../assets/neon-logo_lossyalpha.webp';

import discordLogo from '../assets/discord-logo.svg';
import twitterLogo from '../assets/twitter-logo.svg';

import tier1Preview from '../assets/the-one-and-only.png';
import tier1PreviewWebP from '../assets/the-one-and-only_lossyalpha.webp';

import tier2Preview from '../assets/dealers-choice.png';
import tier2PreviewWebP from '../assets/dealers-choice_lossyalpha.webp';
import tier2PreviewVideo from '../assets/dealers-choice.mp4'

import tier3Preview from '../assets/neon-idol.png';
import tier3PreviewWebP from '../assets/neon-idol_lossyalpha.webp';

import tier4Preview from '../assets/off-the-rack.png';
import tier4PreviewWebP from '../assets/off-the-rack_lossyalpha.webp';

import utilitySummerBash from '../assets/summer-bash.jpg';
import utilitySummerBashWebP from '../assets/summer-bash.webp';

import utilitySuiteStays from '../assets/suite-stays.jpg';
import utilitySuiteStaysWebP from '../assets/suite-stays.webp';

import utilityVIPExperiences from '../assets/vip-experiences.jpg';
import utilityVIPExperiencesWebP from '../assets/vip-experiences.webp';

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

  let heroHeading = 'font-gilroy font-bold text-3xl sm:text-5xl uppercase';
  let sectionHeading = "text-2xl sm:text-3xl text-white font-bold tracking-widest uppercase sm:text-center";
  let sectionHeading2 = "text-xl text-white font-bold tracking-wide uppercase";
  let bodyText = 'font-gilroy text-white text-md sm:text-xl';
  let bodyTextSmall = 'font-gilroy text-white text-md sm:text-lg';

  let playVideo = (event, obj) => {
    event.target.play();
  }

  const [percentShown, setPercentShown] = React.useState({
    card1Percent: 0,
  });
  const refCard = React.useRef(null);
  const refCardDescription = React.useRef(null);
  const refCard2 = React.useRef(null);
  const refCard2Description = React.useRef(null);
  const refCard3 = React.useRef(null);
  const refCard3Description = React.useRef(null);
  const refCard4 = React.useRef(null);
  const refCard4Description = React.useRef(null);

  React.useLayoutEffect(() => {
    const topPosition = (element) => element.getBoundingClientRect().top;
    const getHeight = (element) => element.offsetHeight;

    const onScroll = () => {
      const divCardPosition = topPosition(refCard.current);
      const divCardHeight = getHeight(refCard.current);
      const scrollPosition = window.scrollY + window.innerHeight;

      if(divCardHeight > (window.innerHeight * 0.8)){
        setPercentShown((prevState) => ({
          ...prevState,
          cardPercent: 100
        }));
        return;
      }

      if(divCardPosition < window.innerHeight) {
        let cardPercent = ((window.innerHeight - divCardPosition) * 100) / divCardHeight;

        if(cardPercent > 100) cardPercent = 100;
        if(cardPercent < 0) cardPercent = 0;

        setPercentShown((prevState) => ({
          ...prevState,
          cardPercent: cardPercent
        }));
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  let calculateTransition = (cardNum) => {
    let startPosition = 1199 - (cardNum * 290);
    let endPosition = 0;

    let swipePosition = startPosition * (1 - (percentShown.cardPercent / 100));
    console.log('swipePosition', swipePosition);

    if(swipePosition > startPosition) swipePosition = startPosition;
    if(swipePosition < endPosition) swipePosition = endPosition;

    return swipePosition;
  };


  return (
    <>
      {/* logo Section */}
      <div className="col-span-12 bg-header-dark bg-cover">
        <div className="max-w-7xl mx-auto sm:py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex sm:h-[80vh] md:items-center md:justify-center">
            <picture>
              <source srcSet={neonLogoWebP} alt="Neon Logo" className="max-h-72 md:max-h-full m-0 md:m-auto aspect-auto"/>
              <img src={neonLogo} alt="Neon Logo" className="max-h-72 md:max-h-full m-0 md:m-auto aspect-auto"/>
            </picture>
        </div>
      </div>

      {/* Hero Section */}
      <div className="col-span-12 bg-legacy-lounge bg-fit sm:bg-cover border-t border-[#1E1708]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 md:flex sm:min-h-screen md:items-center md:justify-center">
          <div className='md:w-full md:h-fit'>
            <h1 className={`${heroHeading} text-white mb-4`}>Own iconic artwork. Access legendary perks and VIP experiences at Circa Resort &amp; Casino</h1>
            <p className={`${bodyText} py-4 sm:w-2/3`}>Vegas Vickie NFT, a first for Las Vegas casino, is an opportunity to own iconic art, get access to VIP experiences at Circa: exclusive entry to the Vegas Vickie NFT Summer Bash, hotel rooms and VIP experiences.  We will have four collections based on BORBAY’s Vegas Vickie.</p>
            <p className={`${bodyText} sm:w-2/3`}>We plan exclusive in-person events for NFT holders this summer and will be building out future games and utility.</p>
            
            <div className="flex flex-row flex-initial pt-2 items-center mt-8 space-x-4">
              <a href={discordLink} target="_window" className="w-full md:w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Join the Community</a>
              <a href={discordLink} target="_window" className="block w-fit p-3 rounded-full bg-[#5865F2] aspect-square flex justify-center items-center">
                <img src={discordLogo} alt="Discord Logo" className="w-8"/>
              </a>
              <a href={twitterLink} target="_window" className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
                <img src={twitterLogo} alt="Twitter Logo" className="w-8"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The collections */}
      <div className="col-span-12 py-16 sm:py-24 border-t border-[#1E1708]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:flex-col md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>The Collections</h2>
          <p className={`${bodyTextSmall} pt-1 sm:text-center`}>Four collections. 2,805 unique NFTs.</p>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-10 sm:px-6 md:px-0 md:flex md:flex-row md:align-center md:items-start space-y-16 md:space-y-0 md:space-x-16">
          <div ref={refCard}
            style={{
              opacity: 1,
              transform: `translateX(${calculateTransition(1) + "px"}) rotate(${(1 - (percentShown.cardPercent / 100)) * 2}deg)`,
              transition: "transform 0.1s linear 0s",
              zIndex: 400
              }}
            className='w-full flex flex-col border-b-2 border-[#1E1708] sm:border-0 pb-5 sm:pb-0'>
              <picture>
                <source srcSet={tier1PreviewWebP} className="w-full"/>
                <img src={tier1Preview} className='w-full' />
              </picture>
            <div ref={refCardDescription}
              style={{
                opacity: percentShown.cardPercent >= 90 ? 1 : 0,
                transition: "opacity 1s ease-in 0.2s",
                }}
              className=''>
              <div className='flex flex-row justify-start pt-8 pb-2 space-x-3'>
                <div className='bg-zinc-600 w-fit flex flex-col justify-center align-center px-2'>
                  <span className='font-gilroy uppercase font-bold text-2xl text-center leading-none text-zinc-200'>1</span>
                  <span className='font-gilroy uppercase font-bold text-[10px] leading-none text-zinc-200'>NFT</span>
                </div>
                <div>
                  <h1 className={`text-[12px] tracking-wide uppercase text-zinc-500`}>Collection One</h1>
                  <h1 className={`${sectionHeading2} text-white`}>The one and only</h1>
                </div>
              </div>
              <p className={`${bodyTextSmall}`}>A digital version of the 30”x40” painting by BORBAY hanging in the Legacy Lounge.</p>
              <p className={`${bodyTextSmall}`}><Link to="/collections" className="hover:text-vickie-yellow font-bold mt-2 block">See the perks &amp; benefits &gt;</Link></p>
            </div>
          </div>

          <div ref={refCard2}
            style={{
              opacity: 1,
              transform: `translateX(${calculateTransition(2) + "px"})`,
              transition: "transform 0.1s linear 0s",
              zIndex: 300
              }}
            className='w-full flex flex-col border-b-2 border-[#1E1708] sm:border-0 pb-5 sm:pb-0'>

            <video muted playsInline onMouseOver={playVideo} className="hidden sm:block">
              <source src={tier2PreviewVideo} type="video/mp4"/>
            </video>
            <picture>
              <source srcSet={tier2PreviewWebP} className="w-full sm:hidden"/>
              <img src={tier2Preview} alt="Preview of Dealer's Choice NFT" className='w-full sm:hidden' />
            </picture>
            
            <div ref={refCard2Description}
              style={{
                opacity: percentShown.cardPercent >= 90 ? 1 : 0,
                transition: "opacity 1s ease-in 0.2s",
                }}
              className=''>
              <div className='flex flex-row justify-start pt-8 pb-2 space-x-3'>
                <div className='bg-zinc-600 w-fit flex flex-col justify-center align-center px-2'>
                  <span className='font-gilroy uppercase font-bold text-2xl text-center leading-none text-zinc-200'>54</span>
                  <span className='font-gilroy uppercase font-bold text-[10px] leading-none text-center text-zinc-200'>NFTs</span>
                </div>
                <div>
                  <h1 className={`text-[12px] tracking-wide uppercase text-zinc-500`}>Collection Two</h1>
                  <h1 className={`${sectionHeading2} text-white`}>Dealer's Choice</h1>
                </div>
              </div>
              <p className={`${bodyTextSmall}`}>A deck of cards plus two surprises. Yet to be revealed.</p>
              <p className={`${bodyTextSmall}`}><Link to="collections" className="hover:text-vickie-yellow font-bold mt-2 block">See the perks &amp; benefits &gt;</Link></p>
            </div>
          </div>

          <div ref={refCard3}
            style={{
              opacity: 1,
              transform: `translateX(${calculateTransition(3) + "px"}) rotate(${(1 - (percentShown.cardPercent / 100)) * -2}deg)`,
              transition: "transform 0.1s linear 0s",
              zIndex: 200
              }}
            className='w-full flex flex-col border-b-2 border-[#1E1708] sm:border-0 pb-5 sm:pb-0'>
            <picture>
              <source srcSet={tier3PreviewWebP} className="w-full"/>
              <img src={tier3Preview} alt="Preview of the Neon Idol NFT" className='w-full' />
            </picture>
            <div ref={refCard3Description}
              style={{
                opacity: percentShown.cardPercent >= 90 ? 1 : 0,
                transition: "opacity 1s ease-in 0.2s",
                }}
              className=''>
              <div className='flex flex-row justify-start pt-8 pb-2 space-x-3'>
                <div className='bg-zinc-600 w-fit flex flex-col justify-center align-center px-2'>
                  <span className='font-gilroy uppercase font-bold text-2xl text-center leading-none text-zinc-200'>250</span>
                  <span className='font-gilroy uppercase font-bold text-[10px] leading-none text-center text-zinc-200'>NFTs</span>
                </div>
                <div>
                  <h1 className={`text-[12px] tracking-wide uppercase text-zinc-500`}>Collection Three</h1>
                  <h1 className={`${sectionHeading2} text-white`}>Neon Idol</h1>
                </div>
              </div>
              <p className={`${bodyTextSmall}`}>In this collection 250 unique, slot-themed cards of neon icon herself.</p>
              <p className={`${bodyTextSmall}`}><Link to="collections" className="hover:text-vickie-yellow font-bold mt-2 block">See the perks &amp; benefits &gt;</Link></p>
            </div>
          </div>

          <div ref={refCard4}
            style={{
              opacity: 1,
              transform: `translateX(${calculateTransition(4) + "px"})`,
              transition: "transform 0.1s linear 0s",
              zIndex: 100
              }}
            className='w-full flex flex-col border-b-2 border-[#1E1708] sm:border-0 pb-5 sm:pb-0'>
              <picture>
                <source srcSet={tier4PreviewWebP} className="w-full"/>
                <img src={tier4Preview} alt="Preview of the Off the rack NFT" className='w-full' />
              </picture>
            <div ref={refCard4Description}
              style={{
                opacity: percentShown.cardPercent >= 90 ? 1 : 0,
                transition: "opacity 1s ease-in 0.2s",
                }}
              className=''>
              <div className='flex flex-row justify-start pt-8 pb-2 space-x-3'>
                <div className='bg-zinc-600 w-fit flex flex-col justify-center align-center px-2'>
                  <span className='font-gilroy uppercase font-bold text-2xl text-center leading-none text-zinc-200'>2,500</span>
                  <span className='font-gilroy uppercase font-bold text-[10px] leading-none text-center text-zinc-200'>NFTs</span>
                </div>
                <div>
                  <h1 className={`text-[12px] tracking-wide uppercase text-zinc-500`}>Collection Four</h1>
                  <h1 className={`${sectionHeading2} text-white`}>Off The Rack</h1>
                </div>
              </div>
              <p className={`${bodyTextSmall}`}>2,500 unique chips.</p>
              <p className={`${bodyTextSmall}`}><Link to="/collections" className="hover:text-vickie-yellow font-bold mt-2 block">See the perks &amp; benefits &gt;</Link></p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <Link to="collections" className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700 hover:bg-vickie-yellow hover:text-black">See the Collections</Link>
        </div>
      </div>

      {/* Utility */}
      <div className="col-span-12 bg-pattern bg-center bg-center py-16 sm:py-24 border-t border-[#1E1708]">
      <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:flex-col md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>What you get</h2>
          <p className={`${bodyTextSmall} pt-1`}>Unmatched real-world utility in Las Vegas</p>
        </div>

        <div className="max-w-7xl mx-auto pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:align-center md:items-top space-y-20 md:space-y-0 md:space-x-12">
          <div className='sm:w-1/3 flex flex-col'>
            <picture className='aspect-square'>
              <source srcSet={utilitySummerBashWebP} className="w-full"/>
              <img src={utilitySummerBash} alt="People at Stadium Swim" className='w-full' />
            </picture>
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-4 sm:pt-8 pb-2`}>Summer Bash</h1>
              <p className={`${bodyTextSmall}`}>An exclusive VIP party for all Vegas Vickie NFT holders held at Circa Resort &amp; Casino. This three day event will incorporate some of Circa's top venues such as Stadium Swim, Legacy Club Rooftop Cocktails, and more. </p>
            </div>
          </div>

          <div className='sm:w-1/3 flex flex-col'>
            <picture className='aspect-square'>
            <source srcSet={utilitySuiteStaysWebP} className="w-full"/>
              <img src={utilitySuiteStays} alt="Founders Suite at Circa" className='w-full' />
            </picture>
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-4 sm:pt-8 pb-2`}>Suite Stays</h1>
              <p className={`${bodyTextSmall}`}>Enjoy up to 3 nights stay at Circa.</p>
            </div>
          </div>

          <div className='sm:w-1/3 flex flex-col'>
            <picture className='aspect-square'>
              <source srcSet={utilityVIPExperiencesWebP} className="w-full"/>
              <img src={utilityVIPExperiences} alt="Glass of Champagne" className='w-full' />
            </picture>
            <div className=''>
              <h1 className={`${sectionHeading2} text-white pt-4 sm:pt-8 pb-2`}>VIP Experiences</h1>
              <p className={`${bodyTextSmall}`}>Unique experiences crafted just for you. Feel like a vip with exclusive events, perks, and venue content.</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <Link to="/collections" className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700 hover:bg-vickie-yellow hover:text-black">See the utility</Link>
        </div>
      </div>

      {/* Our Story */}
      <div className="col-span-12 bg-black py-16 sm:py-24 border-t border-[#1E1708]">
      <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:flex-col md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Our Story</h2>
          <p className={`${bodyTextSmall} pt-1 sm:text-center`}>Meet BORBAY who spent 8 days live-painting Vegas Vickie for this NFT collection.</p>
        </div>

        <div className="max-w-7xl mx-auto pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 md:flex md:flex md:justify-center md:align-center md:items-top md:space-x-4">
          <div className='sm:w-2/3 flex flex-col'>
            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/GrmE60q4f6M?controls=0&rel=0&enablejsapi=1&modestbranding" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 pb-0 sm:px-6 lg:px-8 flex flex-row align-center justify-center">
          <Link to='/story' className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white uppercase bg-zinc-700 hover:bg-vickie-yellow hover:text-black">Read our story</Link>
        </div>
      </div>

      {/* Join the Community */}
      <div className="col-span-12 bg-center bg-pattern bg-center py-16 sm:py-24 border-t border-[#1E1708]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:flex-col md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Keep up-to-date &amp; Join Fellow Fans</h2>
          <p className={`${bodyTextSmall} pt-1`}>Follow &amp; Join the community so you don't miss out on mint information, allow list spots and giveaways.</p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-row flex-initial mt-10 justify-center mt-4 sm:mt-8 space-x-4">
          <p></p>
          <div className="flex flex-row flex-initial items-center space-x-4">
            <a href={discordLink} className="w-auto flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Join the Community</a>
            <a href={discordLink} className="block w-fit p-3 rounded-full bg-[#5865F2] aspect-square flex justify-center items-center">
              <img src={discordLogo} alt="Discord" className="w-8 aspect-square"/>
            </a>
            <a href={twitterLink} className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
              <img src={twitterLogo} alt="Twitter" className="w-8 aspect-square"/>
            </a>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="col-span-12 bg-black py-16 sm:py-24 border-t border-[#1E1708]">
        <div className="max-w-7xl mx-auto pt-0 px-4 sm:px-6 lg:px-10 md:flex md:items-center md:justify-center md:align-start">
          <h2 className={sectionHeading}>Common Questions</h2>
        </div>

        <div className="sm:max-w-3xl mx-auto flex flex-row flex-initial pt-4 sm:pt-10 px-4 justify-start">
          <ul>
            {faqs.map((item, index) => (
            <li key={index} className='pt-8'>
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