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
  const [nft, setNft] = useState(null);
  const [nftError, setNftError] = useState(null);
  let params = useParams();

  const [selectedTokenPerk, setSelectedTokenPerk] = useState(null);

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data:tokenPerks, error, isLoading } = useMoralisQuery("TokenPerk", query =>
    query
      .equalTo("tokenAddress", params.contractAddress.toLowerCase())
      .equalTo("tokenId", parseInt(params.tokenId))
      .include(["redemptionCustomer", "redemptionCustomer.redemptionCode", "perk"])
      ,
      [params, user],
      {live: true}
  );

  const Web3Api = useMoralisWeb3Api();

  const fetchAllTokenIds = async () => {
    if(!tier1Contract) { return }

    const options = {
      address: params.contractAddress.toLowerCase(),
      chain: `0x${Number(tier1Contract.chainId).toString(16)}`,
    };
    const NFTs = await Web3Api.token.getNFTOwners(options);
    console.log(NFTs);
    return NFTs.result;
  };

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;

    let result = await fetchAllTokenIds();

    let nft = result.filter(nft => parseInt(nft.token_id) === parseInt(params.tokenId))[0];
    
    if(!nft) {
      setNftError("No NFT found");
      return;
    }
    setNft(nft);
  };

  function imageURLFromIPFS(ipfsURL) {
    let ipfsHash = ipfsURL.split("/").pop();
    return `https://ipfs.vegasvickienft.com/ipfs/${ipfsHash}?img-wudth=600`;
  }

  const canRedeem = (perk) => {
    if(!user) return false;
    if(!nft) return false;

    if(user.get("ethAddress").toLowerCase() !== nft.owner_of.toLowerCase()) {
      return false
    }

    return perk.get("redemptionCustomer") == null
  }

  const isRedemptionUser = (perk) => {
    if(!user) return false;

    return (perk.get("redemptionCustomer") && perk.get("redemptionCustomer").get("owner").id === user.id);
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

  const getNameFromMetadata = function (nft) {
    let metadata = JSON.parse(nft.metadata)
    if(metadata) {
      return metadata.name
    }
  }

  const getImageFromMetadata = function(nft) {
    let metadata = JSON.parse(nft.metadata)
    if(metadata) {
      return imageURLFromIPFS(metadata.image);
    }
  }

  useEffect(() => {
    initContracts();
  }, [user])

  useEffect(() => {
    getNFTs();
  }, [tier1Contract])
  
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
      
        {nft && (
          <>
          <div className="px-5 md:px-10">
            <div className="flex-col">
              <div className='w-full'>
                <div className='flex-col mt-4 mb-8'>
                  <p className="text-xl sm:text-xl text-white font-gilroy font-bold tracking-widest uppercase">{nft.name}</p> 
                  <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase pt-2">{getNameFromMetadata(nft)}</p> 
                </div>
              </div>
              <div className='flex w-full'>
              <div className="flex-col">
                <div className="w-72 aspect-2/3">
                  <img src={getImageFromMetadata(nft)} className="w-full aspect-auto"/>
                </div>
                
              </div>

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
                            <li key={tokenPerk.id} className="border border-vickie-yellow bg-black">
                              <div className="p-10">
                                <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase">{tokenPerk.get("perk").get("marketingName")}</p>

                                {isRedemptionUser(tokenPerk) && (
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
                              </div>

                              <div className='flex bg-vickie-yellow py-3 px-6 items-center'>
                              {tokenPerk.get("redeemedAt") == null && (
                                <>
                                  <p className='text-md text-black'>These perks are available to redeem by {new Intl.DateTimeFormat("en-US", {year: "numeric",month: "long",day: "2-digit"}).format(tokenPerk.get("perk").get("expiresAt"))}</p>

                                  {canRedeem(tokenPerk) && (
                                   <button onClick={ () => redeemPerks(tokenPerk) } className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl align-self-end">Redeem Perks</button>
                                  )}
                                </>
                              )}
                              {tokenPerk.get("redeemedAt") != null && (
                                <>
                                  <p className='text-md text-black'>These perks have been redeemed.</p>
                                </>
                              )}
                              </div>
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
            </div>
          </>
          )}

          {/* // TODO: Show redeemed perks for tokens no longer owned */}
          {nftError && (
            <div className='flex w-2/3 flex-col p-10'>
              <p className="font-display text-white text-md pb-6">{nftError}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PerksShow;
