import React from 'react'
import styled from 'styled-components'
import Banlance from './components/Banlance'
import Liquidity from './components/Liquitity'
import Supply from './components/Supply'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import DanamicCenterBg from '../../components/DynamicBg/DynamicCenterBg'

const gradientBg = require('../../assets/images/gradient-bg.png').default

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align: left;
  color: #ffffff;
  margin: 52px 0 48px 0;
  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    margin: 36px 0 12px 0;
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
  margin-bottom: 24px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
    width: 90%;
  }
`

const Warp = styled.div`
  padding: 85px 0;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  background-size: 1600px auto;
  color: white;
  background: url(${gradientBg}) no-repeat fixed center;
  @media (max-width: 768px) {
    background: url(${gradientBg}) no-repeat fixed center;
    text-align: center;
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
  justify-content: flex-start;
  position: relative;
  z-index: 99;
`

const DeFiMarket: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t('DEFI_17')}</title>
        <meta name="description" content={t('DEFI_18')} />
        <meta name={t('STAKE_86')} content={t('HOME_64')} />
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
            <Liquidity />
            <Liquidity />
          </DataWarp>
          <Title>{t('DEFI_4')}</Title>
          <Desc>{t('DEFI_5')}</Desc>
          <DataWarp>
            <Supply />
            <Supply />
            <Supply />
          </DataWarp>
        </Content>
      </Warp>
    </>
  )
}
export default DeFiMarket
