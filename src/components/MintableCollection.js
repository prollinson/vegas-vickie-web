import { useMoralis } from "react-moralis";

function MintableCollection ({name, description, mintPrice, callMint, mintError, totalSupply, maxSupply}) {
  const { Moralis, isAuthenticated } = useMoralis();

  return (
    <div className="col-span-12 p-6">
    <h2 className="text-2xl">{name}</h2>
    <p>{description}</p>

    <p>Price: {Moralis.Units.FromWei(mintPrice.toString())} ETH</p>

    { isAuthenticated && (
      <>
        <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
        <p>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
      </>
    )}

    { mintError && (
      <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
        <p>Error: {mintError.message}</p>
      </div>
    )}
  </div>
  )
}

export default MintableCollection;