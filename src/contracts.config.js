import hardhatJSON from './abi/hardhat.json';
import goerliJSON from './abi/goerli.json';
import rinkebyJSON from './abi/rinkeby.json';
import mainnetJSON from './abi/mainnet.json';

const networkConfigs = {
  hardhat: hardhatJSON['contracts'],
  rinkeby: rinkebyJSON['contracts'],
  goerli: goerliJSON['contracts'],
  mainnet: mainnetJSON['contracts']
};

let network = process.env.REACT_APP_CHAIN;
let contractConfig = networkConfigs[process.env.REACT_APP_CHAIN];

let chainId = '0x1';
if(network==='rinkeby') {
  chainId = '0x4';
}
if(network==='goerli') {
  chainId = '0x5';
}

export { chainId, network, contractConfig};
