import React, { Children } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { isMobile } from 'react-device-detect'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/swiper.min.css'

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
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto !important;
    font-size: 28px;
  }
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
    border: 1px dashed #ffffff;
    margin: 0 25px;
  }
  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 100px;
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

const StakeTitle = styled.p`
  font-family: Arial;
  color: #ffffff;
  font-weight: bold;
  font-size: 40px;
  margin-top: -25px;
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 0 8px;
  }
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
  &:hover ${StakeTitle} {
    color: #d04aff;
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
    link: '',
  },
  {
    icon: require('../../../assets/images/home/c-step2.png').default,
    title: '2. Stake KCS',
    link: '',
  },
  {
    icon: require('../../../assets/images/home/c-step3.png').default,
    title: '3. Get sKCS',
    link: '',
  },
  {
    icon: require('../../../assets/images/home/c-step4.png').default,
    title: '4.Use sKCS',
    link: '',
  },
]

const StakeProcess: React.FunctionComponent = () => {
  if (isMobile) {
    return (
      <>
        <Title>Start staking and grow your assets in only 4 steps</Title>
        <StakeWarp>
          <Swiper
            coverflowEffect={{
              rotate: 30,
              stretch: 10,
              depth: 60,
              modifier: 2,
              slideShadows: true,
            }}
            pagination={{
              type: 'progressbar',
            }}
          >
            {processList.map((step) => {
              return (
                <SwiperSlide key={step.title}>
                  <StakeItem>
                    <StakeIcon src={step.icon} />
                    <StakeBaseIcon />
                    <StakeTitle>{step.title}</StakeTitle>
                  </StakeItem>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </StakeWarp>
      </>
    )
  }

  return (
    <>
      <Title>Start staking and grow your assets in only 4 steps</Title>
      <StakeWarp>
        {processList.map((step) => {
          return (
            <StakeItem key={step.title}>
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
