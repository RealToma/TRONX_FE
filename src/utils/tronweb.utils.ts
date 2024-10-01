import Config from '../config';
import { Contract, TronWeb } from 'tronweb';

export const ca = 'TNHt8RAA7BqrGR4yKeyoAtNxXNQYC82F4x';
export const issure = 'TH8Q3U51hDAeSwhSihphLVNy2Q4cDn4LkT';

const chain = Config.chain;

export const tronWeb = new TronWeb({
    fullHost: chain.fullHost
});


