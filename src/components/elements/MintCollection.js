import { useMoralis, useMoralisQuery, useNFTTransfers } from "react-moralis";
import { useEffect, useState } from "react";

import useDealersChoiceContract from "../../hooks/useDealersChoiceContract";

import merkleEntries from "../../models/merkle-trees/CollectionsMerkle.js";
import { MerkleTree } from 'merkletreejs';
import { ethers, utils } from 'ethers';
import keccak256 from 'keccak256';

import MintBox from "./MintBox";
import StageBox from "./StageBox";
import MintedBox from "./MintedBox";

function MintCollection ({contract, name, description, nftImage, nftWebPImage, actionBox}) {
  const { Moralis, isInitialized, account, user } = useMoralis();

  const {contractAddress, data} = useDealersChoiceContract(contract);
  
  const [merkleProof, setMerkleProof] = useState(null)

  const [collectionDetailsData, setCollectionDetailsData] = useState(null);
  const [collectionDetailsHasError, setCollectionDetailsHasError] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [walletLimit, setWalletLimit] = useState(null);
  const [minimumRequiredTier, setMinimumRequiredTier] = useState(0);
  const [allowlistSaleStartTime, setAllowlistSaleStartTime] = useState(0);
  const [publicSaleStartTime, setPublicSaleStartTime] = useState(0);

  const [allStagesDataLoaded, setAllStagesDataLoaded] = useState(false);
  const [allStagesDataHasError, setAllStagesDataHasError] = useState(false);
  const [allStages, setAllStages] = useState([]);

  const [isWaiting, setIsWaiting] = useState(true);

  const [canMintReason, setCanMintReason] = useState(null);
  const [merkleTier, setMerkleTier] = useState(null);

  // const { fetch, allNfts, error, isLoading } = useMoralisQuery("EthNFTTransfers", q => q.equalTo("to_address", "0xf3e63d88fd8919b2ee715439c8b45bf47b69f538"), [user], {live: true, autoFetch: false});

  const [requiredTier, setRequiredTier] = useState(null);

  // Stage helpers
  const currentStage = () => {
    const now = new Date().getTime() / 1000;
    const stage = allStages.find(stage => (now >= stage.startTime && (now <= stage.endTime || stage.endTime == null)));

    return stage;
  }

  // Allowlist Checks
  const hashToken = (account, tier) => {
    return Buffer.from(ethers.utils.solidityKeccak256(['address', 'uint'], [account, tier]).slice(2), 'hex')
  }

  // const priorityTier = () => {
  //   if(user) {
  //     let address = user.get("ethAddress");
  //     if(address == null) {
  //       return;
  //     }

  //     const addresses = merkleEntries.filter(entry => utils.getAddress(entry[0]) === utils.getAddress(account))
  //     if (addresses.length > 0) {
  //       setMerkleTier(addresses[0][1])
  //     } else {
  //       setMerkleTier(null)
  //     }
  //     // const matchingEntry = merkleEntries.find(wallet => address.toLowerCase() === wallet[0].toLowerCase());
  //     return matchingEntry ? matchingEntry[1] : null;
  //   }
  // }

  useEffect(() => {
    if(!user) return;

    let address = user.get("ethAddress");
    if(address == null) {
      return;
    }
    
    const addresses = merkleEntries.filter(entry => utils.getAddress(entry[0]) === utils.getAddress(address))
    if (addresses.length > 0) {
      addresses.sort((a, b) => {
          return a[1] - b[1];
      });
      setMerkleTier(addresses[0][1])
    } else {
      setMerkleTier(null)
    }
  }, [user])

  useEffect(() => {
    if(user) {
      let address = user.get("ethAddress");
      if (address && merkleTier) {
        const merkleTree = new MerkleTree(merkleEntries.map(token => hashToken(token[0], token[1])), keccak256, { sortPairs: true })
        let mp = merkleTree.getHexProof(hashToken(address.toLowerCase(), merkleTier))
        console.log('Root:', merkleTree.getHexRoot());
        setMerkleProof(mp)
      } else {
        setMerkleProof(null)
      }
    }
  }, [user, merkleEntries, merkleTier])

  useEffect(() => {
    if(data){
      setTotalSupply(data.totalSupply);
      setMaxSupply(data.maxSupply);
      setMintPrice(data.mintPrice);
      setAllStages(data.stages);
      setMinimumRequiredTier(data.minimumRequiredTier);
      setWalletLimit(data.walletLimit);
      setAllStagesDataLoaded(true);
      setCollectionDetailsData(true);
    }
  }, [data])

  useEffect(() => {
    if(currentStage()) {
      setRequiredTier(currentStage().minimumRequiredTier);
    }
  }, [allStages]);

  // useEffect(() => {
  //   console.log(allNfts)
  //   console.log(error)
  //   console.log("live query isLoading:", isLoading);

  //   if(user) {
  //     fetch();
  //   }
  // }, [user]);

  const canMint = () => {
    if(account === null) {
      setCanMintReason(`You must connect to your wallet to mint`);
      return false;
    }

    const stage = currentStage();

    if(stage && stage.stage === 0) {      
      // can mint this tier
      if(merkleTier <= requiredTier) {
        return true;
      }

      if(merkleTier) {
        setCanMintReason(`You must be on the tier ${requiredTier} allowlist to mint. You are on tier ${merkleTier}`);
      } else {
        setCanMintReason(`You're not on the allowlist. You must be on the tier ${requiredTier} allowlist to mint.`);
      }

      return false;
    } else if(stage && stage.stage === 1) {
      return true;
    }

    setCanMintReason(`Unknown`);

    return false;
  };

  let sectionHeading2 = "text-md sm:text-2xl text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className="md:flex justify-center space-x-0 bg-black border-vickie-yellow border-3 mb-10">
      <div className="md:w-1/3 flex-none justify-items-center bg-stone-900 p-10">
        <picture>
          <source srcSet={`${nftWebPImage} 620w`} type="image/webp" />
          <img src={nftImage} alt="Preview of NFT" className="max-h-72 m-auto aspect-[620/838]"/>
        </picture>
        <div className="w-full pt-4 pb-2 md:pb-8 sm:pb-0">
          <p className={`${sectionHeading2} text-center`}>{name}</p>
          <p className="font-gilroy text-white text-md text-center">{description}</p>

          {!collectionDetailsData && (
            <div className="flex justify-center p-10">
              <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          )}

          {collectionDetailsData && (
            <div className="w-full flex flex-1 md:flex-col">
              {mintPrice && (
                <div className="w-1/2 md:w-full pt-2 flex-col">
                  <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Mint Price</p>
                  <p className="font-gilroy text-white text-lg text-center">{Moralis.Units.FromWei(mintPrice.toString())} ETH</p>
                </div>
              )}
              <div className="w-1/2 md:w-full pt-2 flex-col">
                <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Total Supply</p>
                <p className="font-gilroy text-white text-lg text-center">{maxSupply}</p>
              </div>

              <div className="w-1/2 md:w-full pt-2 flex-col">
                <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Remaining Supply</p>
                <p className="font-gilroy text-white text-lg text-center">{maxSupply - totalSupply}</p>
              </div>
            </div>
          )}

          {collectionDetailsHasError && (
            <p className="font-gilroy text-white text-lg text-center text-red-600">Error loading collection details</p> 
          )}

        </div>
      </div>

      <div className="w-full md:w-2/3 flex-none">

        <StageBox allStages={allStages} isLoading={!allStagesDataLoaded}/>

        {/* TODO: Show error if no mintPrice */}
        {mintPrice && (
          <MintBox contract={contract} mintPrice={mintPrice} totalSupply={totalSupply} walletLimit={walletLimit} isMintingOpen={currentStage() != null} canMint={canMint} currentStage={currentStage()} canMintReason={canMintReason} contractAddress={contractAddress} merkleProof={merkleProof} priorityTier={merkleTier}/>
        )}

        <MintedBox contract={contract} />
      </div>
    </div>
  )
}

export default MintCollection;