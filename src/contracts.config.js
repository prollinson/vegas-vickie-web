import hardhatJSON from './abi/hardhat.json';
import rinkebyJSON from './abi/rinkeby.json';
import mainnetJSON from './abi/mainnet.json';

const networkConfigs = {
  hardhat: hardhatJSON['contracts'],
  rinkeby: rinkebyJSON['contracts'],
  mainnet: mainnetJSON['contracts']
};

let network = null;
switch(process.env.REACT_APP_NODE_ENV) {
  case 'development':
    network = 'hardhat';
  break;
  case 'production':
    network = 'mainnet';
  break;
  case 'staging':
    network = 'rinkeby';
  break;
  default:
    network = 'hardhat';
  break;
}

export default networkConfigs[network];
