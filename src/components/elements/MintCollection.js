import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import useDealersChoiceContract from "../../hooks/useDealersChoiceContract";

import merkleEntries from "../../models/merkle-trees/CollectionsMerkle.js";
import { MerkleTree } from 'merkletreejs';
import { keccak256 as solidityKeccak256 } from "@ethersproject/solidity";

import MintBox from "./MintBox";
import StageBox from "./StageBox";
import MintedBox from "./MintedBox";

function MintCollection ({name, description, nftImage, nftWebPImage, allNfts, actionBox}) {
  const { Moralis, enableWeb3, isInitialized, isWeb3Enabled, isAuthenticated, account } = useMoralis();
  const { getTotalSupply, getMaxSupply, getMintPrice, mint, mintAllowlist, getStages, contractAddress} = useDealersChoiceContract();

  const [merkleProof, setMerkleProof] = useState(null)

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

  const requiredTier = 2;

  // Stage helpers
  const nextStageAfter = (stageNum) => {
    const nextStage = allStages.find(stage => stage.stage == stageNum + 1);
    return nextStage;
  };

  const currentStage = () => {
    const now = new Date().getTime() / 1000;
    const stage = allStages.find(stage => (now >= stage.startTime && (now <= stage.endTime || stage.endTime == null)));

    return stage;
  }

  // Allowlist Checks
  const hashToken = (account, tier) => {
    return Buffer.from(solidityKeccak256(['address','uint256'], [account, tier]).slice(2), 'hex');
  }

  useEffect(() => {
    if (account && requiredTier) {
      const merkleTree = new MerkleTree(merkleEntries.map(token => hashToken(...token)), solidityKeccak256, { sortPairs: true })
      let mp = merkleTree.getHexProof(hashToken(account, requiredTier))
      console.log('Root:', merkleTree.getHexRoot());
      setMerkleProof(mp)
      console.log('Merkle Proof:', mp);
    } else {
      setMerkleProof(null)
    }
  }, [account, merkleEntries, requiredTier])

  const canMint = () => {
    if(account === null) {
      setCanMintReason(`You must connect to your wallet to mint`);
      return false;
    }

    const stage = currentStage();

    if(stage && stage.stage === 0) {
      // is on allowlist
      const matchingEntry = merkleEntries.find(wallet => account.toLowerCase() === wallet[0].toLowerCase());
      
      // can mint this tier
      if(matchingEntry && matchingEntry[1] <= requiredTier) {
        return true;
      }

      if(matchingEntry) {
        setCanMintReason(`You must be on the tier ${requiredTier} allowlist to mint. You are on tier ${matchingEntry[1]}`);
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

  const performMint = async (price, quantity) => {
    const mintCost = price * quantity;

    // If allowlist stage, mint allowlist
    if(currentStage() && currentStage().stage === 0) {
      console.log("performing allowlist mint", requiredTier, merkleProof);
      const tx = mintAllowlist(mintCost, quantity, requiredTier, merkleProof);
      return tx;
    }

    console.log("performing regular mint");
    const tx = mint(mintCost, quantity);
    return tx;
  };

  const refreshLegends = async () => {
    if(isInitialized) {

      const handleError = (error) => {
        setCollectionDetailsHasError(true)
      };

      // Get Collection Details
      let allDetails = Promise.all([
        getTotalSupply.fetch({
          onError: handleError,
          onSuccess: (totalSupply) => { setTotalSupply(totalSupply) }
        }),
      
        getMaxSupply.fetch({
          onError: handleError,
          onSuccess: data => { setMaxSupply(data) }
        }),
  
        getMintPrice.fetch({
          onError: handleError,
          onSuccess: data => { setMintPrice(data)}
        })
      ]).finally(() => {
          setCollectionDetailsData(true);
      })

      // Get Stage Details
      try {
        const stages = await getStages();
        setAllStages(stages);
        setAllStagesDataLoaded(true);
      } catch(err) {
        setAllStagesDataHasError(true);
      }

      setIsWaiting(false);
    }
  };

  useEffect(() => {
    const firstLoad = async () => {
      await refreshLegends();
    };
    firstLoad();

    const interval = setInterval(async () => {
      await refreshLegends();
    }, 60000);
    return () => clearInterval(interval);
  }, [isInitialized]);

  let sectionHeading2 = "text-md sm:text-lg text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className="md:flex justify-center space-x-0 bg-black border-vickie-yellow border-3">
      <div className="w-1/3 flex-none justify-items-center bg-stone-900 p-10">
        <picture>
          <source srcSet={`${nftWebPImage} 620w`} type="image/webp" />
          <img src={nftImage} alt="Preview of NFT" className="max-h-72 m-auto aspect-[620/838]"/>
        </picture>
        <div className="w-full pt-4 pb-8 sm:pb-0">
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
            <>
              {mintPrice && (
                <>
                  <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Mint Price</p>
                  <p className="font-gilroy text-white text-lg text-center">{Moralis.Units.FromWei(mintPrice.toString())} ETH</p>
                </>
              )}

              <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Total Supply</p>
              <p className="font-gilroy text-white text-lg text-center">{maxSupply}</p>

              <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Remaining Supply</p>
              <p className="font-gilroy text-white text-lg text-center">{maxSupply - totalSupply}</p>
            </>
          )}

          {collectionDetailsHasError && (
            <p className="font-gilroy text-white text-lg text-center text-red-600">Error loading collection details</p> 
          )}

        </div>
      </div>

      <div className="w-2/3 flex-none">

        <StageBox allStages={allStages} isLoading={!allStagesDataLoaded}/>

        {/* TODO: Show error if no mintPrice */}
        {mintPrice && (
          <MintBox performMint={performMint} mintPrice={mintPrice} totalSupply={totalSupply} isMintingOpen={currentStage() != null} canMint={canMint} canMintReason={canMintReason} contractAddress={contractAddress}/>
        )}

        <MintedBox allNfts={allNfts} />
      </div>
    </div>
  )
}

export default MintCollection;