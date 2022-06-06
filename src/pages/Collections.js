import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { chain, address as contractAddress, ABI} from "../models/contracts/Legend";

import TransactionDialog from '../components/dialogs/TransactionDialog';
import NftCollection from '../components/elements/NftCollection';
import PageHeader from '../components/layout/PageHeader';

// Assets
import collectorNftImage from '../assets/collector_nft_preview.jpg';
import legendNftImage from '../assets/legend_nft_preview.jpg';
import maverickNftImage from '../assets/maverick_nft_preview.jpg';
import gamblerNftImage from '../assets/gambler_nft_preview.jpg';
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
    '(3) Night stay in a founder\'s suite to be used at the summer bash or within one year of purchase.',
    'Round trip limo transportation from the airport to Circa Resort & Casino.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with an Owner\'s Suite.',
    'Welcome reception at Legacy Club w/ a Derek & Borbay meet & greet.',
    'Open bar at the Legacy Club welcome reception.',
    'Circa Coffee Table Book.',
    '$1000 F&B Credit.',
    'Glass print.'
  ]

  let tier2CollectorPerks = [
    '(3) Night stay in a suite room to be used at the summer bash or within one year of purchase.',
    'Round trip limo transportation from the airport to Circa Resort & Casino.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with a paired cabana.',
    'Access to the Legacy Club welcome reception party with open bar',
    'Circa Coffee Table Book.',
    '$500 F&B Credit.',
  ]

  let tier3CollectorPerks = [
    '(3) Night stay in a standard room to be used at the summer bash or within one year of purchase.',
    'Welcome cocktail at Vegas Vickies.',
    'Complimentary access to the Vegas Vickie Summer Bash at Stadium Swim with lounge chairs based on availability.',
    '$250 F&B Credit.',
  ]

  let tier4CollectorPerks = [
    'Digital artwork',
    'Invitation to the weekend & GA admission to the Vegas Vickie Summer Bash at Stadium Swim',
    'Welcome bag to be picked up at Club One',
    'Welcome cocktail at Vegas Vickies.',
  ]

  return (
    <>
      <PageHeader pageTitle="The Collections" />

      <NftCollection
        name="The One and Only"
        description=""
        nftImage={collectorNftImage}
        perks={tier1CollectorPerks}
        totalSupply={1}
        maxSupply={"1/1"}
        mintPrice={"TBD"}
      />

      <NftCollection
        name="Dealer's Choice"
        description=""
        nftImage={legendNftImage}
        perks={tier2CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"54"}
        user={user}
      />

      <NftCollection
        name="Neon Idol"
        description=""
        nftImage={maverickNftImage}
        perks={tier3CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"250"}
        user={user}
      />

      <NftCollection
        name="Off the Rack"
        description=""
        nftImage={gamblerNftImage}
        perks={tier4CollectorPerks}
        mintPrice={"TBD"}
        maxSupply={"2500"}
        user={user}
      />

      { isAuthenticated && allNfts && (
        <div className="col-span-12 p-6">
          <h2 className="text-2xl">Your NFTs</h2>

          <ul className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4 lg:grid-cols-6">
            {allNfts.map((nft, index) => (
            <li key={index} className="col-span-1 bg-gray-500 rounded-lg shadow divide-y divide-gray-200">
              <img src={nft.image_url} alt="NFT artwork" className="w-full flex items-center justify-between space-x-6"/>
              <div className="flex items-center space-x-3 p-2 bg-gray-300">
                <h3 className="text-gray-900 text-sm font-medium truncate">{nft.metadata.name} #{nft.token_id}</h3>
                {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.role}
                </span> */}
              </div>
              {/* <p className="mt-1 text-gray-500 text-sm truncate">{person.title}</p> */}
            </li>
            ))}
          </ul>
        </div>
      )}

      <TransactionDialog subtitle="Vegas Vickie NFT" isShowing={showTx} setShowTxModal={setShowTx} transaction={mintTransaction} />
    </>
  );
}

export default Collections;
