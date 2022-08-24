import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import { useHistory } from 'react-router'

const bg = require('../../assets/images/skcswin/big-banner-bg.png').default

const BigSKCSWinBannerWrap = styled.div`
  width: 100%;
  height: 102px;
  background: url(${bg}) center right no-repeat;
  cursor: pointer;
  border-radius: 16px;
  padding-top: 12px;
  box-sizing: border-box;
`

const SubTitle = styled.div`
  background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%);
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
  width: 301px;
  height: 30px;
  padding-left: 15px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`

const Title = styled.div`
  height: 35px;
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  padding-left: 15px;
  color: #ffffff;
  margin-top: 8px;
`

const Number = styled.div`
  display: inline-block;
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: italic;
  font-size: 24px;
  text-align: left;
  color: #23ffbd;
  padding: 0 10px;
`

const BigSKCSWinBanner: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const history = useHistory()
  return (
    <BigSKCSWinBannerWrap onClick={() => history.push('/skcs-win')}>
      <SubTitle>{t('Staking Competition is Underway')}</SubTitle>
      <Title>
        <Trans
          i18nKey="sKCSWin.BannerTitle"
          values={{
            prizePool: formatNumber(2000, 0),
          }}
          components={{ number: <Number /> }}
        />
      </Title>
    </BigSKCSWinBannerWrap>
  )
}

export default BigSKCSWinBanner
