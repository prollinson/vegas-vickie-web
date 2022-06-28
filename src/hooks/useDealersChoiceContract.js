import {useEffect, useRef, useState} from 'react';
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import { chainId } from "../contracts.config";

function useDealersChoiceContract(contract) {
  const Web3Api = useMoralisWeb3Api();
  const {isInitialized, isInitializing} = useMoralis();
  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let contractAddress = contract.address;
  let chain = contract.chainId;
  let ABI = contract.ABI;

  // Get Total Supply
  const totalSupplyOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "totalSupply",
    abi: ABI
  };
  const getTotalSupply = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    totalSupplyOptions
  );

  // Get Max Supply
  const getMaxSupplyOptions = {
      chain: chain,
      address: contractAddress,
      function_name: "MAX_SUPPLY",
      abi: ABI
    };
  const getMaxSupply = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    getMaxSupplyOptions
  );
  

  // Get Mint Price
  const getMintPriceOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "MINT_PRICE",
    abi: ABI
  };
  const getMintPrice = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    getMintPriceOptions
  );

  
  const allowlistReadOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "allowlistSaleStartTime",
    abi: ABI
  };
  const getAllowlistSaleStartTime = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    allowlistReadOptions
  );


  const publicReadOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "publicSaleStartTime",
    abi: ABI
  };
  const getPublicSaleStartTime = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    publicReadOptions
  );

  const allowlistMinimumTierOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "allowlistMinimumTier",
    abi: ABI
  };
  const getMinimumRequiredTier = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    allowlistMinimumTierOptions
  );

  const walletLimitOptions = {
    chain: chain,
    address: contractAddress,
    function_name: "walletLimit",
    abi: ABI
  };

  // Minting

  const mint = useWeb3ExecuteFunction();
  const mintOptions = function(mintPrice, _quantity){
    return {
      chain: chainId,
      contractAddress: contractAddress,
      functionName: "mint",
      abi: ABI,
      msgValue: mintPrice,
      params: {
        _quantity: _quantity,
      }
    }
  };

  const mintAllowlist = useWeb3ExecuteFunction();
  const mintAllowlistOptions = (mintCost, quantity, priorityTier, proof) => {
    return {
      chain: chainId,
      contractAddress: contractAddress,
      functionName: "mintAllowlist",
      abi: ABI,
      msgValue: mintCost,
      params: {
        _quantity: quantity,
        priorityTier: priorityTier,
        proof: proof,
      },
    };
  }

  useEffect(() => {
    if(!contract) { return };
    if(!isInitialized) { return };

    const fetchAllData = async () => {
      if (cache.current[contract.address]) {
        const data = cache.current[contract.address.toString()];
        setData(data);
      } else {
        const maxSupply = await Web3Api.native.runContractFunction(getMaxSupplyOptions);
        const totalSupply = await Web3Api.native.runContractFunction(totalSupplyOptions);
        const mintPrice = await Web3Api.native.runContractFunction(getMintPriceOptions);
        const minimumRequiredTier = await Web3Api.native.runContractFunction(allowlistMinimumTierOptions);
        const allowListSaleStartTime = await Web3Api.native.runContractFunction(allowlistReadOptions);
        const publicSaleStartTime = await Web3Api.native.runContractFunction(publicReadOptions);
        const walletLimit = await Web3Api.native.runContractFunction(walletLimitOptions);
    
        // Get Stage Details
        let stages = [];
        try {
          stages = [
            {
              stage: 0,
              name: 'VIP & Allowlist Winners',
              minimumRequiredTier: minimumRequiredTier,
              startTime: allowListSaleStartTime,
              endTime: publicSaleStartTime
            },
            {
              stage: 1,
              name: 'Public Sale',
              minimumRequiredTier: null,
              startTime: publicSaleStartTime,
              endTime: null
            }
          ]
        } catch(err) {
          setError('stages data');
        }

        const data = {
          maxSupply: maxSupply,
          totalSupply: totalSupply,
          mintPrice: mintPrice,
          stages: stages,
          walletLimit: walletLimit
        }

        cache.current[contract.address.toString()] = data;
        setData(data)
    
        setStatus('idle');
      }
    };
    fetchAllData();
  }, [contract, isInitialized, isInitializing]);

  return {
    getTotalSupply: getTotalSupply,
    getMaxSupply: getMaxSupply,
    getMintPrice: getMintPrice,
    getMinimumRequiredTier: getMinimumRequiredTier,
    getAllowlistSaleStartTime: getAllowlistSaleStartTime,
    getPublicSaleStartTime: getPublicSaleStartTime,
    mint: mint,
    mintOptions: mintOptions,
    mintAllowlist: mintAllowlist,
    mintAllowlistOptions: mintAllowlistOptions,
    contractAddress: contractAddress,
    data
  }
};

export default useDealersChoiceContract;