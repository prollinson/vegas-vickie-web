import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from 'react-moralis';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useContracts from '../../hooks/useContracts';

import ConnectWallet from '../../components/dialogs/ConnectWallet';
import RedemptionForm from '../../components/elements/RedemptionForm';
import Tier1Perks from '../../components/elements/perks/Tier1Perks';
import Tier2Perks from '../../components/elements/perks/Tier2Perks';
import Tier3Perks from '../../components/elements/perks/Tier3Perks';

function PerksShow() {
  const {Moralis, user, isInitialized, isAuthenticated} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);
  const [perks, setPerks] = useState([]);
  let params = useParams();

  const [selectedTokenPerk, setSelectedTokenPerk] = useState(null);
  const [redemptionCodes, setRedemptionCode] = useState({});

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const Web3Api = useMoralisWeb3Api();

  const { data:tokenPerks, error, isLoading } = useMoralisQuery("TokenPerk", query =>
    query
      .equalTo("tokenAddress", params.contractAddress.toLowerCase())
      .equalTo("tokenId", parseInt(params.tokenId))
      .include(["redemptionCustomer", "redemptionCustomer.recemptionCode", "perk"])
      ,
      [params, user],
      {live: true}
  );

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;

    setAllNfts(await Moralis.Cloud.run("getPerksForNft", { contractAddress: params.contractAddress, tokenId: params.tokenId}));
  };

  function imageURLFromIPFS(ipfsURL) {
    let ipfsHash = ipfsURL.split("/").pop();
    return `https://ipfs.vegasvickienft.com/ipfs/${ipfsHash}?img-wudth=600`;
  }

  const redeemPerks = function(selectedTokenPerk) {
    console.log(selectedTokenPerk);
    setSelectedTokenPerk(selectedTokenPerk);
    setIsFormOpen(true);
  }

  const handleFormClose = function () {
    setSelectedTokenPerk(null);
    setIsFormOpen(false);
  }

  useEffect(() => {
    initContracts();
    getNFTs();
  }, [user])
  
  return (
    <>
      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-7xl mx-auto'>
        <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />
        <RedemptionForm selectedPerk={selectedTokenPerk} open={isFormOpen} onClose={handleFormClose} />

        {!isAuthenticated && (
          <>
            <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
            <p className="font-display text-white w-full text-center pt-4">Connect your wallet to mint. Don't have a wallet? Let us know in <a href="https://discord.gg/vegasvickienft" className="hover:text-vickie-yellow">our discord</a>.</p>
          </>
        )}
      
        {allNfts && (
          <div className="p-5 md:p-10">            
            <div className="flex">
              {allNfts.nfts && allNfts.nfts.map(nft => (
                <div className="flex-col">
                  <div className="w-72 aspect-2/3">
                    <img src={nft.image_url} className="w-full aspect-auto"/>
                  </div>
                  <div className='mt-4'>
                    <p className="font-display font-bold text-white text-lg md:text-md uppercase">{nft.name}</p> 
                    <p className="font-display font-bold text-white text-lg">{`#${nft.token_id}`}</p> 
                  </div>
                </div>
              ))}

              {/* Show Loading Spinner */}
              {isLoading && (
                <div className="flex justify-center p-10">
                  <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
              )}

              {/* Display Perks */}
              {tokenPerks && tokenPerks.length > 0 && (
                <div className='flex w-2/3 flex-col'>
                  <div className='flex pl-10 flex-col justify-center'>
                    <div className='"font-display text-white text-lg md:text-md uppercase"'>
                      <ul>
                        {tokenPerks.map(tokenPerk => (
                          <>
                            <li key={tokenPerk.id} className="border border-vickie-yellow p-10 bg-black">
                              <p className="font-display font-bold text-white text-xl md:text-xl uppercase">{tokenPerk.get("perk").get("marketingName")}</p>

                              {tokenPerk.get("redemptionCustomer") && (
                                <>
                                  <p className="font-display text-white text-md">Congratulations on owning a piece of Las Vegas history.  In addition to your unique digital artwork, this NFT comes with the items listed below.</p>

                                  <p className="font-display font-bold text-white text-lg md:text-lg uppercase mt-4">Booking Instructions</p>
                                  <p className="font-display text-white text-md pt-2">Please redeem your utility by calling (702) 726-5498 and mentioning your three digit verification code. Circa is an adults only casino. All guests must be 21 years or older.</p>

                                  {(tokenPerk.get("redemptionCustomer").get("redemptionCode") && tokenPerk.get("redemptionCustomer").get("redemptionCode").get("code") != null) && (
                                    <div className='border border-white text-4xl flex justify-center p-4 mt-10 mb-10 bg-stone-900'>
                                      <p className='text-white'>{tokenPerk.get("redemptionCustomer").get("redemptionCode").get("code")}</p>
                                    </div>
                                  )}
                                </>
                              )}


                              {tokenPerk.get("perk").get("code") === "TIER1" && (
                                <>
                                  <Tier1Perks />
                                </>
                              )}
                              {tokenPerk.get("perk").get("code") === "TIER2" && (
                                <>
                                  <Tier2Perks />
                                </>
                              )}
                              {tokenPerk.get("perk").get("code") === "TIER3" && (
                                <>
                                  <Tier3Perks />
                                </>
                              )}


                              {tokenPerk.get("redemptionCustomer") == null && (
                                <>
                                  <p>These perks have not been redeemed.</p>

                                  {tokenPerk.get("redemptionCustomer") == null && (
                                   <button onClick={ () => redeemPerks(tokenPerk) } className="w-auto flex items-center justify-center mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Redeem Perks</button>
                                  )}
                                </>
                              )}
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                )}
              
              {/* Display is there are any perks asscoiated */}
              {(!tokenPerks || tokenPerks.length===0) && (
                <div className='flex w-2/3 flex-col p-10'>
                  <p className="font-display text-white text-md pb-6">This NFT has no perks</p>
                </div>
              )}

              {error && (
                <div className='flex w-2/3 flex-col p-10'>
                  <p className="font-display text-white text-md pb-6">{error.message}</p>
                </div>
              )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* // TODO: Show redeemed perks for tokens no longer owned */}
    </>
  );
}

export default PerksShow;
