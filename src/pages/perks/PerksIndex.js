import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import useContracts from '../../hooks/useContracts';

import ConnectWallet from '../../components/dialogs/ConnectWallet';

function PerksIndex() {
  const {Moralis, user, isInitialized, isAuthenticated} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;
    
    setAllNfts(await Moralis.Cloud.run("getAllPerksByNft", {
      tier1ContractAddress: tier1Contract.address,
      tier2ContractAddress: tier2Contract.address,
      tier3ContractAddress: tier3Contract.address,
      tier4ContractAddress: tier4Contract.address
    }));
  };

  useEffect(() => {
    initContracts();
    getNFTs()
  }, [user, isInitialized]);
  
  return (
    <>
      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-7xl mx-auto'>
          <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

          {!isAuthenticated && (
            <>
              <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
              <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? Let us know in <a href="https://discord.gg/vegasvickienft" className="hover:text-vickie-yellow">our discord</a>.</p>
            </>
          )}

          {allNfts && allNfts.length > 0 && (
          <div className="p-5 md:p-10">
            <h2 className="font-display uppercase text-white text-lg font-bold">Your Mints</h2>
            <p className="font-display text-white text-md pb-6">Nice one! Look out for the reveal. Here are the NFTs safely in your wallet:</p>
            <ul className="flex flex-1 flex-wrap gap-4 md:gap-6 justify-center">
              { allNfts.map(nft => (
                <li key={nft.token_hash} className="w-full md:w-full flex">
                  <div className="flex">
                    <div className="w-72 aspect-2/3">
                      <img src={nft.image_url} className="w-full aspect-auto"/>
                    </div>
                  </div>
                  <div className='flex w-2/3 flex-col'>
                    <div className='flex pl-10'>
                      <p className="font-display text-white text-lg md:text-md uppercase">{nft.name}</p> 
                      <p className="font-display text-white text-lg">{`#${nft.token_id}`}</p> 
                    </div>
                    <div className='flex pl-10'>
                      <Link to={`/perks/${nft.token_address}/${nft.token_id}`} className="font-display text-white text-lg md:text-md uppercase">View Perks &amp; Benefits</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PerksIndex;
