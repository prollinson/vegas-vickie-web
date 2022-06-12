import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { chain, address as contractAddress, ABI} from "../models/contracts/Legend";

import TransactionDialog from '../components/dialogs/TransactionDialog';
import NftCollection from '../components/elements/NftCollection';
import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import JoinCommunitySection from '../components/elements/JoinCommunitySection';

// Assets
import tier1NftImage from '../assets/the-one-and-only.png';
import tier2NftImage from '../assets/dealers-choice.png';
import tier3NftImage from '../assets/neon-idol.png';
import tier4NftImage from '../assets/off-the-rack.png';

import MintBox from '../components/elements/MintBox';
import AuctionBox from '../components/elements/AuctionBox';

function Collections() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  // Fetching Data
  const [allNfts, setAllNfts] = useState([]);

  // Transactions
  const [mintTransaction, setMintTransaction] = useState(null);
  const [showTx, setShowTx] = useState(false);

  // NFT Functions

  const getNFTs = async () => {
    const options = {
      chain: chain,
      address: account,
      token_address: contractAddress
    };
    let fetchedNFTS = await Moralis.Web3API.account.getNFTsForContract(options);
    console.log('fetchedNFTS: ', fetchedNFTS);
    console.log('fetchedNFTS.result: ', fetchedNFTS.result);
    let fetchedNFTSArray = fetchedNFTS.result;

    let nftsWithImageURL = await Promise.all(fetchedNFTSArray.map(async (token) => {
      let metadataJSON = await fetch("https://storageapi.fleek.co/fc8a955b-9611-4fc1-90e8-ae69ac23af76-bucket/vegas-vickie-staging/legends/metadata/1")
                                 .then(response => response.json())
      token.metadata = metadataJSON;
      token.image_url = 'https://ipfs.io/ipfs/' + metadataJSON.image.match(/ipfs:\/\/(.*)/)[1];
      console.log(token);
      return token;
    }));

    setAllNfts(nftsWithImageURL);
  };

  // Contract Functions

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {      
        await getNFTs();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      await Moralis.enableWeb3();
      await getNFTs();
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(allNfts);
  }, [allNfts]);

  // Actions



  // Data

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

      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-7xl mx-auto'>
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
      </div>

      {/* Join the Community */}
      <JoinCommunitySection />

      <Footer />
    </>
  );
}

export default Collections;
