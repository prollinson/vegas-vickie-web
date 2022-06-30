import { useEnsAddress, useMoralis, useNativeBalance } from "react-moralis";
import { useEffect, useState, useRef } from "react";
import useDealersChoiceContract from "../../hooks/useDealersChoiceContract";
import ConnectWallet from "../dialogs/ConnectWallet";

import { ExternalLinkIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@heroicons/react/solid';

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintBox({contract, mintPrice, totalSupply, maxSupply, walletLimit, canMint, canMintReason, isMintingOpen, currentStage, merkleProof, priorityTier}) {
  const { Moralis, isAuthenticated, isWeb3Enabled, account, user } = useMoralis();
  const { mint: performMint, mintOptions, mintAllowlist, mintAllowlistOptions, contractAddress} = useDealersChoiceContract(contract);
  const {getBalances, data: balance } = useNativeBalance();
  const {name} = useEnsAddress(account);

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  const [mintTransactionStatus, setMintTransactionStatus] = useState(false);
  const [mintTransaction, setMintTransaction] = useState();
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
      let tx;
      if(currentStage.stage === 0) {
        tx = await mintAllowlist.fetch({
          params: mintAllowlistOptions(mintPrice, 1, priorityTier, merkleProof),
          onError: (error) => console.log(error)
          // onSuccess: () => alert("success")
        });
      } else {
        tx = await performMint.fetch({
          params: mintOptions(mintPrice, 1),
          onError: (error) => {
            setMintTransactionStatus('error')
          }
        });
      }
            
      setMintTransaction(tx);

      if(tx == null) {
        throw new Error("No transaction returned");
      }

      setMintTransactionStatus('pending');
  
      let receipt = await tx.wait(3);      
    } catch (error) {
      // TODO: display human readable error message
      setMintTransactionStatus('error');
      setMintError(error);
    } finally {
      // setMintTransactionStatus('completed');
    }
    // setMintTransactionStatus('completed');
  };

  const doneMinting = () => {
    setMintTransactionStatus(false);
    setMintTransaction(null);
    setMintError(null);
  };

  {/* TODO: Handle insuffient funds */}
  {/* TODO: Invalid Proof */}
  useEffect(() => {
    if(performMint.error) {
      setMintTransactionStatus('error');
      setMintError(performMint.error.error);
    }

    if(mintAllowlist.error) {
      setMintTransactionStatus('error');
      setMintError(mintAllowlist.error.error);
    }
  }, [performMint.error, mintAllowlist.error]);

  useEffect(() => {
    getBalances();
  },[]);


  return (
    <div className="md:mx-10 rounded-md bg-stone-900 p-8 md:p-10"> 

    <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

      { (!isAuthenticated || !isWeb3Enabled ) && (
        <>
          <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
          <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? Let us know in <a href="https://discord.gg/vegasvickienft" className="hover:text-vickie-yellow">our discord</a>.</p>
        </>
      )}

      { isAuthenticated && isWeb3Enabled && isMintingOpen && (
        <>
        { !mintTransactionStatus && !performMint.isFetching && (
          <>
            { canMint() && (
              <>
                <h2 className="font-display uppercase text-white text-2xl font-bold">Mint</h2>
                <p className="font-display text-white text-md">You're ready to mint! Get one before they are gone.</p>
                <div className="w-full pt-8">
                  <button onClick={callMint} className="w-auto flex text-xl items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
                  <p className="font-display text-stone-300 text-sm pt-8">Connected to {name ? name : account}. Balance {balance.formatted}</p>
                  {walletLimit && (
                    <p className="font-display text-stone-300 text-sm pt-1 text-center">Maximum {walletLimit} mints per wallet</p>
                  )}
                  <p className="font-display text-stone-500 pt-4 text-center"><a href={`https://etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer" className="hover:text-vickie-yellow flex"><span className="inline-block pr-1">View the contract</span><ExternalLinkIcon className="inline w-5" /></a></p>
                </div>
              </>
            )}

            { !canMint() && (
              <>
                <h2 className="font-display uppercase text-white text-2xl font-bold">You are not able to mint in this stage</h2>
                <p className="font-display text-white text-md">{canMintReason}</p>
              </>
            )}
          </>
        )}

        { performMint.isFetching && (
          <>
            <h2 className="font-display uppercase text-white text-2xl font-bold">Waiting for you to confirm in your wallet</h2>
            <p className="font-display text-white pb-6"></p>
            <div className="flex justify-center p-5">
              <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          </>
        )}
        { mintTransactionStatus && (
          <>
          { !performMint.isFetching && (
            <>
              { mintTransactionStatus === 'pending' && (
                <>
                  <h2 className="font-display uppercase text-white text-2xl font-bold">Your NFT is Minting...</h2>
                  <p className="font-display text-white pb-6">Don't refresh the page while we wait for your transaction to be confirmed.</p>
                  <div className="flex justify-center p-5">
                    <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </>
              )}

              {mintTransactionStatus === 'completed' && (
                <>
                  <h2 className="font-display uppercase text-white text-2xl font-bold">Completed!</h2>
                  <p className="font-display text-white pb-6">Your nft is safely in your wallet.</p>
                  <div className="w-full flex justify-center">
                    <CheckIcon className="fill-vickie-yellow w-20 h-20"/>
                  </div>
                  <button onClick={ () => { doneMinting() }} className="w-auto flex items-center justify-center mt-6 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Done</button>
                </>
              )}

              {mintTransaction && (
                <div className="w-full flex justify-end">
                  <a href={`https://etherscan.io/tx/${mintTransaction.hash}`} target="_blank" rel="noreferrer" className="text-stone-500  hover:text-white text-sm flex">
                    <span className="inline pr-1">View the Transaction</span>
                    <ExternalLinkIcon className="inline-block w-4" />
                  </a>
                </div>
              )}

              { mintError && (
                <>
                  <h2 className="font-display uppercase text-white text-2xl font-bold">Whoops...</h2>
                  <p className="font-display text-white pb-6">Looks like there was a problem starting the mint.</p>
                  <div className='flex flex-col justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
                    <p className="text-normal">Error: {mintError.message}</p>
                  </div>
                  <button onClick={ () => { doneMinting() }} className="w-auto flex items-center justify-center mt-6 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto">Go Back</button>
                </>
              )}   
            </>
          )}
          </>
        )}
        </>
      )}

      {/* Connected Pre-mint */}
      { isWeb3Enabled && !isMintingOpen && (
        <>
            <h2 className="font-display uppercase text-white text-xl font-bold">You are ready for when sale opens</h2>
        </>
      )}

    </div>
  )
};

export default MintBox;