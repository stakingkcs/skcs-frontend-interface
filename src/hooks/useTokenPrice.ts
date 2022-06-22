import CoinGecko from 'coingecko-api'

const CoinGeckoClient = new CoinGecko()

export const getTokenPrice = async () => {
  const res = await CoinGeckoClient.coins.fetch('kucoin-shares', {})
  const marketData: any = res.data.market_data
  return marketData.current_price.usd
}
