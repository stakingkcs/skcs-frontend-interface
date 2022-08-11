import React from 'react'
import styled from 'styled-components'
import Banlance from './components/Banlance'
import Liquidity from './components/Liquitity'
import Supply from './components/Supply'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import marketList from 'constants/marketList'
import axios from 'axios'

const gradientBg = require('../../assets/images/bg.jpg').default
const mGradientBg = require('../../assets/images/mobile_bg.jpg').default

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align: left;
  color: #ffffff;
  margin: 52px 0 12px 0;
  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    margin: 36px 0 8px 0;
  }
`
const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  color: rgba(180, 183, 193, 1);
  max-width: 900px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
    font-size: 14px;
    text-align: center;
    width: 90%;
  }
`

const Warp = styled.div`
  padding: 85px 24px 85px 24px;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  color: white;
  background: url(${gradientBg}) top center no-repeat fixed;
  background-size: 100% 100%;
  @media (max-width: 768px) {
    background: url(${mGradientBg}) no-repeat fixed center top;
    background-size: 100% 100%;
    text-align: center;
    padding: 45px 24px 45px 24px;
  }
`
export const Content = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`
const DataWarp = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
`

const DeFiMarket: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const [liquidityList, setLiquidityList] = React.useState<typeof marketList.liquidity>(marketList.liquidity)
  const [lendingList, setLendingList] = React.useState<typeof marketList.lending>(marketList.lending)

  React.useEffect(() => {
    async function updateliquidityList() {
      if (liquidityList[0].apr !== 0) {
        return
      }
      try {
        const promises = liquidityList.map((l) => axios({ method: 'get', url: l.apiUrl }))
        const responses = await Promise.all(promises)

        const newLiquidityList = liquidityList.map((l, i) => {
          return {
            ...l,
            apr: responses[i].data.data.apy ?? 0,
            liquidity: responses[i].data.data.totalLiquidity ?? 0,
          }
        })

        console.log('newLiquidityList', newLiquidityList)
        setLiquidityList(() => newLiquidityList)
      } catch {
        console.log('get data error')
      }
    }

    updateliquidityList()
  }, [liquidityList])

  React.useEffect(() => {
    async function updateLendingList() {
      if (lendingList[0]?.borrowAPY !== 0) {
        return
      }
      try {
        const responses: any = await axios.get(lendingList[0].apiUrl)

        console.log('————————————', responses)

        const { skcs } = responses.data

        console.log('skcs', skcs)

        const newLendingList: typeof marketList.lending = [
          {
            ...lendingList[0],
            borrowAPY: skcs.borrowsRate + skcs.supplyFildaRate,
            supplyAPY: skcs.supplyRate + skcs.borrowFildaRate,
            collateralFactor: skcs?.collateralFactor ?? 0,
          },
        ]
        console.log('newLendingList', newLendingList)
        setLendingList(() => newLendingList)
      } catch {
        console.log('get data error')
      }
    }
    updateLendingList()
  }, [lendingList])

  return (
    <>
      <Helmet>
        <title>{t('DEFI_17')}</title>
        <meta name="description" content={t('DEFI_18')} />
        <meta name="keywords" content={t('HOME_64')} />
        <meta name="twitter:description" content={t('DEFI_18')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('DEFI_17')} />
      </Helmet>

      <Warp>
        <Title style={{ textAlign: 'center' }}>{t('DEFI_2')}</Title>
        <Content>
          {/* <DanamicCenterBg /> */}
          <Banlance />
          <Title>{t('DEFI_1')}</Title>
          <Desc>{t('DEFI_3')}</Desc>
          <DataWarp>
            {liquidityList.map((liquidity, index) => {
              return <Liquidity liquidity={liquidity} key={index} />
            })}
          </DataWarp>
          <Title>{t('DEFI_4')}</Title>
          <Desc>{t('DEFI_5')}</Desc>
          <DataWarp>
            {lendingList.map((lending, index) => {
              return <Supply lending={lending} key={index} />
            })}
          </DataWarp>
        </Content>
      </Warp>
    </>
  )
}
export default DeFiMarket
