import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from 'react-moralis';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useContracts from '../../hooks/useContracts';

import ConnectWallet from '../../components/dialogs/ConnectWallet';
import RedemptionForm from '../../components/elements/RedemptionForm';
import Tier1Perks from '../../components/elements/perks/Tier1Perks';
import Tier2Perks from '../../components/elements/perks/Tier2Perks';
import Tier3Perks from '../../components/elements/perks/Tier3Perks';
import Tier4Perks from '../../components/elements/perks/Tier4Perks';
import LoadingSpinner from '../../components/elements/LoadingSpinner';

function PerksShow() {
  const {Moralis, user, isInitialized, isAuthenticated} = useMoralis();
  const [nft, setNft] = useState(null);
  const [nftError, setNftError] = useState(null);
  const [isNftLoading, setIsNftLoading] = useState(null);
  let params = useParams();

  const [selectedTokenPerk, setSelectedTokenPerk] = useState(null);
  const [requireDOB, setRequireDOB] = useState(null);

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
    if(!isInitialized) return;
    setIsNftLoading(true);
    setNftError(null);

    let result = await fetchAllTokenIds();

    if(!result) {
      setNftError("No NFTs found");
      setIsNftLoading(false);
      return;
    }
    let nft = result.filter(nft => parseInt(nft.token_id) === parseInt(params.tokenId))[0];
    
    if(!nft) {
      setNftError("No NFT found");
      setIsNftLoading(false);
      return;
    }
    setNft(nft);
    setIsNftLoading(false);
    setNftError(null);
  };

  function imageURLFromIPFS(ipfsURL) {
    let ipfsHash = ipfsURL.split("/").pop();
    return `https://ipfs.vegasvickienft.com/ipfs/${ipfsHash}?img-width=600`;
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

    return (perk.get("redemptionCustomer") &&  perk.get("redemptionCustomer").get("owner") && perk.get("redemptionCustomer").get("owner").id === user.id);
  }

  const redeemPerks = function(selectedTokenPerk) {
    console.log(selectedTokenPerk);
    setSelectedTokenPerk(selectedTokenPerk);

    if(selectedTokenPerk.get("perk").get("code") === "TIER4") {
      setRequireDOB(true);
    } else {
      setRequireDOB(false);
    }

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
        <RedemptionForm selectedPerk={selectedTokenPerk} open={isFormOpen} onClose={handleFormClose} requireDOB={requireDOB}/>
      
        {/* Show Loading Spinner */}
        {isNftLoading && (
          <LoadingSpinner />
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
                <LoadingSpinner />
              )}

              {/* Display Perks */}
              {tokenPerks && tokenPerks.length > 0 && (
                <div className='flex w-2/3 flex-col'>
                  <div className='flex pl-10 flex-col justify-center'>
                    <div className='"font-display text-white text-lg md:text-md uppercase"'>
                      <ul>
                        {tokenPerks.map(tokenPerk => (
                          <>
                            <li key={tokenPerk.id} className="border border-vickie-yellow bg-black mb-8">
                              <div className="p-10">
                                <p className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase">{tokenPerk.get("perk").get("marketingName")}</p>

                                {isRedemptionUser(tokenPerk) && (
                                  <>
                                    <p className="font-display text-white text-md">Congratulations on owning a piece of Las Vegas history.  In addition to your unique digital artwork, this NFT comes with the items listed below.</p>

                                    <p className="font-display font-bold text-white text-lg md:text-lg uppercase mt-4">Booking Instructions</p>
                                    <p className="font-display text-white text-md pt-2">Please redeem your utility by calling (702) 726-5498 and mentioning your three digit verification code. Please wait 24 hours before calling, so we can ensure your redemption has been processed.  Circa is an adults only casino. All guests must be 21 years or older.</p>

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
                                {tokenPerk.get("perk").get("code") === "TIER4" && (
                                  <>
                                    <Tier4Perks />
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

                    {!isAuthenticated && (
                    <div className='mt-10'>
                      <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
                      <p className="font-display text-white w-full text-center pt-4">Own this NFT? Connect your wallet to redeem your perks.</p>
                    </div>
                  )}
                  </div>
                </div>
                )}
              
              {/* Display is there are any perks asscoiated */}
              {(!tokenPerks || tokenPerks.length===0) && (
                <div className="border border-vickie-yellow bg-black w-full ml-10 px-10 py-20">
                  <div className='flex w-full flex-col'>
                    <p className="text-xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase text-center">This NFT has no unredeemed perks</p>
                  </div>

                  {!isAuthenticated && (
                    <div className='mt-10'>
                      <button onClick={ () => { setIsConnectWalletOpen(true) }} className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Connect Wallet</button>
                      <p className="font-display text-white w-full text-center pt-4">Own this NFT? Connect your wallet to see redeemed perks.</p>
                    </div>
                  )}
                </div>
              )}

              {/* {error && (
                <div className='flex w-2/3 flex-col p-10'>
                  <p className="font-display text-white text-md pb-6">{error.message}</p>
                </div>
              )} */}

              
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
