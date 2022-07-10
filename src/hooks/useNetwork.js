import { useState } from 'react';
import {useChain} from 'react-moralis';

let supportedNetworks = {
  '0x1': {
    chainId: 0x1,
    name: 'mainnet'
  },
  '0x4': {
    chainId: 0x4,
    name: 'rinkeby'
  },
  '0x5': {
    chainId: 0x1,
    name: 'goerli'
  }
}

const defaultChainId = () => {
  let chainId;
  Object.keys(supportedNetworks).forEach(key => {
    if(process.env.REACT_APP_CHAIN === supportedNetworks[key].name) {
      chainId = supportedNetworks[key].chainId;
    }
  })
  return chainId;
}

const defaultChainName = () => {
  return process.env.REACT_APP_CHAIN;
}

function useNetwork() {
  const {chain: connectedChain} = useChain();
  const [chainId, setChainId] = useState(defaultChainId());
  const [chainName, setChainName] = useState(defaultChainName());

  const init = () => {
    setChainName(defaultChainName());
    setChainId(connectedChain != null ? connectedChain.chainId : defaultChainId());

    if(chainId && supportedNetworks[chainId]) {
      setChainName(supportedNetworks[chainId].name);
    }
  }

  return {
    init,
    chainId: chainId,
    chainName: chainName
  }
}

export default useNetwork;