import { useMoralis, useMoralisQuery, useNFTTransfers } from "react-moralis";
import { useEffect, useState } from "react";

import useDealersChoiceContract from "../../hooks/useDealersChoiceContract";

import MintBox from "./MintBox";
import StageBox from "./StageBox";
import MintedBox from "./MintedBox";

function AuctionCollection ({contract, name, description, nftImage, nftWebPImage, actionBox}) {
  const { Moralis, isInitialized, account, user } = useMoralis();

  const openSeaListing = "https://opensea.io/assets/ethereum/0x69c5ba025fcf3a3e740f4c150d47e0126ddd106a/1";

  const [collectionDetailsData, setCollectionDetailsData] = useState(null);
  const [collectionDetailsHasError, setCollectionDetailsHasError] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);

  const [allStagesDataLoaded, setAllStagesDataLoaded] = useState(false);
  const [allStagesDataHasError, setAllStagesDataHasError] = useState(false);
  const [allStages, setAllStages] = useState([]);

  const [isWaiting, setIsWaiting] = useState(true);

  const [canMintReason, setCanMintReason] = useState(null);

  // const { fetch, allNfts, error, isLoading } = useMoralisQuery("EthNFTTransfers", q => q.equalTo("to_address", "0xf3e63d88fd8919b2ee715439c8b45bf47b69f538"), [user], {live: true, autoFetch: false});

  const [requiredTier, setRequiredTier] = useState(null);

  // Stage helpers
  const currentStage = () => {
    const now = new Date().getTime() / 1000;
    const stage = allStages.find(stage => (now >= stage.startTime && (now <= stage.endTime || stage.endTime == null)));

    return stage;
  }

  let sectionHeading2 = "text-md sm:text-lg text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className="md:flex justify-center space-x-0 bg-black border-vickie-yellow border-3 mb-10">
      <div className="w-1/3 flex-none justify-items-center bg-stone-900 p-10">
        <picture>
          <source srcSet={`${nftWebPImage} 620w`} type="image/webp" />
          <img src={nftImage} alt="Preview of NFT" className="max-h-72 m-auto aspect-[620/838]"/>
        </picture>
        <div className="w-full pt-4 pb-8 sm:pb-0">
          <p className={`${sectionHeading2} text-center`}>{name}</p>
          <p className="font-gilroy text-white text-md text-center">{description}</p>

          <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Reserve Price</p>
          <p className="font-gilroy text-white text-lg text-center">5 ETH</p>
          
          <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Total Supply</p>
          <p className="font-gilroy text-white text-lg text-center">1</p>

          {collectionDetailsHasError && (
            <p className="font-gilroy text-white text-lg text-center text-red-600">Error loading collection details</p> 
          )}

        </div>
      </div>

      <div className="w-2/3 flex-none">
        <div className="p-10">
          <h1 className="font-display uppercase text-white text-xl font-bold pb-4">Available for auction on OpenSea</h1>

          <a href={openSeaListing} target="_blank" className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">
            Bid on OpenSea
          </a>
        </div>
      </div>
    </div>
  )
}

export default AuctionCollection;