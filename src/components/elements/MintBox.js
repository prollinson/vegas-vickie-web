import { useMoralis, useMoralisSubscription } from "react-moralis";
import { useEffect, useState } from "react";

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintBox({performMint, mintPrice, totalSupply, maxSupply, canMint, canMintReason, contractAddress}) {
  const { Moralis, authenticate, isAuthenticated, account } = useMoralis();

  const [isPendingTransaction, setIsPendingTransaction] = useState(false);
  const [mintTransactions, setMintTransactions] = useState([]);
  const [mintError, setMintError] = useState(null);

  // TODO: Use subscription to get latest mint transactions
  useMoralisSubscription("EthTransactions", q => q, [], {
    onCreate: data => console.log(`New Transaction:`, data)
  });

  // Subscribe to onWeb3Enabled events
  const unsubscribe = Moralis.onWeb3Enabled((result) => {
    console.log("onWeb3Enabled", result);
  });

  // Unsubscribe to onWeb3Enabled events
  // unsubscribe();

  const connectWallet = async () => {
    const isWeb3Active = Moralis.ensureWeb3IsInstalled();

    if (isWeb3Active && account) {
      console.log("Activated");
    } else {
      console.log("enableWeb3");
      await Moralis.enableWeb3();
      await authenticate();
    }
  };

  // Minting
  const callMint = async () => {
    if(!account) { console.log('No account'); return; };
    
    await Moralis.enableWeb3();

    try {
      const tx = await performMint(mintPrice, 1);
            
      console.log("tx:", tx);

      setMintTransactions([...mintTransactions, tx]);
      console.log('mintTransactions:', mintTransactions);

      setIsPendingTransaction(true);

      const receipt = await tx.wait(3);

      console.log('receipt', receipt);
    
    } catch (error) {

      // TODO: display human readable error message
      setMintError(error);
      console.log(error);
    };
    
    // Read new value
    // let totalSupply = await getTotalSupply();
    // setTotalSupply(totalSupply);
  };

  const doneMinting = async () => {
    setIsPendingTransaction(false);
  }

  return (
    <div className="bg-stone-800 p-10"> 

      { !account && (
        <>
          <button onClick={ () => { connectWallet() }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Connect Wallet</button>
          <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? <a href="" className="font-bold">check our guide</a></p>
        </>
      )}

      { account && !isPendingTransaction && (
        <>
          { canMint() && (
            <>
              <h2 className="font-display uppercase text-white text-xl font-bold">Mint</h2>
              <p className="font-display text-white text-md">You're ready to mint! Get one before they are gone.</p>
              <div className="w-full pt-6">
                <button onClick={callMint} className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
                <p className="font-display text-white pt-6 text-center">View the contract <a href={`https://goerli.etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer" className="hover:text-vickie-yellow">{contractAddress}</a></p>
              </div>
            </>
          )}

          { !canMint() && (
            <>
              <h2 className="font-display uppercase text-white text-xl font-bold">You are not able to mint in this stage</h2>
              <p className="font-display text-white text-md">{canMintReason}</p>
            </>
          )}
        </>
      )}

      { account && isPendingTransaction && (
        <>
          <h2 className="font-display uppercase text-white text-xl font-bold">Your NFT is Minting...</h2>
          <p className="font-display text-white pb-6">Don't refresh the page while we wait for your transaction to be confirmed.</p>

          { mintTransactions.length > 0 && (
            <>
              <ul>
                {mintTransactions.map(tx => (
                <li key={tx.hash} className="font-display text-white">
                  {/* TODO: Add produciton etherscan address */}
                  <a href={`https://goerli.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer">Transaction: {tx.hash}</a> {tx.confirmations}/3
                </li> 
                ))}
              </ul>
            </> 
            )}

          <button onClick={ () => { doneMinting() }} className="w-auto flex items-center justify-center mt-6 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Done</button>
        </>
      )}

      { mintError && (
        <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
          <p>Error: {mintError.message}</p>
        </div>
      )}
    </div>
  )
};

export default MintBox;