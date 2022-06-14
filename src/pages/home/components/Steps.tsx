import React from 'react'
import styled from 'styled-components'
import { RawBox, Image, RowCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from '../../../state/wallet/actions'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'

const StepsWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 140px 0 80px 0;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;

  max-width: 1200px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Title = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    max-width: 300px;
    font-size: 24px;
    text-align: center;
  }
`

const Divider = styled.div`
  width: 169px;
  height: 1px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
  margin-left: 40px;
  margin-right: 45px;
  @media (max-width: 768px) {
    height: 79px;
    width: 1px;
    margin: 32px auto;
  }
`

const StepTitle = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #00d092;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const StepDesc = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-top: 18px;
  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`

const steps = [
  {
    title: '1. Connect Wallet',
    desc: 'Buy KCS to join staking',
    icon: require('../../../assets/images/home/step1.png').default,
  },
  {
    title: '2. Staking to vote',
    desc: 'Vote for master node candidates by staking KCS, 1 KCS represents 1 vote. ',
    icon: require('../../../assets/images/home/step2.png').default,
  },
  {
    title: '3. Check the votes',
    desc: 'Check votes in "My Vote"',
    icon: require('../../../assets/images/home/step3.png').default,
  },
  {
    title: '4. Get rawards',
    desc: 'Claim rewards in "My Vote"',
    icon: require('../../../assets/images/home/step4.png').default,
  },
]

const Steps: React.FunctionComponent = () => {
  const { isMobile } = useResponsive()

  const { account } = useWeb3React()
  const dispatch = useDispatch()

  const history = useHistory()

  const connectWallet = () => {
    if (!account) {
      dispatch(toggleConnectWalletModalShow({ show: true }))
    }
  }

  const handleClickStep = (index: number) => {
    switch (index) {
      case 0:
        connectWallet()
        break
      case 1:
        history.push('/staking')
        break
      default:
        history.push('/my-vote')
    }
  }

  return (
    <StepsWrap>
      <Content>
        <Title>Staking, Vote and get rewards in 4 steps</Title>
        <RowCenterBox
          justify="center"
          style={{ width: '100%', marginTop: isMobile ? '73px' : '120px', flexFlow: isMobile ? 'column' : 'row' }}
        >
          {steps.map((step, index) => {
            return (
              <RawBox key={index} style={{ width: index === steps.length - 1 ? '170px' : 'auto' }}>
                <RowCenterBox style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  <Image src={step.icon} width="86px" height="114px" alt="step-cion" style={{ objectFit: 'contain' }} />
                  {!isMobile && index !== steps.length - 1 && <Divider />}
                </RowCenterBox>
                <RawBox style={{ marginTop: '28px', maxWidth: '280px', height: isMobile ? 'auto' : '100px' }}>
                  <StepTitle onClick={handleClickStep.bind(null, index)}>{step.title}</StepTitle>
                  <StepDesc>{step.desc}</StepDesc>
                </RawBox>
                {isMobile && index !== steps.length - 1 && <Divider />}
              </RawBox>
            )
          })}
        </RowCenterBox>
      </Content>
    </StepsWrap>
  )
}

export default Steps
