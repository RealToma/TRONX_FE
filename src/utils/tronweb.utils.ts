import Config from '../config';
import { TronWeb } from 'tronweb';

export const ca = 'TXvZpjEQiR7iv4Yn1XtXPkt61mocBrrNQu';

const chain = Config.chain;

export const tronweb = new TronWeb({
    fullHost: chain.fullHost
});

