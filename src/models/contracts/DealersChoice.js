import {network as chain, contractConfig} from '../../contracts.config.js';

const config = contractConfig['VVDealersChoice'];

const ABI = config['abi'];
const address = config['address'];

export { chain, ABI, address };
