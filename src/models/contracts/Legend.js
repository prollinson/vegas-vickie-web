import {network as chain, contractConfig} from '../../contracts.config.js';

const LegendsConfig = contractConfig['VegasVickieLegend'];

const ABI = LegendsConfig['abi'];
const address = LegendsConfig['address'];

export { chain, ABI, address };
