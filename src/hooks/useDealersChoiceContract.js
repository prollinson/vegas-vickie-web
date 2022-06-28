import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";
import { chainId } from "../contracts.config";

function useDealersChoiceContract(contract) {
  const Web3Api = useMoralisWeb3Api();

  let contractAddress = contract.address;
  let chain = contract.chainId;
  let ABI = contract.ABI;

  // Get Total Supply
  const totalSupplyOptions = {
    chain: chain,
    address: contract,
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
  }
};

export default useDealersChoiceContract;