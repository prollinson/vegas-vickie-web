import hardhatJSON from './abi/hardhat.json';
import goerliJSON from './abi/goerli.json';
import rinkebyJSON from './abi/rinkeby.json';
import mainnetJSON from './abi/mainnet.json';

const networkContracts = {
  hardhat: hardhatJSON['contracts'],
  rinkeby: rinkebyJSON['contracts'],
  goerli: goerliJSON['contracts'],
  mainnet: mainnetJSON['contracts']
};

export { networkContracts };
