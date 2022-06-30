import {useEffect, useState} from 'react';
import {networkContracts} from '../contracts.config.js';
import useNetwork from '../hooks/useNetwork.js';

function useContracts() {
  const {init, chainId, chainName} = useNetwork();
  
  const [tier2Contract, setTier2Contract] = useState();
  const [tier3Contract, setTier3Contract] = useState();
  const [tier4Contract, setTier4Contract] = useState();

  useEffect(() => {
    init();
  }, []);

  const initContracts = () => {
    console.log("chainName:", chainName);
    if(!chainName) return;

    let tier2Contract = networkContracts[chainName]['VVDealersChoice'];
    let tier3Contract = networkContracts[chainName]['VVNeonIdol'];
    let tier4Contract = networkContracts[chainName]['VVOffTheRack'];

    setTier2Contract({
      chainId: chainId,
      ABI: tier2Contract['abi'],
      address: tier2Contract['address']
    });

    setTier3Contract({
      chainId: chainId,
      ABI: tier3Contract['abi'],
      address: tier3Contract['address']
    })

    setTier4Contract({
      chainId: chainId,
      ABI: tier4Contract['abi'],
      address: tier4Contract['address']
    })
  }

  return {
    initContracts: initContracts,
    tier2Contract: tier2Contract,
    tier3Contract: tier3Contract,
    tier4Contract: tier4Contract
  }
}

export default useContracts;