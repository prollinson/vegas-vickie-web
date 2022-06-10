function NftCollection ({name, description, nftImage, availableText, perks, mintPrice, maxSupply, actionBox}) {
  let sectionHeading2 = "text-lg text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className="md:flex justify-center pb-52 space-x-24">
      <div className="w-full md:w-1/2 flex-none basis-1/4 justify-items-center">
        <img src={nftImage} alt="Preview of NFT" className="max-h-72 md:max-h-full m-auto"/>
        <div className="w-full pt-8">
          <p className="font-gilroy text-white text-md text-center">{availableText}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex-none">
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

        <ul className="font-body text-white pt-4">
          {perks.map((perk, index) => (
            <li key={index} className="pt-3 pb-3">
              <h2 className={`${sectionHeading2}`}>{perk.name}</h2>
              <p className={`${bodyTextSmall}`}>{perk.description}</p>
            </li>
          ))}
        </ul>

        {actionBox}
      </div>
    </div>
  )
}

export default NftCollection;