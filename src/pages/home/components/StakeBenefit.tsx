import { FlexBox, Image } from 'components'
import { RowBetween } from 'components/Row'
import GradienButton from 'components/GradientButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStakerState } from 'state/hooks'
import { formatNumber } from 'utils/bignumber'
import { useResponsive } from '../../../utils/responsive'

const Title = styled.h1`
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
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 32px;
    justify-content: flex-start;
    overflow-x: scroll;
    margin-bottom: 100px;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const StakeContent = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const StakeContent1 = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StakeItem = styled.div`
  width: 281px;
  height: auto;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  padding: 25px 25px;
  padding-right: 10px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    border-radius: 16px;
  }
`

const CopyStakeItem = styled(StakeItem)`
  background: none;
  width: 522px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`
const UpIcon = styled.img`
  width: 16px;
  height: 16px;
`

const StakeIcon = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
`
const StakeTitle = styled.div`
  font-family: Arial;
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  margin: 12px 0px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const StakeDesc = styled.p`
  color: rgba(127, 131, 147, 1);
  font-size: 14px;
  font-family: Arial;
  line-height: 24px;
  margin-bottom: 0;
`

const TableWrap = styled.div`
  box-sizing: border-box;
  width: 563px;
  height: 248px;
  background: linear-gradient(131.22deg, rgba(0, 208, 146, 1) 1.46%, rgba(208, 74, 255, 1) 99.85%);
  border-radius: 12px;
  padding: 2px;
  margin-right: 24px;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
  }
`

const Table = styled.div`
  background: #000;
  border-radius: 12px;
`

const NameColumn = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  color: #fff;
  background: #1c2124;
  height: 100%;
  flex: 1;
  @media (max-width: 768px) {
    width: 33%;
    font-size: 12px;
    padding-left: 10px;
  }
`

const SKCSColumn = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 33%;
  background: #183d39;
  height: 100%;
`

const TableRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 49px;
  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  &:first-child ${NameColumn} {
    border-top-left-radius: 14px;
    overflow: hidden;
  }

  &:last-child ${NameColumn} {
    border-bottom-left-radius: 14px;
    overflow: hidden;
  }

  &:first-child ${SKCSColumn} {
    border-top-right-radius: 14px;
    overflow: hidden;
  }
  &:last-child ${SKCSColumn} {
    border-bottom-right-radius: 14px;
    overflow: hidden;
  }
`

const KCSColumn = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 33%;
  background: #1c2124;
  height: 100%;
`

const SuppportedIcon = styled.img`
  width: 16px;
  height: auto;
`

const UnSuppportedIcon = styled.img`
  width: 13px;
  height: auto;
`

const Td = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 7px;
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`

const InnerWrap = styled(RowBetween)`
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 24px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: center;
  }
`

const StatusIcon: React.FC<{ supported: boolean }> = ({ supported }) => {
  if (supported) {
    return <SuppportedIcon src={require('../../../assets/images/home/yes.svg').default} alt="supported-icon" />
  }
  return <UnSuppportedIcon src={require('../../../assets/images/home/no.svg').default} alt="unsupported-icon" />
}

const StakeBenefit: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const staker = useStakerState()
  const { isMobile } = useResponsive()

  const show = React.useMemo(() => {
    if (!staker.apr || !staker.kcsBonusApy) {
      return false
    }
    if (staker.kcsBonusApy >= staker.apr) {
      return false
    }
    return true
  }, [staker])

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
        {show && (
          <StakeContent1 style={{ padding: isMobile ? '0px 0 24px 0' : '0' }}>
            <InnerWrap>
              <CopyStakeItem>
                <StakeIcon
                  src={require('../../../assets/images/home/compare-icon.png').default}
                  width="72px"
                  height="72px"
                  alt="compare-icon"
                />
                <StakeTitle>Maximize the benefits for KCS holders</StakeTitle>
                <StakeDesc style={{ maxWidth: '522px' }}>
                  For KCS holders, sKCS.io not only has higher earnings compared to KCS Bonus, obviously, but also
                  sKCS.io has more advantages.
                </StakeDesc>
                <FlexBox style={{ marginTop: '20px' }} />
                <GradienButton />
                <FlexBox style={{ marginBottom: '26px' }} />
              </CopyStakeItem>

              <TableWrap>
                <Table>
                  {/* table header */}
                  <TableRow>
                    <NameColumn />
                    <KCSColumn>
                      <TokenIcon src="/logo/kcs.png" alt="kcs-log" />
                      <Td>KCS Bonus</Td>
                    </KCSColumn>
                    <SKCSColumn>
                      <TokenIcon src="/logo/skcs.png" alt="kcs-log" />
                      <Td>sKCS</Td>
                    </SKCSColumn>
                  </TableRow>

                  <TableRow>
                    <NameColumn>{t('Annualized Yield')}</NameColumn>
                    <KCSColumn>
                      <Td>{`${formatNumber(staker.kcsBonusApy * 100, 2)}%`}</Td>
                    </KCSColumn>
                    <SKCSColumn>
                      <Td style={{ color: '#00D092' }}>{`${formatNumber(staker.apr * 100, 2)}%`}</Td>
                      <UpIcon src={require('../../../assets/images/home/up.svg').default} alt="up-icon" />
                    </SKCSColumn>
                  </TableRow>

                  <TableRow>
                    <NameColumn>{t('Liquid staking token')}</NameColumn>
                    <KCSColumn>
                      <StatusIcon supported={false} />
                    </KCSColumn>
                    <SKCSColumn>
                      <StatusIcon supported={true} />
                    </SKCSColumn>
                  </TableRow>

                  <TableRow>
                    <NameColumn>{t('Decentralization')}</NameColumn>
                    <KCSColumn>
                      <StatusIcon supported={false} />
                    </KCSColumn>
                    <SKCSColumn>
                      <StatusIcon supported={true} />
                    </SKCSColumn>
                  </TableRow>

                  <TableRow>
                    <NameColumn>{t('Minimum required')}</NameColumn>
                    <KCSColumn>
                      <Td>6</Td>
                    </KCSColumn>
                    <SKCSColumn>
                      <Td>0</Td>
                    </SKCSColumn>
                  </TableRow>
                </Table>
              </TableWrap>
            </InnerWrap>
          </StakeContent1>
        )}
      </StakeWarp>
    </>
  )
}

export default StakeBenefit
