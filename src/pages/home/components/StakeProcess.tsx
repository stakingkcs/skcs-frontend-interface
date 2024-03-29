import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toggleConnectWalletModalShow } from '../../../state/wallet/actions'
import { useResponsive } from '../../../utils/responsive'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from 'state'
import { Navigation, Pagination } from 'swiper'
import 'swiper/components/pagination/pagination.less'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import './Swiper.css'

const baseStep = require('../../../assets/images/home/base-step.png').default
const baseHover = require('../../../assets/images/home/base-hover.png').default
const aLeft = require('../../../assets/images/home/arrow-left.png').default
const aRight = require('../../../assets/images/home/arrow-right.png').default

const Title = styled.h2`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 160px 0 75px 0;
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 70px;
    font-size: 28px;
    line-height: 32px;
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
  font-size: 20px;
  margin-top: -25px;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 8px 40px 8px;
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
const StakeDashed = styled.div`
  width: 120px;
  height: 1px;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  margin-top: 153px;
  opacity: 0.5;
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

const StakeProcess: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { isMobile } = useResponsive()

  const processList = [
    {
      icon: require('../../../assets/images/home/c-step1.png').default,
      title: t('HOME_32'),
      link: '',
    },
    {
      icon: require('../../../assets/images/home/c-step2.png').default,
      title: t('HOME_33'),
      link: '',
    },
    {
      icon: require('../../../assets/images/home/c-step3.png').default,
      title: t('HOME_35'),
      link: '',
    },
    {
      icon: require('../../../assets/images/home/c-step4.png').default,
      title: t('HOME_36'),
      link: '',
    },
  ]

  const handleClickStep = React.useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          if (account) return
          dispatch(toggleConnectWalletModalShow({ show: true }))
          break
        case 1:
        case 2:
          history.push('/staking')
          break
        case 3:
          history.push('/defi-market')
          break
      }
    },
    [account, dispatch, history]
  )

  if (isMobile) {
    SwiperCore.use([Pagination, Navigation])
    return (
      <>
        <Title>{t('HOME_37')}</Title>
        <StakeWarp>
          <Swiper
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'disable',
            }}
            pagination={{
              type: 'progressbar',
              clickable: false,
            }}
          >
            {processList.map((step, index) => {
              return (
                <SwiperSlide onClick={handleClickStep.bind(null, index)} key={step.title}>
                  <StakeItem>
                    <StakeIcon src={step.icon} />
                    <StakeBaseIcon />
                    <StakeTitle>{step.title}</StakeTitle>
                  </StakeItem>
                </SwiperSlide>
              )
            })}
            <div className="swiper-button-prev">
              <img style={{ width: '36px', height: '36px' }} src={aLeft} alt="" />
            </div>
            <div className="swiper-button-next">
              <img style={{ width: '36px', height: '36px' }} src={aRight} alt="" />
            </div>
          </Swiper>
        </StakeWarp>
      </>
    )
  }

  return (
    <>
      <Title>{t('HOME_37')}</Title>
      <StakeWarp>
        {processList.map((step, index) => {
          return (
            <>
              <StakeItem onClick={handleClickStep.bind(null, index)}>
                <StakeIcon src={step.icon} />
                <StakeBaseIcon />
                <StakeTitle>{step.title}</StakeTitle>
              </StakeItem>
              {index !== processList.length - 1 ? <StakeDashed /> : ''}
            </>
          )
        })}
      </StakeWarp>
    </>
  )
}

export default StakeProcess
