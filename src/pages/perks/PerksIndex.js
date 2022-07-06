import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import useContracts from '../../hooks/useContracts';
import { useFlags } from 'flagsmith/react';

import ConnectWallet from '../../components/dialogs/ConnectWallet';
import LoadingSpinner from '../../components/elements/LoadingSpinner';

function PerksIndex() {
  const {Moralis, user, isInitialized, isAuthenticated} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);

  const [checkTokenAddress, setCheckTokenAddress] = useState(null);
  const [checkTokenId, setCheckTokenId] = useState(null);

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  const [contracts, setContracts] = useState([]);

  const [isAllNftsLoading, setIsAllNftsLoading] = useState(null);

  let navigate = useNavigate();

  const flags = useFlags(['perks_and_benefits']);

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;
    if(!tier1Contract) return;

    setIsAllNftsLoading(true);

    setAllNfts(await Moralis.Cloud.run("getAllNfts", {
      tier1ContractAddress: tier1Contract.address,
      tier2ContractAddress: tier2Contract.address,
      tier3ContractAddress: tier3Contract.address,
      tier4ContractAddress: tier4Contract.address
    }));

    setIsAllNftsLoading(false);
  };

  async function checkPerks(e) {
    e.preventDefault();
    let url = checkTokenAddress+"/"+checkTokenId;
    console.log(url);
    navigate(url, { replace: true })
  };

  useEffect(() => {
    initContracts();

    if(!flags.perks_and_benefits.enabled) {
      navigate("/");
    }

  }, [user, isInitialized]);

  useEffect(() => {
    getNFTs();

    if(tier1Contract && tier2Contract && tier3Contract && tier4Contract) {
      setContracts([
        {
          name: "The One and Only",
          address: tier1Contract.address
        },
        {
          name: "Dealer's Choice",
          address: tier2Contract.address
        },
        {
          name: "Neon Idol",
          address: tier3Contract.address
        },
        {
          name: "Off the Rack",
          address: tier4Contract.address
        }
      ]);

      setCheckTokenAddress(tier1Contract.address);
    }    
  }, [tier1Contract, tier2Contract, tier3Contract, tier4Contract]);
  
  return (
    <>
      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-6xl mx-auto'>
          <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

          {!isAuthenticated && (
            <>
              <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
              <p className="font-display text-white w-full text-center pt-4">Connect your wallet to check the perks.</p>
            </>
          )}

          {isAllNftsLoading && (
            <LoadingSpinner />
          )}

          {allNfts && allNfts.length > 0 && (
          <div className="px-5 md:px-8">
            <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase pt-2">Your NFTs</p> 
            <p className="font-display text-white text-lg pb-6">Our NFTs come with perks &amp; benefits.</p>
            <ul className="flex flex-1 flex-wrap gap-4 md:gap-6 justify-center">
              { allNfts.map(nft => (
                <li key={nft.token_hash} className="w-full md:w-full flex pb-4">
                  <div className="flex">
                    <div className="w-72 aspect-2/3">
                      <img src={nft.image_url} className="w-full aspect-auto"/>
                    </div>
                  </div>
                  <div className='flex w-2/3 flex-col'>
                    <div className='flex pl-10'>
                      <p className="text-xl sm:text-xl text-white font-gilroy font-bold tracking-widest uppercase">{nft.name}</p> 
                      <p className="text-xl sm:text-xl text-white font-gilroy font-bold tracking-widest uppercase">{`#${nft.token_id}`}</p> 
                    </div>
                    <div className='flex pl-10'>
                      <Link to={`/perks/${nft.token_address}/${nft.token_id}`} className='py-4 px-8 bg-vickie-yellow mt-4 font-display uppercase font-bold justify-center'>View Perks &amp; Benefits</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          )}

          <div className="p-5 md:p-8">
          <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase pt-2">Perk Checker</p> 
            <p className="font-display text-white text-lg pb-6">Check the available perks for any NFT in our collections.</p>
            
            <form onSubmit={(e) => checkPerks(e)}>
              <select selected={checkTokenAddress} onChange={e => setCheckTokenAddress(e.target.value)} className="mx-2 w-46 p-2 border border-gray-300 rounded-md">
                {contracts.map((contract) => (
                  <option key={contract.address} value={contract.address || ''}>{contract.name}</option>
                  )
                )}
              </select>
              <input type="text" className="mx-2 w-24 p-2 border border-gray-300 rounded-md" placeholder="Token ID" value={checkTokenId || ''} onChange={e => setCheckTokenId(e.target.value)}/>
              <button className='py-4 px-8 bg-vickie-yellow mt-4 font-display uppercase font-bold justify-center'>Check Perks</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerksIndex;
