import NftCollection from '../components/elements/NftCollection';
import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Assets
import tier1NftImage from '../assets/the-one-and-only.png';
import tier1NftWebPImage from '../assets/the-one-and-only_lossyalpha.webp';

import tier2NftImage from '../assets/dealers-choice.png';
import tier2NftWebPImage from '../assets/dealers-choice_lossyalpha.webp';

import tier3NftImage from '../assets/neon-idol.png';
import tier3NftWebPImage from '../assets/neon-idol_lossyalpha.webp';

import tier4NftImage from '../assets/off-the-rack.png';
import tier4NftWebPImage from '../assets/off-the-rack_lossyalpha.webp';

import JoinCommunitySection from '../components/elements/JoinCommunitySection';

function Collections() {

  const openSeaListing = "https://opensea.io/assets/ethereum/0x69c5ba025fcf3a3e740f4c150d47e0126ddd106a/1";
  
  let tier1CollectorPerks = [
    {
      name: 'Founder\'s Suite',
      description: '3 Night stay in a founder\'s suite to be used at the summer bash or within one year of purchase.'
    },
    {
      name: 'Limo Transport',
      description: 'Round trip limo transportation from the airport to Circa Resort & Casino.'
    },
    {
      name: 'Welcome Cocktail',
      description: 'Welcome cocktail at Vegas Vickies.'
    },
    {
      name: 'Complimentary entry to Summer Bash + Owner\'s suite',
      description: 'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with an Owner\'s Suite.'
    },
    {
      name: 'VIP Welcome + Open bar',
      description: 'Welcome reception at Legacy Club w/ a Derek & Borbay meet & greet. Open bar.'
    },
   {
     name: '$1000 Food & Beverage Credit',
     description:  '$1000 to spend on food & drinks during your stay.'
    },
   {
     name: '',
     description:  'Includes a Glass print of your artwork & Circa coffee table book.'
    },
    {
      name: 'Plus future perks, benefits and utility',
      description:  ''
     }
  ]

  let tier2CollectorPerks = [
    {
      name: 'Suite for 3 Nights',
      description: '(3) Night stay in a suite room to be used at the summer bash or within one year of purchase.'
    },
    {
      name: 'Limo Pick-up & Drop-off',
      description :'Round trip limo transportation from the airport to Circa Resort & Casino.'
    },
    {
      name: 'Welcome Cocktail',
      description :'Welcome cocktail at Vegas Vickies.'
    },
    {
      name: 'Entry to Summer Bash + Cabana',
      description :'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with a paired cabana.'
    },
    {
      name: 'Welcome Reception + Open bar',
      description :'Access to the Legacy Club welcome reception party with open bar'
    },
    {
      name: '$500 Food & Beverage Credit',
      description: '$500 to spend on food & drinks during your stay.'
    },
    {
      name: 'Circa Coffee Table Book',
      description :''
    },
    {
      name: 'Plus future perks, benefits and utility',
      description:  ''
     }
  ]

  let tier3CollectorPerks = [
    {
      name: 'Room for 3 nights',
      description: '(3) Night stay in a standard room to be used at the summer bash or within one year of purchase.'
    },
    {
      name: 'Welcome Cocktail',
      description :'Welcome cocktail at Vegas Vickies.'
    },
    {
      name: 'Entry to Summer Bash + Lounge Chairs',
      description :'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with lounge chairs based on availability.'
    },
    {
      name: '$250 Food & Beverage Credit',
      description: '$250 to spend on food & drink during your stay.'
    },
    {
      name: 'Plus future perks, benefits and utility',
      description:  ''
     }
  ]

  let tier4CollectorPerks = [
    {
      name: 'Digital Artwork',
      description :'Digital artwork'
    },
    {
      name: 'Invitation to Summer Bash',
      description :'Invitation to the weekend & GA admission to the Vegas Vickie Summer Bash at Stadium Swim'
    },
    {
      name: 'Welcome Bag',
      description :'Welcome bag to be picked up at Club One'
    },
    {
      name: 'Welcome Cocktail',
      description :'Welcome cocktail at Vegas Vickies.'
    },
    {
      name: 'Plus future perks, benefits and utility',
      description:  ''
     }
  ]

  return (
    <>
      <Header />
      <PageHeader pageTitle="The Collections" />

      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-7xl mx-auto'>
          <NftCollection
            name="The One and Only"
            description=""
            nftImage={tier1NftImage}
            nftWebPImage={tier1NftWebPImage}
            perks={tier1CollectorPerks}
            totalSupply={1}
            maxSupply={"1/1"}
            mintPrice={"Sold for 18.5 ETH"}
            availableText={"Sold at auction for 18.5 ETH"}
            actionButton={(
              <a href={openSeaListing} target="_blank" className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">
                View on OpenSea
              </a>
            )}
          />

          <NftCollection
            name="Dealer's Choice"
            description=""
            nftImage={tier2NftImage}
            nftWebPImage={tier2NftWebPImage}
            perks={tier2CollectorPerks}
            mintPrice={"2 ETH"}
            maxSupply={"54"}
            availableText={"Available to mint now"}
            actionButton={(
              <a href="/mint" className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">
                Buy/Mint Now
              </a>
            )}
          />

          <NftCollection
            name="Neon Idol"
            description=""
            nftImage={tier3NftImage}
            nftWebPImage={tier3NftWebPImage}
            perks={tier3CollectorPerks}
            mintPrice={"1.25 ETH"}
            maxSupply={"250"}
            availableText={"Available to mint now"}
            actionButton={(
              <a href="/mint" className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">
                Buy/Mint Now
              </a>
            )}
          />

          <NftCollection
            name="Off the Rack"
            description=""
            nftImage={tier4NftImage}
            nftWebPImage={tier4NftWebPImage}
            perks={tier4CollectorPerks}
            mintPrice={"0.25 ETH"}
            maxSupply={"2500"}
            availableText={"Available to mint now"}
            actionButton={(
              <a href="/mint" className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">
                Buy/Mint Now
              </a>
            )}
          />
        </div>
      </div>

      {/* Join the Community */}
      <JoinCommunitySection />

      <Footer />
    </>
  );
}

export default Collections;
