import {useMoralis, useMoralisWeb3Api} from 'react-moralis';
import {useEffect, useState} from 'react';

function MintedBox({contract}) {
  const {user, isInitialized} = useMoralis();
  const [allNfts, setAllNfts] = useState([]);

  const Web3Api = useMoralisWeb3Api();


  async function getNFTs(){
    if(!user) return;
    if(!isInitialized) return;
    const options = {
      address: user.get("ethAddress"),
      chain: `0x${Number(contract.chainId).toString(16)}`,
      token_address: contract.address,
    };
    const nfts = await Web3Api.account.getNFTsForContract(options);

    // TODO: Find Image for NFT if not cached
    // let returnedNfts = nfts.result.map(async function(nft){

    //   //  let url = fixURL(nft.token_uri);
    //   let response = await fetch(nft.token_uri, {
    //     mode: 'no-cors',
    //   })

    //   if(response) {
    //     console.log(response);
    //     let data = await response.json()
    //     console.log(data);
    //   }
      
    //   return nft
    // })

    setAllNfts(nfts.result);
  };

  useEffect(() => {
    getNFTs()
  }, [])

  return (
    <>
      {allNfts && allNfts.length > 0 && (
        <div className="p-5 md:p-10">
          <h2 className="font-display uppercase text-white text-lg font-bold">Your Mints</h2>
          <p className="font-display text-white text-md pb-6">Nice one! Look out for the reveal. Here are the NFTs safely in your wallet:</p>

          <ul className="flex flex-1 flex-wrap gap-4 md:gap-6 justify-center">
            { allNfts.map(nft => (
              <li key={nft.token_id} className="w-1/3 md:w-1/4">
                <img src={nft.image_url} className="w-full aspect-auto"/>
                <p className="font-gilroy text-white text-sm md:text-md">{nft.name}</p> 
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