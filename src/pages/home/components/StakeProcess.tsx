import React from 'react'
import styled from 'styled-components'

const baseStep = require('../../../assets/images/home/base-step.png').default
const baseHover = require('../../../assets/images/home/base-hover.png').default
const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 160px 0 75px 0;
  /* @media (max-width: 768px) {
    font-size: 26px;
    margin: 0 8px;
  } */
`
const StakeWarp = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  &:after {
    width: 120px;
    height: 10px;
    background: red;
    border: 1px dashed #FFFFFF;
    margin: 0 25px;
  }
`

const StakeIcon = styled.img`
  width: 100px;
  height: 100px;
  scale: 0.9;
  object-fit: cover;
  margin-bottom: -75px;
  transform: scale(0.9);
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1);
  }
`
const StakeBaseIcon = styled.div`
  width: 200px;
  height: 200px;
  background: url(${baseStep}) no-repeat center;
  transition: all 0.3s ease-in;
  /* &:hover {
    background-image: url(${baseHover});
    background-repeat: no-repeat;
  } */
`
const StakeItem = styled.a`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  &:hover ${StakeIcon} {
      transform: translateY(-20px);
  }
  &:hover ${StakeBaseIcon} {
    background: url(${baseHover}) no-repeat center;
  }
`

const StakeTitle = styled.p`
  font-family: Arial;
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
  margin-top: -25px;
`
const StakeDesc = styled.p`
  color: rgba(127, 131, 147, 1);
  font-size: 14px;
  font-family: Arial;
  line-height: 24px;
  margin-bottom: 0;
`

const processList = [
  {
    icon: require('../../../assets/images/home/c-step1.png').default,
    title: '1. Connect Wallet',
    link: ""
  },
  {
    icon: require('../../../assets/images/home/c-step2.png').default,
    title: '2. Stake KCS',
    link: ""
  },
  {
    icon: require('../../../assets/images/home/c-step3.png').default,
    title: '3. Get sKCS',
    link: ""
  },
  {
    icon: require('../../../assets/images/home/c-step4.png').default,
    title: '4.Use sKCS',
    link: ""
  },
]

const StakeProcess: React.FunctionComponent = () => {
  return (
    <>
      <Title>Start staking and grow your assets in only 4 steps</Title>
      <StakeWarp>
        {processList.map((step) => {
          return (
            <StakeItem>
              <StakeIcon src={step.icon} />
              <StakeBaseIcon />
              <StakeTitle>{step.title}</StakeTitle>
            </StakeItem>
          )
        })}
      </StakeWarp>
    </>
  )
}

export default StakeProcess
