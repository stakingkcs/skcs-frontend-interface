import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { width } from 'styled-system'

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 160px 0 60px;
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
  }
`

const StakeContent = styled.div`
  width: 1200px;
  height: 252px;
  display: flex;
  justify-content: space-between;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    // chrome safari
    display: none;
  }
`

const StakeItem = styled.div`
  width: 281px;
  height: 252px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 32px 24px;
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
const fitList = [
  {
    icon: require('../../../assets/images/home/staking-step1.png').default,
    title: 'Click Staking',
    desc: 'Choose any currency in the "Market" to supply and earn interest',
  },
  {
    icon: require('../../../assets/images/home/staking-step2.png').default,
    title: 'Get Rewards',
    desc: 'Choose any currency in the "Market" to supply and earn interest',
  },
  {
    icon: require('../../../assets/images/home/staking-step3.png').default,
    title: 'Leverage',
    desc: 'Choose any currency in the "Market" to supply and earn interest',
  },
  {
    icon: require('../../../assets/images/home/staking-step4.png').default,
    title: 'Security',
    desc: 'Choose any currency in the "Market" to supply and earn interest',
  },
]

const StakeBenefit: React.FunctionComponent = () => {
  return (
    <>
      <Title>Why staking with sKCS</Title>
      <StakeWarp>
        <StakeContent>
          {fitList.map((step) => {
            return (
              <StakeItem>
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
