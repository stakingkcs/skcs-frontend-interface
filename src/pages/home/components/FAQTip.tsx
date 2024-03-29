import { sKCS } from 'constants/index'
import { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, Title } from '../../../components/index'

const arrow = require('../../../assets/images/home/arrow.png').default
const FAQWarp = styled.div`
  width: 507px;
  cursor: pointer;

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
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  font-family: Arial;
  padding: 0 32px;
  @media (max-width: 768px) {
    width: 100%;
    height: 204px;
    padding: 0 32px 0 16px;
  }
`
const IconArrow = styled.img`
  position: absolute;
  right: 28px;
  object-fit: cover;
  top: 45%;
  @media (max-width: 768px) {
    top: 45%;
  }
`
const QuesTitle = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 18px;
  }
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
  const { t } = useTranslation()

  return (
    <FAQWarp onClick={() => window.open(sKCS.faq, '_blank')}>
      <Title style={{ fontSize: '32px', margin: '0 0 25px 0', textAlign: isMobile ? 'center' : 'left' }}>
        {t('HOME_52')}
      </Title>
      <TipWarp>
        <QuesTitle>{title} </QuesTitle>
        <Desc>{desc}</Desc>
        <IconArrow src={arrow} />
      </TipWarp>
    </FAQWarp>
  )
}

export default FAQTip
