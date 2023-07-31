import { Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Image } from 'components'
import { useStakerState } from '../../../state/hooks'
import { formatNumber } from '../../../utils/bignumber'
import { useResponsive } from '../../../utils/responsive'

const CompareWrap = styled.div<{ show: boolean }>`
  display: ${({ show }) => {
    if (show) {
      return 'flex'
    }
    return 'none'
  }};
  width: 440px;
  height: auto;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  right: 20px;
  bottom: 0px;
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0px;
    left: 0px;
  }
`

const KCSBonusWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 147px;
  @media (max-width: 768px) {
    width: 33%;
  }
`

const KCSBonusBg = styled.div`
  padding: 10px 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #00d092 -72.33%, rgba(0, 208, 146, 0) 100%);
  height: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const SKCSBg = styled(KCSBonusBg)`
  padding: 34px 40px;
  justify-content: flex-start;
  background: linear-gradient(180deg, #d04aff 0%, rgba(208, 74, 255, 0) 100%);
  height: 345px;
  @media (max-width: 768px) {
    padding: 24px 12px;
    height: 245px;
  }
`

const SkcsWrap = styled(KCSBonusWrap)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
const KCSNumber = styled.div`
  font-style: italic;
  font-weight: 700;
  font-size: 54px;
  display: flex;
  align-items: center;
  color: #00d092;
  font-family: Arial;
  @media (max-width: 768px) {
    font-size: 34px;
  }
`
const SKCSNumber = styled.div`
  font-style: italic;
  font-weight: 900;
  font-size: 54px;
  display: flex;
  align-items: center;
  color: #d04aff;
  font-family: Arial;
  @media (max-width: 768px) {
    font-size: 34px;
  }
`

const Text = styled.div`
  font-style: italic;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Number = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  position: absolute;
  top: 43px;
  left: 38px;
  @media (max-width: 768px) {
    top: 32px;
    left: 30px;
    font-size: 16px;
  }
`

const ApyCompare: React.FunctionComponent = () => {
  const [isHover, setIsHover] = React.useState<boolean>(false)
  const { isMobile } = useResponsive()
  const { t } = useTranslation()
  const staker = useStakerState()

  const show = React.useMemo(() => {
    if (!staker.apr || !staker.kcsBonusApy) {
      return false
    }
    if (staker.kcsBonusApy >= staker.apr) {
      return false
    }
    return true
  }, [staker])

  const multiple = React.useMemo(() => {
    if (!show) {
      return 0
    }
    return staker.apr / 0.01
  }, [show, staker])

  return (
    <CompareWrap show={show}>
      <KCSBonusWrap>
        <KCSNumber>1%</KCSNumber>
        <KCSBonusBg>
          <Text>KCS Bonus APY</Text>
          <Tooltip placement="top" title={t('KCSBonusAPY')} style={{ marginTop: '10px' }}>
            <InfoCircleOutlined
              onMouseEnter={() => setIsHover(() => true)}
              onMouseLeave={() => setIsHover(() => false)}
              style={{ color: isHover ? '#00CA87' : '#fff', fontSize: isMobile ? '14px' : '18px' }}
            />
          </Tooltip>
        </KCSBonusBg>
      </KCSBonusWrap>
      <SkcsWrap style={{ alignSelf: 'flex-start', marginTop: '100px', position: 'relative' }}>
        <Number>{formatNumber(multiple, 1)}x</Number>
        <Image
          src={require('../../../assets/images/home/compare.png').default}
          width={isMobile ? '80px' : '116px'}
          height={isMobile ? 'auto' : '123px'}
          alt="compare"
        />
        <Image
          style={{ marginTop: isMobile ? '15px' : '30px' }}
          src={require('../../../assets/images/home/vs.png').default}
          width={isMobile ? '60px' : '80px'}
          height="auto"
          alt="vs"
        />
      </SkcsWrap>
      <SkcsWrap>
        <SKCSNumber>{formatNumber(staker.apr * 100, 2)}%</SKCSNumber>
        <SKCSBg>
          <Text>sKCS APY</Text>
        </SKCSBg>
      </SkcsWrap>
    </CompareWrap>
  )
}

export default ApyCompare
