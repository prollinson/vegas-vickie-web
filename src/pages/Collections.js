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

  let legendCollectorPerks = [
    'Original Vegas Vickie Borbay painting',
    'Annual Legendary package',
    'VIP access to the initial kick-off party including a meet & greet with Borbay amd Serek Stevens',
    'Invitaions to exclusive, holder-only events including an annual VIP party at Lecacy Club',
    'Unlockable content'
  ]

  let maverickCollectorPerks = [
    'SMALL GLASS PRINT OF VEGAS VICKIE BORBAY PAINTING',
    'ACCESS TO THE INITIAL KICKOFF PARTY',
    'ANNUAL COMPLIMENTARY ROOM AT CIRCA RESORT & CASINO, THE D LAS VEGAS, OR GOLDEN GATE HOTEL & CASINO',
    'Invitaions to exclusive, holder-only events including an annual VIP party at Lecacy Club',
    'Unlockable content',
    'COMPLIMENTARY DAYBED AT STADIUM SWIM',
    'HOLDER-ONLY RATES AT CIRCA RESORT & CASINO'
  ]

  return (
    <>
      <PageHeader pageTitle="The Collections" />

      <NftCollection
        name="The Collector"
        description="The best words to describe this event: Rich, Classy & Elegant. Everyone is
        dressed in beautiful attire, dancing, and creating lifelong memories
        together. By attending, you will participate in a way that broadens your
        view of the world and enriches the depth of your experience."
        nftImage={collectorNftImage}
        perks={legendCollectorPerks}
        totalSupply={1}
        maxSupply={1}

        actionBox={<AuctionBox totalSupply={1} maxSupply={1}/>}
      />

      <NftCollection
        name="Legend"
        description="The best words to describe this event: Rich, Classy & Elegant. Everyone is
        dressed in beautiful attire, dancing, and creating lifelong memories
        together. By attending, you will participate in a way that broadens your
        view of the world and enriches the depth of your experience."
        nftImage={legendNftImage}
        perks={legendCollectorPerks}
        mintPrice={10000}
        maxSupply={"54"}
        user={user}

        actionBox={<MintBox />}
      />

      <NftCollection
        name="Maverick"
        description="The best words to describe this event: Rich, Classy & Elegant. Everyone is
        dressed in beautiful attire, dancing, and creating lifelong memories
        together. By attending, you will participate in a way that broadens your
        view of the world and enriches the depth of your experience."
        nftImage={maverickNftImage}
        perks={maverickCollectorPerks}
        mintPrice={1000}
        maxSupply={"250"}
        user={user}

        actionBox={<MintBox />}
      />

      <NftCollection
        name="Gambler"
        description="The best words to describe this event: Rich, Classy & Elegant. Everyone is
        dressed in beautiful attire, dancing, and creating lifelong memories
        together. By attending, you will participate in a way that broadens your
        view of the world and enriches the depth of your experience."
        nftImage={gamblerNftImage}
        perks={maverickCollectorPerks}
        mintPrice={100}
        maxSupply={"2500"}
        user={user}

        actionBox={<MintBox />}
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
