import { useMoralis } from "react-moralis";
import useLegendContract from "../../hooks/useLegendContract";
import { useEffect, useState } from "react";

function MintBox() {
  const { Moralis, isAuthenticated, account } = useMoralis();
  const { getTotalSupply, getMaxSupply, getMintPrice, mint } = useLegendContract();

  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);

  const [mintError, setMintError] = useState(null);

  const [isWaiting, setIsWaiting] = useState(true);

  // Minting
  const callMint = async () => {
    if(!account) { console.log('No account'); return; };
    
    await Moralis.enableWeb3();

    try {
      const receipt = mint(mintPrice, 1);
      // setMintTransaction(transaction);
      // setShowTx(true);
    
    } catch (error) {
      setMintError(error);
      console.log(error);
    };
    
    // Read new value
    let totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);
  };

  const refreshLegends = async () => {
    const totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);

    const maxSupply = await getMaxSupply();
    setMaxSupply(maxSupply);

    const mintPrice = await getMintPrice();
    setMintPrice(mintPrice);

    setIsWaiting(false);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshLegends();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-color-vickie-yellow bg-vickie-yellow mt-9 pt-3 pr-6 pb-3 pl-6">
    { isWaiting && (
      <div>Loading...</div>
    )}

    { !isWaiting && (
      <>
        <h2 className="font-display uppercase text-white text-lg text-bold">Available to Mint</h2>

        { isAuthenticated && (
          <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Mint 1 @ {Moralis.Units.FromWei(mintPrice.toString())} ETH</button>
        )}

        { !isAuthenticated && (
          <button onClick={ () => { alert("todo") }} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-vickie-yellow">Connect Wallet</button>
        )}

        { totalSupply && maxSupply && (
          <p className='font-body text-white'>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
        )}

        { mintError && (
          <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300'>
            <p>Error: {mintError.message}</p>
          </div>
        )}
      </>
    )}
    </div>
  )
};

export default MintBox;