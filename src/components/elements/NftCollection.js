import { useMoralis } from "react-moralis";

function NftCollection ({name, description, nftImage, perks, mintPrice, maxSupply, actionBox}) {
  const { Moralis } = useMoralis();

  return (
    <div className="flex justify-center col-span-12 pb-12">
      <div className="flex-none basis-1/4 justify-items-center">
        <img src={nftImage} alt="Preview of NFT"/>
      </div>
      <div className="flex-none basic-3/4 pl-6 pr-6 max-w-lg">
        <h2 className="text-2xl text-white font-gilroy font-black uppercase">{name}</h2>
        <p className="font-display text-white">{description}</p>

        { mintPrice && (
          <p className='font-body text-white'>Price: {Moralis.Units.FromWei(mintPrice.toString())} ETH</p>
        )}

        <p className='font-body text-white'>{maxSupply.toString()}</p>

        <ul className="font-body text-white uppercase">
          {perks.map((perk) => (
            <li className="border-amber-500 border-b-2 pt-3 pb-3">{perk}</li>
          ))}
        </ul>

        {actionBox}
      </div>
    </div>
  )
}

export default NftCollection;