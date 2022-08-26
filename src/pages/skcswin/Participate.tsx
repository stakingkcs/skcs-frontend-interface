import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import SKCSWinTitle from './components/SKCSTitle'
import { Image, RawBox } from 'components'
import { RowCenterBox } from '../../components/index'
import GradienButton from 'components/StyledButton/GradientButton'
import StyledButton from 'components/StyledButton'
import { useWeb3React } from '@web3-react/core'
import { toggleConnectWalletModalShow } from '../../state/wallet/actions'
import { useAppDispatch } from '../../state/index'
import { ActivityType } from './index'
import { GradientText } from '../../components/Text/index'
import { useHistory } from 'react-router-dom'
import { useBalance } from 'state/wallet/hooks'
import { useStakerState } from '../../state/hooks'
import BN from 'bignumber.js'
import { formatNumber } from '../../utils/bignumber'

const ParticipateWrap = styled.div`
  position: relative;
  width: 584px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const DecorateImage = styled.div`
  position: absolute;
  top: 17px;
  right: 5px;
`

const row1Bg = require('../../assets/images/skcswin/row-one-bg.png').default

const Content = styled.div`
  box-sizing: border-box;
  width: 584px;
  height: 440px;
  background: url(${row1Bg}) top center no-repeat;
  background-size: 100% 100%;
  border-radius: 12px;
  margin-top: 27px;
  padding: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const circleBg = require('../../assets/images/skcswin/circle-bg.png').default

const LeftWrap = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RightWrap = styled.div`
  margin-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const BalanceText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #d04aff;
  margin-left: 20px;
`

const Box = styled.div``

const NumberText = styled.div`
  font-family: 'Hiragino Kaku Gothic StdN';
  height: 48px;
  width: 48px;
  font-style: normal;
  font-weight: 800;
  color: #fff;
  background: url(${circleBg}) top center no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const SubText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #efeff2;
`

const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  bottom: -20px;
`

const RegisteredButton = styled.div`
  width: 154px;
  height: 40px;
  background: linear-gradient(90.14deg, rgba(0, 208, 146, 0.3) -4.82%, rgba(208, 74, 255, 0.3) 113.33%);
  border-radius: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`

const Participate: React.FunctionComponent<{ userActivityData: ActivityType; registerByAccount: any }> = ({
  userActivityData,
  registerByAccount,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const history = useHistory()

  const kcsBalance = useBalance()
  const skcsBalance = useStakerState().userData?.stakeAmount
  const [loading, setLoading] = React.useState<boolean>(false)

  const register = async () => {
    setLoading(() => true)
    try {
      await registerByAccount()
    } finally {
      setLoading(() => false)
    }
  }

  return (
    <ParticipateWrap>
      <DecorateImage>
        <Image
          src={require('../../assets/images/skcswin/decorate-1.png').default}
          width="107px"
          height="107px"
          alt="decorate-img"
        />
      </DecorateImage>
      <SKCSWinTitle title={t('sKCSWin.ParticipateTitle')} />
      <Content>
        <Box>
          <RowCenterBox>
            <LeftWrap>
              <NumberText>1</NumberText>
            </LeftWrap>
            <RightWrap>
              <SubText>{t('sKCSWin.Step1.Desc')}</SubText>
            </RightWrap>
          </RowCenterBox>
          <RowCenterBox>
            <LeftWrap>
              <ArrowIcon>
                <Image
                  src={require('../../assets/images/skcswin/arrow-down.png').default}
                  width="24px"
                  height="24px"
                  alt="arrow-down"
                />
              </ArrowIcon>
            </LeftWrap>
            <RightWrap>
              {!account && (
                <StyledButton
                  onClick={() => dispatch(toggleConnectWalletModalShow({ show: true }))}
                  style={{ width: '160px', height: '40px', fontSize: '14px' }}
                >
                  {t('HOME_21')}
                </StyledButton>
              )}

              {account && !userActivityData.registered && (
                <StyledButton
                  loading={loading}
                  onClick={register}
                  style={{ width: '160px', height: '40px', fontSize: '14px' }}
                >
                  {t('Register')}
                </StyledButton>
              )}

              {account && userActivityData.registered && (
                <RegisteredButton
                  style={{
                    width: 'auto',
                    height: '40px',
                    fontSize: '14px',
                    padding: '0 20px',
                  }}
                >
                  <Image
                    src={require('../../assets/images/skcswin/success.png').default}
                    width="16px"
                    height="16px"
                    alt="success-logo"
                  />
                  <GradientText style={{ marginLeft: '4px' }}>{t('Registered')}</GradientText>
                </RegisteredButton>
              )}
            </RightWrap>
          </RowCenterBox>
        </Box>

        <Box style={{ marginTop: '34px' }}>
          <RowCenterBox>
            <LeftWrap>
              <NumberText>2</NumberText>
            </LeftWrap>
            <RightWrap>
              <SubText>{t('sKCSWin.Step2.Desc')}</SubText>
            </RightWrap>
          </RowCenterBox>
          <RowCenterBox>
            <LeftWrap>
              <ArrowIcon>
                <Image
                  src={require('../../assets/images/skcswin/arrow-down.png').default}
                  width="24px"
                  height="24px"
                  alt="arrow-down"
                />
              </ArrowIcon>
            </LeftWrap>
            <RightWrap style={{ marginTop: '10px' }}>
              {!account && (
                <StyledButton
                  onClick={() => dispatch(toggleConnectWalletModalShow({ show: true }))}
                  style={{ width: '160px', height: '40px', fontSize: '14px' }}
                >
                  {t('HOME_21')}
                </StyledButton>
              )}
              {account && (
                <StyledButton
                  onClick={() => history.push('/staking')}
                  style={{ width: '160px', height: '40px', fontSize: '14px' }}
                >
                  {t('HOME_22')}
                </StyledButton>
              )}
              {account && (
                <BalanceText>
                  {t('KCS Balance')}: {formatNumber(new BN(kcsBalance).div(10 ** 18), 2)}
                </BalanceText>
              )}
            </RightWrap>
          </RowCenterBox>
        </Box>

        <Box style={{ marginTop: '24px' }}>
          <RowCenterBox>
            <LeftWrap>
              <NumberText>3</NumberText>
            </LeftWrap>
            <RightWrap>
              <SubText>{t('sKCSWin.Step3.Desc')}</SubText>
            </RightWrap>
          </RowCenterBox>
          <RowCenterBox style={{ marginTop: '10px' }}>
            <LeftWrap></LeftWrap>
            <RightWrap>
              {!account && (
                <StyledButton
                  onClick={() => dispatch(toggleConnectWalletModalShow({ show: true }))}
                  style={{ width: '160px', height: '40px', fontSize: '14px' }}
                >
                  {t('HOME_21')}
                </StyledButton>
              )}

              {account && (
                <StyledButton
                  onClick={() => history.push('/defi-market')}
                  style={{ width: 'auto', height: '40px', fontSize: '14px', padding: '0 20px' }}
                >
                  {t('Use sKCS in DeFi')}
                </StyledButton>
              )}
              {account && (
                <BalanceText>
                  {t('sKCS Balance')}: {formatNumber(new BN(skcsBalance.toString()).div(10 ** 18), 2)}
                </BalanceText>
              )}
            </RightWrap>
          </RowCenterBox>
        </Box>
      </Content>
    </ParticipateWrap>
  )
}

export default Participate
