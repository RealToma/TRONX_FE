import Config from '../config';
import { Contract, TronWeb } from 'tronweb';

export const ca = 'TWRxQsh1pZUgPDGKdgqYuy4Y21bW1zARt8';

const chain = Config.chain;

export const tronweb = new TronWeb({
    fullHost: chain.fullHost
});


