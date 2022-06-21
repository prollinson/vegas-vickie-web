import hardhatJSON from './abi/hardhat.json';
import rinkebyJSON from './abi/rinkeby.json';
import mainnetJSON from './abi/mainnet.json';

const networkConfigs = {
  hardhat: hardhatJSON['contracts'],
  rinkeby: rinkebyJSON['contracts'],
  mainnet: mainnetJSON['contracts']
};

let contractConfig = networkConfigs[process.env.REACT_APP_CHAIN];

export { network, contractConfig};
