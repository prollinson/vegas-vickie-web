import { useMoralis } from "react-moralis";

function MintableCollection ({name, description, nftImage, perks, mintPrice, callMint, mintError, totalSupply, maxSupply}) {
  const { Moralis, isAuthenticated } = useMoralis();

  return (
    <div className="flex justify-center col-span-12 pb-12">
      <div className="flex-none basis-1/4 justify-items-center">
        <img src={nftImage} alt="Preview of NFT"/>
      </div>
      <div className="flex-none basic-3/4 pl-6 pr-6 max-w-lg">
        <h2 className="text-2xl text-white font-gilroy font-black uppercase">{name}</h2>
        <p className="font-display text-white">{description}</p>

        <p className='font-body text-white'>Price: {Moralis.Units.FromWei(mintPrice.toString())} ETH</p>
        <p className='font-body text-white'>{maxSupply.toString()}</p>

        <ul className="font-body text-white uppercase">
          {perks.map((perk) => (
            <li className="border-amber-500 border-b-2 pt-3 pb-3">{perk}</li>
          ))}
        </ul>

        <div className="border-2 border-color-amber bg-amber-900 mt-9 pt-3 pr-6 pb-3 pl-6">
          <h2 className="font-display uppercase text-white text-lg text-bold">Mint</h2>
          { isAuthenticated && (
            <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
          )}

          { !isAuthenticated && (
            <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">Connect Wallet</button>
          )}

          <p className='font-body text-white'>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>

          { mintError && (
            <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
              <p>Error: {mintError.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MintableCollection;