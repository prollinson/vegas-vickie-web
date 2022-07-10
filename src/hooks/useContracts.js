import {useEffect, useState} from 'react';
import {networkContracts} from '../contracts.config.js';
import useNetwork from '../hooks/useNetwork.js';

function useContracts() {
  const {init, chainId, chainName} = useNetwork();
  
  const [tier1Contract, setTier1Contract] = useState();
  const [tier2Contract, setTier2Contract] = useState();
  const [tier3Contract, setTier3Contract] = useState();
  const [tier4Contract, setTier4Contract] = useState();

  useEffect(() => {
    init();
  }, []);

  const initContracts = () => {
    if(!chainName) return;

    let tier1Contract = networkContracts[chainName]['VVOneAndOnly'];
    let tier2Contract = networkContracts[chainName]['VVDealersChoice'];
    let tier3Contract = networkContracts[chainName]['VVNeonIdol'];
    let tier4Contract = networkContracts[chainName]['VVOffTheRack'];

    setTier1Contract({
      chainId: chainId,
      ABI: tier1Contract['abi'],
      address: tier1Contract['address']
    });

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
    tier1Contract: tier1Contract,
    tier2Contract: tier2Contract,
    tier3Contract: tier3Contract,
    tier4Contract: tier4Contract
  }
}

export default useContracts;