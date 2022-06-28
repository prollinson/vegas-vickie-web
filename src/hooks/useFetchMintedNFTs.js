import {useEffect, useRef, useState} from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

function useFetchMintedNFTs(contract) {
  const {isInitialized, isInitializing, user} = useMoralis();
  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    if(!contract) { return };
    if(!isInitialized) { return };
    if(!user) return;
    
      async function fetchNFTs(){
        if(cache.current[contract.address.toString()]) {
          const data = cache.current[contract.address.toString()];
          setData(data);
        } else {
          const options = {
            address: user.get("ethAddress"),
            chain: contract.chainId,
            token_address: contract.address,
          };
          const nfts = await Web3Api.account.getNFTsForContract(options);

          cache.current[contract.address.toString()] = nfts;
          setData(nfts);
        }
    
        // TODO: Find Image for NFT if not cached
        // let returnedNfts = nfts.result.map(async function(nft){
    
        //   //  let url = fixURL(nft.token_uri);
        //   // let response = await fetch(nft.token_uri)
        //   // console.log(response);
        //   // let data = await response.json()
    
          
        //   return nft
        // })
      };

      fetchNFTs()
  }, [contract, user, isInitialized, Web3Api])

  return {
    data
  }
}

export default useFetchMintedNFTs;