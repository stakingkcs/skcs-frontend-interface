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
import { useResponsive } from 'utils/responsive'

export interface AppFooterProps {}

const IconWarp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const ItemImg = styled.img`
  width: 20px;
  height: auto;
  transition: all 0.3s ease-in;
`
const ItemLink = styled.a`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  transition: all 0.3s ease-in;
  background: rgba(255, 255, 255, 0.12);
  &:hover {
    background: linear-gradient(120.14deg, #00d092 -4.82%, #d04aff 113.33%);
  }
  & + & {
    margin-left: 32px;
  }
`

const AppFooterWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    height: auto;
  }
`
const AppFooterContentWrap = styled.div`
  width: 100%;
  height: 100px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 42px;
  }
`

const CopyRightText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #b4b7c1;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 12px;
    margin-bottom: 28px;
  }
`

export const mediaList = [
  {
    icon: require('../../assets/images/home/f1.png').default,
    name: 'Twitter',
    link: 'https://twitter.com/sKCS_io',
  },
  {
    icon: require('../../assets/images/home/f2.png').default,
    name: 'Discord',
    link: 'https://discord.gg/5pRc7U78Xd',
  },
  {
    icon: require('../../assets/images/home/f4.png').default,
    name: 'Medium',
    link: 'https://medium.com/@sKCS.io',
  },
  {
    icon: require('../../assets/images/home/f3.png').default,
    name: 'Telegram',
    link: 'https://t.me/sKCSio',
  },
]

const AppFooter: React.FunctionComponent<AppFooterProps> = () => {
  const { t, i18n } = useTranslation()
  const { isMobile } = useResponsive()
  return (
    <AppFooterWrap>
      <AppFooterContentWrap>
        <CopyRightText>{t("COMPONENT_1", {asset: new Date().getFullYear()})}</CopyRightText>
        <IconWarp>
          {mediaList.map((item) => {
            return (
              <ItemLink
                key={item.name}
                onClick={() => {
                  window.open(item.link, '_blank')
                }}
              >
                <ItemImg src={item.icon} />
              </ItemLink>
            )
          })}
        </IconWarp>
      </AppFooterContentWrap>
    </AppFooterWrap>
  )
}

export default AppFooter
