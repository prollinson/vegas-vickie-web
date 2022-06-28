import {chainId, network, contractConfig} from '../../contracts.config.js';
import {Moralis} from 'moralis';

const config = contractConfig['VVDealersChoice'];

const ABI = config['abi'];
const address = config['address'];

const contract = { chainId, ABI, address };

export default contract
