import { useEffect, useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api, useMoralisSubscription, useMoralisQuery} from "react-moralis";
import { chain, address as contractAddress, ABI} from "../models/contracts/DealersChoice";

import TransactionDialog from '../components/dialogs/TransactionDialog';
import MintCollection from '../components/elements/MintCollection';
import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import JoinCommunitySection from '../components/elements/JoinCommunitySection';

// Assets
import tier1NftImage from '../assets/the-one-and-only.png';
import tier1NftWebPImage from '../assets/the-one-and-only_lossyalpha.webp';

import tier2NftImage from '../assets/dealers-choice.png';
import tier2NftWebPImage from '../assets/dealers-choice_lossyalpha.webp';

import tier3NftImage from '../assets/neon-idol.png';
import tier3NftWebPImage from '../assets/neon-idol_lossyalpha.webp';

import tier4NftImage from '../assets/off-the-rack.png';
import tier4NftWebPImage from '../assets/off-the-rack_lossyalpha.webp';

import MintBox from '../components/elements/MintBox';
import AuctionBox from '../components/elements/AuctionBox';

function Mint() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const { switchNetwork, chainId, chain } = useChain();

  // Fetching Data
  // const [allNfts, setAllNfts] = useState([]);

  // Transactions
  const [mintTransaction, setMintTransaction] = useState(null);
  const [showTx, setShowTx] = useState(false);

  // NFT Functions

  // useMoralisSubscription("Tier2MintEvents", q => q, [account], {
  //   onUpdate: data => newMintTransaction(data),
  // });

  const { allNfts, error, isLoading } = useMoralisQuery("Tier2MintEvents", q => q, [account], {live: true });

  // const newMintTransaction = async (data) => {
  //   console.log("New Mint Transaction:", data);
  // }

  const getNFTs = async () => {
    // Moralis Web3API doesn't work with hardhat
    if(chain === 'hardhat') return;
    if(!Moralis.isWeb3Enabled()) {
      console.log("Web3 is disabled")
      return;
    }
    console.log(account);
    if(!isAuthenticated && !account) {
      return;
    }

    const options = {
      chain: chain,
      address: account,
      token_address: contractAddress
    };

    let fetchedNFTS = await Web3Api.account.getNFTsForContract(options);
    console.log('fetchedNFTS: ', fetchedNFTS);
    console.log('fetchedNFTS.result: ', fetchedNFTS.result);
    let fetchedNFTSArray = fetchedNFTS.result;

    let nftsWithImageURL = await Promise.all(fetchedNFTSArray.map(async (token) => {

      if(token.metadata) {
        token.image_url = 'https://ipfs.vegasvickienft.com/ipfs/' + JSON.parse(token.metadata).image.match(/ipfs:\/\/(.*)/)[1];
      }else{
        // TODO: Attempt to get metadata and latest image by using token_uri
      }

      // const options = {
      //   address: contractAddress,
      //   token_id: token.token_id,
      //   chain: chain,
      // };
      // const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
      // console.log('metadata', tokenIdMetadata);
      // return token;
    //   let metadataJSON = await fetch("https://storageapi.fleek.co/fc8a955b-9611-4fc1-90e8-ae69ac23af76-bucket/vegas-vickie-staging/legends/metadata/1")
    //                              .then(response => response.json())
    //   token.metadata = metadataJSON;
    //   token.image_url = 'https://ipfs.io/ipfs/' + metadataJSON.image.match(/ipfs:\/\/(.*)/)[1];
    //   console.log(token);
      return token;
    }));

    // setAllNfts(nftsWithImageURL);
  };

  // Contract Functions

  useEffect(() => {
    // const interval = setInterval(async () => {
    //   if (user) {      
    //     await getNFTs();
    //   }
    // }, 5000);
    // return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    // async function fetchData() {
    //   await getNFTs();
    // }
    // fetchData();
    console.log(chain);
    console.log(account);
  }, [account]);

  useEffect(() => {
    console.log(allNfts);
  }, [allNfts]);

  return (
    <>
      { chain && (
        <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
          <p className='font-display text-white'>Connected to <b>{`${chain.name} (${chain.nativeCurrency.name})`}</b></p>
        </div>
      )}
      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern h-screen flex flex-1 justify-center align-center">
        <div className='w-full max-w-5xl mx-auto'>
          <MintCollection
            name="Dealer's Choice"
            nftImage={tier2NftImage}
            nftWebPImage={tier2NftWebPImage}
            allNfts={allNfts}
            availableText={"Available to mint early Summer"}
          />
        </div>
      </div>
    </>
  );
}

export default Mint;
