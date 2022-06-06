function NftCollection ({name, description, nftImage, perks, mintPrice, maxSupply, actionBox}) {
  return (
    <div className="md:flex justify-center col-span-12 pb-24">
      <div className="w-full md:w-1/2 flex-none basis-1/4 justify-items-center pb-4">
        <img src={nftImage} alt="Preview of NFT" className="max-h-72 md:max-h-full m-auto"/>
      </div>
      <div className="w-full md:w-1/2 flex-none pl-16 pr-6">
        <h2 className="text-3xl text-white font-gilroy font-bold tracking-widest uppercase">{name}</h2>
        <p className="font-display text-white">{description}</p>

        <div className="flex flex-row flex-initial pt-2">
          <p className='font-body text-vickie-yellow text-2xl'>{maxSupply.toString()}</p>
          { mintPrice && (
            <>
              <p className='font-body text-vickie-yellow text-2xl px-4'>|</p>
              <p className='font-body text-vickie-yellow text-2xl w-72'>Price: {mintPrice.toString()}</p>
            </>
          )}
        </div>

        <ul className="font-body text-white uppercase pt-4">
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