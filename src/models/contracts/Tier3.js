import {chainId, contractConfig} from '../../contracts.config.js';

const config = contractConfig['VVNeonIdol'];

const ABI = config['abi'];
const address = config['address'];

const contract = { chainId, ABI, address };

export default contract
