import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from 'react-moralis';
import { useEffect, useState } from 'react';
import useContracts from '../hooks/useContracts';

import PageHeader from '../components/layout/PageHeader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ConnectWallet from '../components/dialogs/ConnectWallet';

import JoinCommunitySection from '../components/elements/JoinCommunitySection';
import RedemptionForm from '../components/elements/RedemptionForm';

function Perks() {
  const openSeaListing = "https://opensea.io/assets/ethereum/0x69c5ba025fcf3a3e740f4c150d47e0126ddd106a/1";

  const {user, isInitialized, isAuthenticated} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);
  const [perks, setPerks] = useState([]);

  const [selectedTokenPerk, setSelectedTokenPerk] = useState(null);

  const {initContracts, tier1Contract, tier2Contract, tier3Contract, tier4Contract} = useContracts();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const Web3Api = useMoralisWeb3Api();

  const { data, error, isLoading } = useMoralisQuery("TokenPerk");

  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;
    if(!tier2Contract) return;

    const options = {
      address: user.get("ethAddress"),
      chain: `0x${Number(tier2Contract.chainId).toString(16)}`,
      token_address: tier2Contract.address,
    };
    const nfts = await Web3Api.account.getNFTsForContract(options);

    // TODO: Find Image for NFT if not cached
    let returnedNfts = nfts.result.map(function(nft){

      // //  let url = fixURL(nft.token_uri);
      // let response = await fetch(nft.token_uri, {
      //   mode: 'no-cors',
      // })
      // console.log(response);
      // let data = await response.json()
      // console.log(data);
      let metadata = JSON.parse(nft.metadata);

      if(!metadata) {
        return nft
      }

      nft.image_url = metadata.image;
      console.log(nft);
      return nft
    })

    setAllNfts(returnedNfts.sort((a,b) => { return a.token_id > b.token_id }));
  };

  function imageURLFromIPFS(ipfsURL) {
    return;
  }

  const redeemPerks = function(selectedTokenPerk) {
    console.log(selectedTokenPerk);
    setSelectedTokenPerk(selectedTokenPerk);
    setIsFormOpen(true);
  }

  function getMarketingName(tokenPerk) {
    let perk = tokenPerk.get("perk");
    perk.fetch();
    let marketingName = perk.get("marketingName");
    return marketingName;
  }

   function getRedemptionCode(tokenPerk) {
    let redemption = tokenPerk.get("redemptionCustomer");
    if(redemption == null) { return; }
    redemption.fetch();
    let redemptionCode = redemption.get("redemptionCode");
    if(redemptionCode == null) { return; }
    redemptionCode.fetch();
    return redemptionCode.get("code");
  }

  const handleFormClose = function () {
    setSelectedTokenPerk(null);
    setIsFormOpen(false);
  }

  useEffect(() => {
    initContracts();
    getNFTs()
  }, [user])
  
  return (
    <>
      <Header />
      <PageHeader pageTitle="Perks &amp; Benefits" />

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


          {allNfts && allNfts.length > 0 && (
          <div className="p-5 md:p-10">
            <h2 className="font-display uppercase text-white text-lg font-bold">Your Mints</h2>
            <p className="font-display text-white text-md pb-6">Nice one! Look out for the reveal. Here are the NFTs safely in your wallet:</p>
              <p className='text-white'>{JSON.stringify(data)}</p>
            <ul className="flex flex-1 flex-wrap gap-4 md:gap-6 justify-center">
              { allNfts.map(nft => (
                <li key={nft.token_id} className="w-full md:w-full flex">
                  <div className="flex">
                    <div className="w-72 bg-stone-800 h-72 aspect-2/3">
                      <img src={nft.image_url} className="w-full aspect-auto"/>
                    </div>
                  </div>
                  <div className='flex w-2/3 flex-col'>
                    <div className='flex justify-center'>
                      <p className="font-display text-white text-lg md:text-md uppercase">{nft.name}</p> 
                      <p className="font-display text-white text-md">{`#${nft.token_id}`}</p> 
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h2 className='font-display text-lg'>Perks</h2>
                      <div className='"font-display text-white text-lg md:text-md uppercase"'>
                        <h2 className="font-display text-white text-lg md:text-md uppercase">Your Perks &amp; Benefits</h2>
                        <ul>
                          
                          {data.filter(tokenPerk => tokenPerk.get("tokenAddress").toLowerCase() == nft.token_address.toLowerCase() && tokenPerk.get("tokenId") == nft.token_id).map(tokenPerk => (
                            <>
                              {tokenPerk.get("redemptionCustomer") == null && (
                                <li key={tokenPerk.id}>
                                  <p className="font-display text-white text-md">Perk: {getMarketingName(tokenPerk)}</p>
                                  <button onClick={ () => redeemPerks(tokenPerk) } className="w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">Redeem Perks</button>
                                </li>
                              )}
                              {tokenPerk.get("redemptionCustomer") && (
                                <li key={tokenPerk.id}>
                                  <p className="font-display text-white text-md">Perk: {getMarketingName(tokenPerk)}</p>
                                  <p className='text-white'>Redeemed</p>
                                  <p className='text-white'>{getRedemptionCode(tokenPerk)}</p>
                                </li>   
                              )}
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          )};
        </div>
      </div>

      {/* // TODO: Show redeemed perks for tokens no longer owned */}

      {/* Join the Community */}
      <JoinCommunitySection />

      <Footer />
    </>
  );
}

export default Perks;
