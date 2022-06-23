
function MintedBox({allNfts}) {
  return (
    <>
      {allNfts && allNfts.length > 0 && (
        <div className="p-10 bg-stone-700">
          <h2 className="font-display uppercase text-white text-lg font-bold">Your Mints</h2>
          <p className="font-display text-white text-md pb-6">Nice one! Look out for the reveal. Here are the NFTs safely in your wallet:</p>

          <ul className="flex flex-1 flex-wrap gap-6 justify-center">
            { allNfts.map(nft => (
              <li key={nft.token_id} className="w-1/4">
                <img src={nft.image_url} className="w-full aspect-auto"/>
                <p className="font-gilroy text-white text-md">{nft.name}</p> 
                <p className="font-gilroy text-white text-md">{`#${nft.token_id}`}</p> 
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default MintedBox;