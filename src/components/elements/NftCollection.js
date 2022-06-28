function NftCollection ({name, description, nftImage, nftWebPImage, availableText, perks, mintPrice, maxSupply, actionBox, actionButton}) {
  let sectionHeading2 = "text-md sm:text-lg text-white font-bold tracking-widest uppercase";
  let bodyTextSmall = 'font-gilroy text-white text-lg';

  return (
    <div className="md:flex justify-center pb-24 sm:pb-52 space-x-0 sm:space-x-24 p-4 sm:p-0">
      <div className="w-full md:w-1/2 flex-none basis-1/4 justify-items-center">
        <picture>
          <source srcSet={`${nftWebPImage} 620w`} type="image/webp" />
          <img src={nftImage} alt="Preview of NFT" className="md:w-full max-h-96 md:max-h-full m-auto aspect-[620/838]"/>
        </picture>
        <div className="w-full pt-8 pb-8 sm:pb-0">
          <p className="font-gilroy text-white text-md text-center pb-4">{availableText}</p>
          {actionButton}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex-none">
        <h2 className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase">{name}</h2>
        <p className="font-display text-white">{description}</p>

        <div className="flex flex-row flex-initial pt-1 sm:pt-2">
          <p className='font-body text-vickie-yellow text-xl sm:text-2xl'>{maxSupply.toString()}</p>
          { mintPrice && (
            <>
              <p className='font-body text-vickie-yellow text-xl sm:text-2xl px-4'>|</p>
              <p className='font-body text-vickie-yellow text-xl sm:text-2xl w-72'>Price: {mintPrice.toString()}</p>
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