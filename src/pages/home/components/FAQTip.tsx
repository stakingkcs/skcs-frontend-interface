import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { Title, Text } from '../../../components/index'
import { useTranslation } from 'react-i18next'
const arrow = require('../../../assets/images/home/arrow.png').default
const FAQWarp = styled.div`
  width: 507px;

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 327px;
    height: 204px;
    margin-bottom: 99px;
  }
`

const TipWarp = styled.div`
  position: relative;
  width: 507px;
  height: 134px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  font-family: Arial;
  @media (max-width: 768px) {
    width: 327px;
    height: 204px;
  }
`
const IconArrow = styled.img`
  position: absolute;
  right: 28px;
  object-fit: cover;
  top: 45%;
  @media (max-width: 768px) {
    top: 33%;
  }
`
const QuesTitle = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0;
`
const Desc = styled(Text)`
  font-size: 16px;
  font-weight: normal;
  color: rgba(180, 183, 193, 1);
`

interface Props {
  title: string
  desc?: string
}

const FAQTip: FunctionComponent<Props> = ({ title, desc }) => {
  return (
    <FAQWarp>
      <Title style={{ fontSize: '32px', margin: '0 0 25px 0', textAlign: isMobile ? 'center' : 'left' }}>FAQ</Title>
      <TipWarp>
        <QuesTitle>{title} </QuesTitle>
        <Desc>{desc}</Desc>
        <IconArrow src={arrow} />
      </TipWarp>
    </FAQWarp>
  )
}

export default FAQTip
