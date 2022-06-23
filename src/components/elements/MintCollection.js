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

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);

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
      
      let allowlistTier = matchingEntry[1];
      // can mint this tier
      if(matchingEntry && allowlistTier <= requiredTier) {
        return true;
      }

      setCanMintReason(`You must be on the tier ${requiredTier} allowlist to mint. You are on tier ${allowlistTier}`);

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
      getTotalSupply.fetch().then(data => {
        setTotalSupply(data);
      });
      
      getMaxSupply.fetch().then( data => {
        setMaxSupply(data);
      });
      
      getMintPrice.fetch().then(data => {
        setMintPrice(data);
      });

      const stages = await getStages();
      setAllStages(stages);

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

          <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Mint Price</p>
          <p className="font-gilroy text-white text-lg text-center">{Moralis.Units.FromWei(mintPrice.toString())} ETH</p>

          <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Total Supply</p>
          <p className="font-gilroy text-white text-lg text-center">{maxSupply}</p>

          <p className="font-gilroy font-bold text-stone-400 text-sm text-center pt-4 uppercase">Remaining Supply</p>
          <p className="font-gilroy text-white text-lg text-center">{maxSupply - totalSupply}</p>

        </div>
      </div>

      <div className="w-2/3 flex-none">        
        <StageBox allStages={allStages} />

        <MintBox performMint={performMint} mintPrice={mintPrice} totalSupply={totalSupply} canMint={canMint} canMintReason={canMintReason} contractAddress={contractAddress}/>

        <MintedBox allNfts={allNfts} />
      </div>
    </div>
  )
}

export default MintCollection;