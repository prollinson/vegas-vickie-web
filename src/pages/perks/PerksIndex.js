import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useContracts from '../../hooks/useContracts';

import ConnectWallet from '../../components/dialogs/ConnectWallet';

function PerksIndex() {
  const {Moralis, user, isInitialized, isAuthenticated} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);

  const [checkTokenAddress, setCheckTokenAddress] = useState(null);
  const [checkTokenId, setCheckTokenId] = useState(null);

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  const [contracts, setContracts] = useState([]);

  let navigate = useNavigate();

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;
    
    setAllNfts(await Moralis.Cloud.run("getAllNfts", {
      tier1ContractAddress: tier1Contract.address,
      tier2ContractAddress: tier2Contract.address,
      tier3ContractAddress: tier3Contract.address,
      tier4ContractAddress: tier4Contract.address
    }));
  };

  async function checkPerks(e) {
    e.preventDefault();
    let url = checkTokenAddress+"/"+checkTokenId;
    console.log(url);
    navigate(url, { replace: true })
  };

  useEffect(() => {
    initContracts();
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
              <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? Let us know in <a href="https://discord.gg/vegasvickienft" className="hover:text-vickie-yellow">our discord</a>.</p>
            </>
          )}

          {!allNfts && (
            <div className="flex justify-center p-10">
              <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          )}

          {allNfts && allNfts.length > 0 && (
          <div className="px-5 md:px-8">
            <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase pt-2">Your NFTs</p> 
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
                  <option key={contract.address} value={contract.address}>{contract.name}</option>
                  )
                )}
              </select>
              <input type="text" className="mx-2 w-24 p-2 border border-gray-300 rounded-md" placeholder="Token ID" value={checkTokenId} onChange={e => setCheckTokenId(e.target.value)}/>
              <button className='py-4 px-8 bg-vickie-yellow mt-4 font-display uppercase font-bold justify-center'>Check Perks</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerksIndex;
