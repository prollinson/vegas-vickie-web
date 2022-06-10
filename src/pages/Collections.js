
import NftCollection from '../components/elements/NftCollection';
import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Assets
import tier1NftImage from '../assets/the-one-and-only.png';
import tier2NftImage from '../assets/dealers-choice.png';
import tier3NftImage from '../assets/neon-idol.png';
import tier4NftImage from '../assets/off-the-rack.png';

import discordLogo from '../assets/discord-logo.svg';
import twitterLogo from '../assets/twitter-logo.svg';

function Collections() {

  let discordLink = 'https://discord.com/invite/vegasvickienft';
  let twitterLink = 'https://twitter.com/VegasVickie';

  let sectionHeading = "text-3xl text-white font-bold tracking-widest uppercase";
  
  let tier1CollectorPerks = [
    {
      name: 'Founder\'s Suite',
      description: '(3) Night stay in a founder\'s suite to be used at the summer bash or within one year of purchase.'
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

      <div className="col-span-12 w-full max-w-7xl mx-auto py-24 border-t border-[#130E04] bg-pattern">
        <NftCollection
          name="The One and Only"
          description=""
          nftImage={tier1NftImage}
          perks={tier1CollectorPerks}
          totalSupply={1}
          maxSupply={"1/1"}
          mintPrice={"TBD"}
          availableText={"Available at auction early Summer"}
        />

        <NftCollection
          name="Dealer's Choice"
          description=""
          nftImage={tier2NftImage}
          perks={tier2CollectorPerks}
          mintPrice={"TBD"}
          maxSupply={"54"}
          availableText={"Available to mint early Summer"}
        />

        <NftCollection
          name="Neon Idol"
          description=""
          nftImage={tier3NftImage}
          perks={tier3CollectorPerks}
          mintPrice={"TBD"}
          maxSupply={"250"}
          availableText={"Available to mint early Summer"}
        />

        <NftCollection
          name="Off the Rack"
          description=""
          nftImage={tier4NftImage}
          perks={tier4CollectorPerks}
          mintPrice={"TBD"}
          maxSupply={"2500"}
          availableText={"Available to mint early Summer"}
        />
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
            <a href={twitterLink} className="block w-fit p-3 rounded-full bg-[#1DA1F2] aspect-square flex justify-center items-center">
              <img src={twitterLogo} className="w-8"/>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Collections;
