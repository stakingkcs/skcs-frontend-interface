import { mediaList } from 'components/AppFooter'
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { Title } from '../../../components/index'
import { useTranslation } from 'react-i18next'

const FollowWarp = styled.div`
  width: 444px;
  margin-left: 60px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 60px;
    margin: 0 0 100px 0;
  }
`
const TipWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 134px;
  @media (max-width: 768px) {
    height: auto;
  }
`
const Desc = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: rgba(180, 183, 193, 1);
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`
const IconWarp = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const ItemImg = styled.img`
  object-fit: cover;
  transition: all 0.3s ease-in;
`
const ItemLink = styled.a`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  text-align: center;
  line-height: 72px;
  transition: all 0.3s ease-in;
  background: rgba(255, 255, 255, 0.12);
  &:hover {
    transform: scale(1.1);
    background: linear-gradient(120.14deg, #00d092 -4.82%, #d04aff 113.33%);
  }
  @media (max-width: 768px) {
    width: 120px;
    height: 130px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
`
const ItemText = styled.p`
  font-family: 'Arial';
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
`

const FollowUs: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <FollowWarp>
      <Title style={{ fontSize: '32px', margin: '0 0 25px 0', textAlign: isMobile ? 'center' : 'left' }}>
        {t('HOME_39')}
      </Title>
      <TipWarp>
        <Desc>{t("HOME_40")}</Desc>
        <IconWarp>
          {mediaList.map((item) => {
            return (
              <ItemLink key={item.name} onClick={() => window.open(item.link, '_blank')}>
                <ItemImg src={item.icon} />
                <ItemText style={{ display: isMobile ? 'block' : 'none' }}>{item.name}</ItemText>
              </ItemLink>
            )
          })}
        </IconWarp>
      </TipWarp>
    </FollowWarp>
  )
}

export default FollowUs
