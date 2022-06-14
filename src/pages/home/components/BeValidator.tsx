import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { RawBox, Image, RowCenterBox, ColumnCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'

const StepsWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 80px 0 80px 0;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
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

const CardTitle = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
`

const LinkText = styled(RowCenterBox)`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #29cd97;
  margin-top: 6px;
  opacity: 0;
`

const Card = styled(ColumnCenterBox)`
  width: 248px;
  height: 297px;
  cursor: pointer;
  box-sizing: border-box;
  & + & {
    margin-left: 140px;
  }
  &:hover {
    background: linear-gradient(180deg, rgba(38, 187, 154, 0.04) 23.31%, #27be9a 139.2%);
    border-radius: 12px;
    ${LinkText} {
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    & + & {
      margin-left: 0px;
    }
  }
`

const stepList = [
  {
    title: 'Audit for registration',
    url: '',
    icon: require('../../../assets/images/home/v-step1.png').default,
  },
  {
    title: 'Candidate registration',
    url: '',
    icon: require('../../../assets/images/home/v-step2.png').default,
  },
  {
    title: 'Voting as a validator',
    url: 'Buy KCS to join staking',
    icon: require('../../../assets/images/home/v-step3.png').default,
  },
]

const BeValidator: React.FunctionComponent = () => {
  const { isMobile } = useResponsive()
  const history = useHistory()

  const handleClickCard = (index: number) => {
    switch (index) {
      case 2:
        history.push('/staking')
    }
  }

  return (
    <StepsWrap>
      <Content>
        <Title>To be a validator</Title>
        <RowCenterBox
          justify="center"
          style={{ width: '100%', marginTop: isMobile ? '32px' : '64px', flexFlow: isMobile ? 'column' : 'row' }}
        >
          {stepList.map((step, index) => {
            return (
              <Card key={index} onClick={handleClickCard.bind(null, index)}>
                <Image width="188px" height="140px" style={{ marginTop: '65px' }} src={step.icon} />
                <CardTitle>{step.title}</CardTitle>
                <LinkText justify="center">
                  <span style={{ marginRight: '8px' }}>Learn More</span>
                  <Image
                    src={require('../../../assets/images/home/green-arrow-rigth.png').default}
                    width="16px"
                    height="16px"
                    alt="learn-more-icon"
                  />
                </LinkText>
              </Card>
            )
          })}
        </RowCenterBox>
      </Content>
    </StepsWrap>
  )
}

export default BeValidator
