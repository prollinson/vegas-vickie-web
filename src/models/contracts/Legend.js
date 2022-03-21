import contractConfig from '../../contracts.config.js';

const LegendsConfig = contractConfig['VegasVickieLegend'];

const chain = "eth";
const ABI = LegendsConfig['abi'];
const address = LegendsConfig['address'];

export { chain, ABI, address };
