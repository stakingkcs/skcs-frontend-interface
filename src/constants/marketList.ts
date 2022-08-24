const marketList = {
  liquidity: [
    {
      appLogo: require('../assets/images/defimarket/mojitoswap.png').default,
      lpAddress: '0xbaa085b3c7e0eb30d75190609fb0cb6e0db56820',
      lpName: 'sKCS+USDT',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/token/usdt.png').default,
      liquidity: 0,
      apr: 0,
      apiUrl: 'https://nft.mojitoswap.finance/mojito/v1/market/apy/skcs/usdt',
      swapUrl:
        'https://app.mojitoswap.finance/swap?inputCurrency=0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48&outputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
      addLiquidityUrl:
        'https://app.mojitoswap.finance/add/0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48/0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
    },
    {
      appLogo: require('../assets/images/defimarket/mojitoswap.png').default,
      lpAddress: '0xa4e068d12adca07f99593e0133c6c01b01733acf',
      lpName: 'sKCS+KCS',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/token/kcs.png').default,
      liquidity: 0,
      apr: 0,
      apiUrl: 'https://nft.mojitoswap.finance/mojito/v1/market/apy/skcs/kcs',
      swapUrl:
        'https://app.mojitoswap.finance/swap?inputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451&outputCurrency=KCS',
      addLiquidityUrl: 'https://app.mojitoswap.finance/add/0x00ee2d494258d6c5a30d6b6472a09b27121ef451/KCS',
    },
    {
      appLogo: require('../assets/images/defimarket/kuswap.png').default,
      lpAddress: '0x77a8d0ef377e7bccda40203acce300c170017570',
      lpName: 'sKCS+KCS',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/defimarket/kuswap.png').default,
      liquidity: 0,
      apr: 0,
      apiUrl: 'https://strms.kuswap.finance/api/farms/skcs-kus',
      swapUrl:
        'https://kuswap.finance/#/swap?inputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451&outputCurrency=0x4a81704d8c16d9fb0d7f61b747d0b5a272badf14',
      addLiquidityUrl:
        'https://kuswap.finance/#/add/0x00ee2d494258d6c5a30d6b6472a09b27121ef451/0x4a81704d8c16d9fb0d7f61b747d0b5a272badf14',
    },
  ],
  lending: [
    {
      appLogo: require('../assets/images/defimarket/torches.png').default,
      logo: require('../assets/images/token/skcs.png').default,
      name: 'sKCS',
      supplyAPY: 0,
      borrowAPY: 0,
      apiUrl: 'https://api.torches.finance/assets/torches/kcc',
      collateralFactor: 0,
      supplyUrl: 'https://www.torches.finance/en/crypto-bank',
      borrowUrl: 'https://www.torches.finance/en/crypto-bank',
    },
  ],
}

export default marketList

export {}
