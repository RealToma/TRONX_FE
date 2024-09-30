const env = process.env.NODE_ENV;

const Config = {
  version: 'v1.0.0',
  chain: {
    privateKey: '01',
    fullHost: 'https://api.trongrid.io'
  },
  service: {},
  contract: {
    tronAdz: ''
  },
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://tronscan.io/#'
};

let devConfig = {};
if (env === 'development') {
  devConfig = {
    chain: {
      privateKey: '01',
      fullHost: 'https://api.nileex.io'
    },
    service: {},
    contract: {
      tronAdz: 'TXvZpjEQiR7iv4Yn1XtXPkt61mocBrrNQu'
    },
    justSwap: 'https://justswap.org/',
    tronscanUrl: 'https://nile.tronscan.io/#'
  };
}
export default Object.assign(Config, devConfig);
