import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { width } from 'styled-system'

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 120px 0 64px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`
const StakeWarp = styled.div`
  width: 1200px;
  margin: 0 auto;
  height: 252px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 32px;
    justify-content: flex-start;
    overflow-x: scroll;
    margin-bottom: 100px;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      // chrome safari
      display: none;
    }
  }
`

const StakeContent = styled.div`
  width: 1200px;
  height: 252px;
  display: flex;
  justify-content: space-between;
`

const StakeItem = styled.div`
  width: 281px;
  height: 252px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px 24px;
`
const StakeIcon = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
`
const StakeTitle = styled.p`
  font-family: Arial;
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 0;
`
const StakeDesc = styled.p`
  color: rgba(127, 131, 147, 1);
  font-size: 14px;
  font-family: Arial;
  line-height: 24px;
  margin-bottom: 0;
`

const StakeBenefit: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const fitList = [
    {
      icon: require('../../../assets/images/home/staking-step1.png').default,
      title: t('HOME_23'),
      desc: t('HOME_24'),
    },
    {
      icon: require('../../../assets/images/home/staking-step2.png').default,
      title: t('HOME_25'),
      desc: t('HOME_26'),
    },
    {
      icon: require('../../../assets/images/home/staking-step3.png').default,
      title: t('HOME_27'),
      desc: t('HOME_28'),
    },
    {
      icon: require('../../../assets/images/home/staking-step4.png').default,
      title: t('HOME_29'),
      desc: t('HOME_30'),
    },
  ]
  return (
    <>
      <Title>{t('HOME_31')}</Title>
      <StakeWarp>
        <StakeContent>
          {fitList.map((step) => {
            return (
              <StakeItem key={step.title}>
                <StakeIcon src={step.icon} />
                <StakeTitle>{step.title}</StakeTitle>
                <StakeDesc>{step.desc}</StakeDesc>
              </StakeItem>
            )
          })}
        </StakeContent>
      </StakeWarp>
    </>
  )
}

export default StakeBenefit
