function AuctionBox({totalSupply, maxSupply}) {
  return (
    <div className="border-2 border-color-amber mt-9 pt-3 pr-6 pb-3 pl-6">
    <h2 className="font-display uppercase text-white text-lg text-bold">Buy</h2>
    
    <button className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Place Bid</button>

    <p className='font-body text-white'>{totalSupply.toString()}/{maxSupply.toString()}.</p>
  </div>
  );
};

export default AuctionBox;