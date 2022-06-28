import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import useDealersChoiceContract from "../../hooks/useDealersChoiceContract";
import ConnectWallet from "../dialogs/ConnectWallet";

import { ExternalLinkIcon } from '@heroicons/react/solid'

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintBox({contract, mintPrice, totalSupply, maxSupply, walletLimit, canMint, canMintReason, isMintingOpen, currentStage, merkleProof, priorityTier}) {
  const { Moralis, isAuthenticated, isWeb3Enabled, account, user } = useMoralis();
  const { mint: performMint, mintOptions, mintAllowlist, mintAllowlistOptions, contractAddress} = useDealersChoiceContract(contract);

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  const [isPendingTransaction, setIsPendingTransaction] = useState(false);
  const [mintTransactions, setMintTransactions] = useState([]);
  const [mintError, setMintError] = useState(null);

  const hasWalletInstalled = function () {
    const connectorType = Moralis.connectorType;
    if (connectorType === "injected") {
      // console.log("Metamask or an injected provider is used");
    }

    let enabled = true;
    if (typeof window.web3 !== 'undefined') {
      // console.log('web3 is enabled')
      if (window.web3.currentProvider.isMetaMask === true) {
        // console.log('MetaMask is active')
      } else {
        // console.log('MetaMask is not available')
      }
    } else {
      // console.log('web3 is not found')
      return false;
    }
    return enabled;
  }

  const onMintTransactionCompleted = (transaction) => {
    const event = transaction.events.find(event => event.event === 'Transfer');
    const [address, _recipients, _shares] = event.args;
  
    console.log("Tranfers completed: %s", address);
  };


  // Minting
  const callMint = async () => {
    try {
      console.log('currentStage', currentStage);
      console.log('mintPrice', mintPrice);
      console.log('priorityTier', priorityTier);

      let tx;
      if(currentStage.stage === 0) {
        tx = await mintAllowlist.fetch({
          params: mintAllowlistOptions(mintPrice, 1, priorityTier, merkleProof),
          // onSuccess: () => alert("success")
        });
      } else {
        console.log('mintOptions', mintOptions);
        console.log(mintPrice, 1);
        tx = await performMint.fetch({params: mintOptions(mintPrice, 1)});
      }
            
      console.log("tx:", tx);

      if(tx == null) {
        throw new Error("No transaction returned");
      }

      // setMintTransactions([...mintTransactions, tx]);
      // console.log('mintTransactions:', mintTransactions);

      setIsPendingTransaction(true);

      const receipt = await tx.wait(3);

      onMintTransactionCompleted(receipt);
      console.log('receipt', receipt);
    
    } catch (error) {
      // TODO: display human readable error message
      // setMintError(error);
    };
    
    // Read new value
    // let totalSupply = await getTotalSupply();
    // setTotalSupply(totalSupply);
  };

  const doneMinting = async () => {
    setIsPendingTransaction(false);
  }

  {/* TODO: Handle insuffient funds */}
  {/* TODO: Invalid Proof */}
  useEffect(() => {
    if(performMint.error) {
      setMintError(performMint.error.error);
    }

    if(mintAllowlist.error) {
      setMintError(mintAllowlist.error.error);
    }
  }, [performMint.error, mintAllowlist.error]);


  return (
    <div className="mx-10 rounded-md bg-stone-900 p-10"> 

    <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

      { (!isAuthenticated || !isWeb3Enabled ) && (
        <>
          {hasWalletInstalled() && (
            <>
              <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Connect Wallet</button>
              <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? <a href="" className="font-bold">check our guide</a></p>
            </>
          )}

          {!hasWalletInstalled() && (
            <>
              <p className="font-display text-white w-full text-center pt-4">You'll need a wallet to be able to mint. Don't have a wallet? <a href="" className="font-bold">check our guide</a></p>
              <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Create Wallet</button>

            <p className="font-display text-white w-full text-center pt-4">Already have a wallet (MetaMask, Coinbase)? <a href="#" onClick={ () => { setIsConnectWalletOpen(true) }} className="font-bold">connect your wallet</a></p>
            </>
          )}
        </>
      )}

      { isAuthenticated && isWeb3Enabled && isMintingOpen && (
        <>
        { !isPendingTransaction && (
          <>
            { canMint() && (
              <>
                <h2 className="font-display uppercase text-white text-xl font-bold">Mint</h2>
                <p className="font-display text-white text-md">You're ready to mint! Get one before they are gone.</p>
                <div className="w-full pt-6">
                  <button onClick={callMint} className="w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow  hover:bg-white hover:text-black mx-auto">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
                  {walletLimit && (
                    <p className="font-display text-white pt-6 text-center">Maximum {walletLimit} mints per wallet</p>
                  )}
                  <p className="font-display text-white pt-4 text-center">View the contract <a href={`https://etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer" className="hover:text-vickie-yellow">{contractAddress} <ExternalLinkIcon className="inline w-5" /></a></p>
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

        { isPendingTransaction && (
          <>          
          { !performMint.isFetching && (
            <>
            <h2 className="font-display uppercase text-white text-xl font-bold">Your NFT is Minting...</h2>
            <p className="font-display text-white pb-6">Don't refresh the page while we wait for your transaction to be confirmed.</p>

            { mintTransactions.length > 0 && (
              <>
                <ul>
                  {mintTransactions.map(tx => (
                  <li key={tx.hash} className="font-display text-white">
                    <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer"><ExternalLinkIcon className="w-5" /> Transaction: {tx.hash}</a> {tx.confirmations}/3
                  </li> 
                  ))}
                </ul>
              </> 
            )}

            <button onClick={ () => { doneMinting() }} className="w-auto flex items-center justify-center mt-6 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Done</button>
            </>
          )}
          </>
        )}
        </>
      )}

      { mintError && (
        <div className='flex flex-col justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
          <p>There was a problem</p>
          <p className="text-normal">Error: {mintError.message}</p>
        </div>
      )}

      {/* Connected Pre-mint */}
      { isWeb3Enabled && !isMintingOpen && (
        <>
            <h2 className="font-display uppercase text-white text-xl font-bold">You are ready for when sale opens</h2>
        </>
      )}


      {/* { isWeb3Enabled && (
        <>
            <p className="font-display text-white pb-6">Your wallet {user.get("ethAddress")} is connected.</p>
        </>
      )} */}

      {performMint.isFetching && (
        <p className="font-gilroy text-white text-lg text-center text-red-600">Minting</p>
      )}
      {performMint.isLoading && (
        <p className="font-gilroy text-white text-lg text-center text-red-600">loading</p>
      )}

      {mintAllowlist.isFetching && (
        <p className="font-gilroy text-white text-lg text-center text-red-600">Minting</p>
      )}
      {mintAllowlist.isLoading && (
        <p className="font-gilroy text-white text-lg text-center text-red-600">loading</p>
      )}
    </div>
  )
};

export default MintBox;