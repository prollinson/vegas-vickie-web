import {useEffect, useRef, useState} from 'react';
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import useNetwork from "./useNetwork.js";

function useDealersChoiceContract(contract) {
  const Web3Api = useMoralisWeb3Api();
  const {isInitialized, isInitializing} = useMoralis();
  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log(contract);

  let contractAddress = contract.address;
  let chain = `0x${Number(contract.chainId).toString(16)}`;
  
  let ABI = contract.ABI;

  let contractBase = {
    chain: chain,
    address: contractAddress,
    abi: ABI
  }

  // Get Total Supply
  const totalSupplyOptions = {
    ...contractBase,
    function_name: "totalSupply",
  };
  const getTotalSupply = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    totalSupplyOptions
  );

  // Get Max Supply
  const getMaxSupplyOptions = {
      ...contractBase,
      function_name: "MAX_SUPPLY",
    };
  const getMaxSupply = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    getMaxSupplyOptions
  );
  

  // Get Mint Price
  const getMintPriceOptions = {
    ...contractBase,
    function_name: "MINT_PRICE",
  };
  const getMintPrice = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    getMintPriceOptions
  );

  
  const allowlistReadOptions = {
    ...contractBase,
    function_name: "allowlistSaleStartTime",
  };
  const getAllowlistSaleStartTime = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    allowlistReadOptions
  );


  const publicReadOptions = {
    ...contractBase,
    function_name: "publicSaleStartTime",
  };
  const getPublicSaleStartTime = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    publicReadOptions
  );

  const allowlistMinimumTierOptions = {
    ...contractBase,
    function_name: "allowlistMinimumTier",
  };
  const getMinimumRequiredTier = useMoralisWeb3ApiCall(
    Web3Api.native.runContractFunction,
    allowlistMinimumTierOptions
  );

  const walletLimitOptions = {
    ...contractBase,
    function_name: "walletLimit",
  };

  // Minting

  const mint = useWeb3ExecuteFunction();
  const mintOptions = function(mintPrice, _quantity){
    console.log("mint contract", contract);
    return {
      chain: chain,
      contractAddress: contract.address,
      abi: ABI,
      functionName: "mint",
      msgValue: mintPrice,
      params: {
        _quantity: _quantity,
      }
    }
  };

  const mintAllowlist = useWeb3ExecuteFunction();
  const mintAllowlistOptions = (mintCost, quantity, priorityTier, proof) => {
    return {
      chain: chain,
      contractAddress: contract.address,
      abi: ABI,
      functionName: "mintAllowlist",
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
    contract,
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