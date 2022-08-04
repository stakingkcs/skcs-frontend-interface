const marketList = {
  liquidity: [
    {
      lpAddress: '0xbaa085b3c7e0eb30d75190609fb0cb6e0db56820',
      lpName: 'sKCS+USDT',
      AToken: require('../assets/images/token/skcs.png').default,
      BToken: require('../assets/images/token/usdt.png').default,
      liquidity: 0,
      apr: 0,
      apiUrl: '',
      swapUrl:
        'https://app.mojitoswap.finance/swap?inputCurrency=0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48&outputCurrency=0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
      addLiquidityUrl:
        'https://app.mojitoswap.finance/add/0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48/0x00ee2d494258d6c5a30d6b6472a09b27121ef451',
    },
  ],
}

export default marketList

export {}
