import { useMoralis } from "react-moralis";

import nftImage from '../assets/collector NFT.png';

function MintableCollection ({name, description, perks, mintPrice, callMint, mintError, totalSupply, maxSupply}) {
  const { Moralis, isAuthenticated } = useMoralis();

  return (
    <div className="flex justify-center col-span-12">
      <div className="flex-none basis-1/4 justify-items-center">
        <img src={nftImage} />
      </div>
      <div className="flex-none basic-3/4 p-6 max-w-lg">
        <h2 className="text-2xl text-white">{name}</h2>
        <p className="text-white">{description}</p>

        <p className='text-white'>Price: {Moralis.Units.FromWei(mintPrice.toString())} ETH</p>

        <ul className="text-white">
          {perks.map((perk) => (
            <li className="border-amber-500 border-b-2 pt-3 pb-3">{perk}</li>
          ))}
        </ul>

        { isAuthenticated && (
          <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
        )}

        { !isAuthenticated && (
          <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Connect Wallet</button>
        )}

        <p>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>

        { mintError && (
          <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
            <p>Error: {mintError.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MintableCollection;