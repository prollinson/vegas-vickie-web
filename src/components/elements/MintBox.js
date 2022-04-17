import { useMoralis } from "react-moralis";

function MintBox({callMint, mintError, mintPrice, totalSupply, maxSupply}) {
  const { Moralis, isAuthenticated } = useMoralis();

  return (
    <div className="border-2 border-color-amber bg-amber-900 mt-9 pt-3 pr-6 pb-3 pl-6">
    <h2 className="font-display uppercase text-white text-lg text-bold">Available to Mint</h2>
    { isAuthenticated && (
      <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
    )}

    { !isAuthenticated && (
      <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">Connect Wallet</button>
    )}

    { totalSupply && maxSupply && (
      <p className='font-body text-white'>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
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