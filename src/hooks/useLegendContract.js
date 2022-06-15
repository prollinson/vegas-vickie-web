import { chain, address as contractAddress, ABI} from "../models/contracts/Legend";
import { useMoralis } from "react-moralis";

function useLegendContract() {
  const { Moralis } = useMoralis();

  // Get Total Supply
  const getTotalSupply = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "totalSupply",
      abi: ABI,
    };
  
    return Moralis.executeFunction(readOptions);
  };

  const getMaxSupply = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "MAX_SUPPLY",
      abi: ABI,
    };
  
    return Moralis.executeFunction(readOptions);
  };

  const getMintPrice = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "MINT_PRICE",
      abi: ABI,
    };
  
    return Moralis.executeFunction(readOptions);
  };

  const getStages = async () => {

    const allowlistReadOptions = {
      contractAddress: contractAddress,
      functionName: "allowlistSaleStartTime",
      abi: ABI,
    };
  
    const allowlistSaleStartTime =  await Moralis.executeFunction(allowlistReadOptions);

    const publicReadOptions = {
      contractAddress: contractAddress,
      functionName: "publicSaleStartTime",
      abi: ABI,
    };
  
    const publicSaleStartTime = await Moralis.executeFunction(publicReadOptions);

    return [
      {
        stage: 0,
        name: 'Allowlist',
        startTime: allowlistSaleStartTime
      },
      {
        stage: 1,
        name: 'Public',
        startTime: publicSaleStartTime
      }
    ]
  };

  // Mint
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
    const receipt = await transaction.wait(3);
  
    return receipt;
  }

  return {
    getTotalSupply: getTotalSupply,
    getMaxSupply: getMaxSupply,
    getMintPrice: getMintPrice,
    getStages: getStages,
    mint: mint,
  }
};

export default useLegendContract;