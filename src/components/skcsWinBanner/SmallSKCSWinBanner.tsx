import React from 'react'
import { Trans } from 'react-i18next'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'

const bg = require('../../assets/images/skcswin/small-banner-bg.png').default

const BigSKCSWinBannerWrap = styled.div`
  width: 100%;
  height: 60px;
  background: url(${bg}) center right no-repeat, #080d27;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 25px;
`

const Title = styled.div`
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
  padding-left: 15px;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Number = styled.div`
  display: inline-block;
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: italic;
  font-size: 18px;
  text-align: left;
  color: #5bffff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const SmallSKCSWinBanner: React.FunctionComponent = () => {
  const history = useHistory()
  return (
    <BigSKCSWinBannerWrap onClick={() => history.push('/skcs-win')}>
      <Title>
        <Trans
          i18nKey="sKCSWin.BannerTitle"
          values={{
            prizePool: formatNumber(5000, 0),
          }}
          components={{ number: <Number /> }}
        />
      </Title>
    </BigSKCSWinBannerWrap>
  )
}

export default SmallSKCSWinBanner
