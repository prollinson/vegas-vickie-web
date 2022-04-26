import { useMoralis } from "react-moralis";

function NftCollection ({name, description, nftImage, perks, mintPrice, maxSupply, actionBox}) {
  const { Moralis } = useMoralis();

  return (
    <div className="md:flex justify-center col-span-12 pb-12">
      <div className="w-full md:w-1/2 flex-none basis-1/4 justify-items-center pb-4">
        <img src={nftImage} alt="Preview of NFT" className="max-h-72 md:max-h-full m-auto"/>
      </div>
      <div className="w-full md:w-1/2 flex-none pl-6 pr-6">
        <h2 className="text-2xl text-white font-gilroy font-bold tracking-widest uppercase">{name}</h2>
        <p className="font-display text-white">{description}</p>

        { mintPrice && (
          <p className='font-body text-white'>Price: {Moralis.Units.FromWei(mintPrice.toString())} ETH</p>
        )}

        <p className='font-body text-white'>{maxSupply.toString()}</p>

        <ul className="font-body text-white uppercase">
          {perks.map((perk, index) => (
            <li key={index} className="border-vickie-yellow border-b-2 pt-3 pb-3">{perk}</li>
          ))}
        </ul>

        {actionBox}
      </div>
    </div>
  )
}

export default NftCollection;