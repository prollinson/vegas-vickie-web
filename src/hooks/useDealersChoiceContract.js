import { chain, address as contractAddress, ABI, address} from "../models/contracts/DealersChoice";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useWeb3ExecuteFunction } from "react-moralis";

function useDealersChoiceContract() {
  const { Moralis } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

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

  const getStages = async () => {
    const allowlistReadOptions = {
      chain: chain,
      address: contractAddress,
      function_name: "allowlistSaleStartTime",
      abi: ABI
    };
    const allowlistSaleStartTime = await Moralis.Web3API.native.runContractFunction(allowlistReadOptions);

    const publicReadOptions = {
      chain: chain,
      address: contractAddress,
      function_name: "publicSaleStartTime",
      abi: ABI
    };
    const publicSaleStartTime = await Moralis.Web3API.native.runContractFunction(publicReadOptions);

    const minimumRequiredTierOptions = {
      chain: chain,
      address: contractAddress,
      function_name: "allowlistMinimumTier",
      abi: ABI
    };
    const minimumRequiredTier = await Moralis.Web3API.native.runContractFunction(minimumRequiredTierOptions);

    return [
      {
        stage: 0,
        name: 'Allowlist Winners',
        minimumRequiredTier: minimumRequiredTier,
        startTime: allowlistSaleStartTime,
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
  };

  // Minting

  const mint = async (mintPrice, _quantity) => {  
    const sendOptions = {
      contractAddress: contractAddress,
      functionName: "mint",
      abi: ABI,
      msgValue: mintPrice,
      params: {
        _quantity: _quantity,
      },
    };
  
    const transaction = await Moralis.executeFunction(sendOptions);
    return transaction;
  }

  const mintAllowlist = async (mintCost, quantity, priorityTier, proof) => {
    const sendOptions = {
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
  
    const transaction = Moralis.executeFunction(sendOptions);
    return transaction;
  }

  return {
    getTotalSupply: getTotalSupply,
    getMaxSupply: getMaxSupply,
    getMintPrice: getMintPrice,
    getStages: getStages,
    mint: mint,
    mintAllowlist: mintAllowlist,
    contractAddress: contractAddress,
  }
};

export default useDealersChoiceContract;