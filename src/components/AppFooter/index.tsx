import React from 'react'
import styled from 'styled-components'
import Row from '../Row'
import Column from '../Column/index'
import { useTranslation } from 'react-i18next'
import { RowBetween, CenterRow } from '../Row/index'
import { FOOTER_LIST } from '../../constants/footerList'
import { useHistory } from 'react-router'
import { BrowserView, MobileView } from '../Common'
import { KCC } from '../../constants'
import { Image } from 'components'
import { RowCenterBox } from '../index'

export interface AppFooterProps {}

const KccLogo = styled(Image)`
  width: 94px;
  height: 32px;
  cursor: pointer;
`

const AppFooterWrap = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
  background: #1d1d1d;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    text-align: center;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    height: auto;
  }
`
const AppFooterContentWrap = styled.div`
  width: 100%;
  height: 100px;
  max-width: 1200px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0px;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    width: 100%;
    padding: 24px 24px 0px 24px;
  }
`

const CopyRightText = styled.div`
  width: 100%;
  opacity: 0.6;
  font-size: 14px;
  color: #ffffff;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 12px;
  }
`

const AppFooter: React.FunctionComponent<AppFooterProps> = () => {
  const { t, i18n } = useTranslation()
  return (
    <AppFooterWrap>
      <AppFooterContentWrap>
        <RowCenterBox>
          <KccLogo
            src={require('../../assets/images/kcc-logo.svg').default}
            alt="kcc-logo"
            onClick={() => window.open('https://kcc.io', '_blank')}
          />
          <CopyRightText>CopyRight © {`${new Date().getFullYear()}`} staking.kcc.io All Rights Reserved.</CopyRightText>
        </RowCenterBox>
      </AppFooterContentWrap>
    </AppFooterWrap>
  )
}

export default AppFooter
