import { useMoralis } from "react-moralis";
import useLegendContract from "../../hooks/useLegendContract";
import { useEffect, useState } from "react";
import { MerkleTree } from 'merkletreejs';
import { keccak256 as solidityKeccak256 } from "@ethersproject/solidity";
import merkleEntries from "../../models/merkle-trees/CollectionsMerkle.js";

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintBox() {
  const { Moralis, isAuthenticated, account } = useMoralis();
  const { getTotalSupply, getMaxSupply, getMintPrice, getStages, mint } = useLegendContract();

  const [merkleProof, setMerkleProof] = useState(null)

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [allStages, setAllStages] = useState([]);

  const [mintError, setMintError] = useState(null);

  const [isWaiting, setIsWaiting] = useState(true);

  // Allowlist Checks
  const hashToken = (account) => {
    return Buffer.from(solidityKeccak256(['address'], [account]), 'hex');
  }

  // Stage Helpers
  const currentStage = () => {
    const now = new Date().getTime() / 1000;
    const stage = allStages.find(stage => now >= stage.startTime);
    return stage;
  }

  const nextStage = () => {
    const now = new Date().getTime() / 1000;
    const stage = allStages.find(stage => now < stage.startTime);
    console.log(stage);
    return stage;
  };

  const canMint = () => {
    const stage = currentStage();

    if(stage && stage.stage === 0) {
      const matchingEntry = merkleEntries.find(wallet => account.toLowerCase() === wallet[0].toLowerCase());
      return matchingEntry;
    } else if(stage && stage.stage === 1) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const mt = new MerkleTree(merkleEntries.map(token => hashToken(...token)), solidityKeccak256, { sortPairs: true })
    // console.log('Root:')
    // console.log(mt.getHexRoot())

    if (account) {
      const merkleTree = new MerkleTree(merkleEntries.map(token => hashToken(...token)), solidityKeccak256, { sortPairs: true })
      let mp = merkleTree.getHexProof(hashToken(account))
      setMerkleProof(mp)
    } else {
      setMerkleProof(null)
    }
  }, [account, merkleEntries])

  // Minting
  const callMint = async () => {
    if(!account) { console.log('No account'); return; };
    
    await Moralis.enableWeb3();

    try {
      const receipt = mint(mintPrice, 1);
      // setMintTransaction(transaction);
      // setShowTx(true);
    
    } catch (error) {
      setMintError(error);
      console.log(error);
    };
    
    // Read new value
    let totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);
  };

  const refreshLegends = async () => {
    const totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);

    const maxSupply = await getMaxSupply();
    setMaxSupply(maxSupply);

    const mintPrice = await getMintPrice();
    setMintPrice(mintPrice);

    const stages = await getStages();
    setAllStages(stages);

    setIsWaiting(false);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshLegends();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-color-vickie-yellow bg-vickie-yellow mt-9 pt-3 pr-6 pb-3 pl-6">
    { isWaiting && (
      <div>Loading...</div>
    )}

    { !isWaiting && (
      <>
      { currentStage() && (
        <>
          <p>Current Stage: {currentStage().name}</p>
        
          { canMint() && (
            <>
              <h2 className="font-display uppercase text-white text-lg text-bold">Available to Mint</h2>

              { isAuthenticated && (
                <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
              )}

              { !isAuthenticated && (
                <button onClick={ () => { alert("todo") }} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Connect Wallet</button>
              )}
            </>
          )}

          { !canMint() && (
            <p>You are not able to mint in this stage.</p>
          )}

        </>
      )}

      { !currentStage() && (
        <p>Sale will start {nextStage().startTime.toString()}</p>
      )}

        { totalSupply && maxSupply && (
          <p className='font-body text-white'>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
        )}

        { mintError && (
          <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
            <p>Error: {mintError.message}</p>
          </div>
        )}
      </>
    )}
    </div>
  )
};

export default MintBox;