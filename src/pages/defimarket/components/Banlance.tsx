import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useBalance } from '../../../state/wallet/hooks'
import { formatNumber } from '../../../utils/bignumber'
import BN from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useStakerContract } from '../../../hooks/useContract'

const walletFile = require('../../../assets/images/home/walletfile.png').default
const exlink = require('../../../assets/images/home/ex_link.png').default

const BWarp = styled.div`
  width: 383px;
  height: 102px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 21px 24px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 343px;
    padding: 21px 16px;
  }
`
const IconWarp = styled.div`
  background: linear-gradient(120.14deg, #0dc898 -4.82%, #b65cf2 113.33%);
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
const Icon = styled.img`
  object-fit: contain;
`

const BanlanceWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const BanlanceText = styled.p`
  font-family: Arial;
  font-size: 16px;
  line-height: 24px;
  color: #b4b7c1;
  @media (max-width: 768px) {
    text-align: left;
  }
`

const BanlanceNum = styled.p`
  font-family: Arial;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  font-weight: bold;
`
const LinkWarp = styled.div`
  display: flex;
`
const LinkText = styled.p`
  font-family: Arial;
  font-size: 16px;
  color: #d04aff;
  margin-right: 8px;
  line-height: 18px;
  cursor: pointer;
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
