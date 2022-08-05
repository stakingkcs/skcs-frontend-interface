import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useBalance } from '../../../state/wallet/hooks'
import { formatNumber } from '../../../utils/bignumber'
import BN from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useStakerContract } from '../../../hooks/useContract'
import { RowCenterBox } from '../../../components/index'

const walletFile = require('../../../assets/images/Icons/grandient-wallet.png').default
const exlink = require('../../../assets/images/home/ex_link.png').default

const BWarp = styled.div`
  width: 383px;
  height: 102px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 21px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    width: 343px;
    align-items: flex-start;
  }
`
const IconWarp = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
const Icon = styled.img`
  opacity: 1;
  width: 56px;
  height: 56px;
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`

const BanlanceWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    position: relative;
  }
`
const BanlanceText = styled.div`
  font-family: Arial;
  font-size: 16px;
  line-height: 24px;
  color: #b4b7c1;
  @media (max-width: 768px) {
    text-align: left;
  }
`

const BanlanceNum = styled.div`
  font-family: Arial;
  font-size: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-top: 0px;
  text-align: left;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`
const LinkWarp = styled.div`
  padding-top: 4px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 768px) {
    position: relative;
    padding-top: 0px;
    top: 0px;
  }
`
const LinkText = styled.p`
  font-family: Arial;
  font-size: 16px;
  color: #d04aff;
  margin-right: 8px;
  line-height: 18px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
const LinkIcon = styled.img`
  width: 16px;
  height: 16px;
`

const Banlance: React.FunctionComponent = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const history = useHistory()
  const staker = useStakerContract()

  const [skcsBalance, setSkcsBalance] = React.useState<string>('0')

  React.useEffect(() => {
    async function getsKCSBalance() {
      if (!account || !staker) {
        return '0'
      }
      const balance = await staker.functions.balanceOf(account)
      setSkcsBalance(() => balance?.toString())
    }

    getsKCSBalance()
  }, [account, staker])

  return (
    <>
      <BWarp>
        <IconWarp>
          <Icon src={walletFile} />
        </IconWarp>
        <BanlanceWarp>
          <BanlanceText>{t('STAKE_49')}</BanlanceText>
          <BanlanceNum>{formatNumber(new BN(skcsBalance).div(10 ** 18), 2)} sKCS</BanlanceNum>
        </BanlanceWarp>
        <LinkWarp>
          <LinkText onClick={() => history.push('/staking')}>{t('STAKE_50')}</LinkText>
          <LinkIcon src={exlink} />
        </LinkWarp>
      </BWarp>
    </>
  )
}
export default Banlance
