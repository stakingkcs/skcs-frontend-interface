const marketList = {
  liquidity: [
    {
      lpAddress: '0xbaa085b3c7e0eb30d75190609fb0cb6e0db56820',
      lpName: 'sKCS+USDT',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/token/usdt.png').default,
      liquidity: 10000,
      apr: 100,
      apiUrl: '',
      swapUrl:
        'https://app.mojitoswap.finance/swap?inputCurrency=0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48&outputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
      addLiquidityUrl:
        'https://app.mojitoswap.finance/add/0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48/0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
    },
    {
      lpAddress: '0xa4e068d12adca07f99593e0133c6c01b01733acf',
      lpName: 'sKCS+KCS',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/token/kcs.png').default,
      liquidity: 10000,
      apr: 100,
      apiUrl: '',
      swapUrl:
        'https://app.mojitoswap.finance/swap?inputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451&outputCurrency=KCS',
      addLiquidityUrl: 'https://app.mojitoswap.finance/add/0x00ee2d494258d6c5a30d6b6472a09b27121ef451/KCS',
    },
  ],
  lending: [
    {
      logo: require('../assets/images/token/skcs.png').default,
      name: 'sKCS',
      supplyAPY: 6,
      borrowAPY: 10,
      collateralFactor: 0.8,
      supplyUrl: 'https://www.torches.finance/en/crypto-bank',
      borrowUrl: 'https://www.torches.finance/en/crypto-bank',
    },
  ],
}

export default marketList

export {}
