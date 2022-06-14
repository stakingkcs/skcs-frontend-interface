import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { usePools } from '../../../state/hooks'
import { ValidatorStatus } from '../../../constants/types'
import Text from 'components/Text'
import { BigNumber, formatEther } from 'ethers/utils'
import { useBalance } from '../../../state/wallet/hooks'
import BN from 'bignumber.js'
import CountUp from 'react-countup'

const DashboardWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 12px;
  padding: 38px 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 44px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 32px;
    padding: 36px 24px;
  }
`
const DataItem = styled.div`
  flex: 1;
  height: 100%;
  & + & {
    border-left: 1px solid #dbdbe6;
    padding-left: 30px;
  }
  @media (max-width: 768px) {
    width: 100%;
    & + & {
      border-left: none;
      padding-left: 0;
    }
  }
`

const DataTitle = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #494e67;
  @media (max-width: 768px) {
    margin: 30px 0 12px 0;
  }
`
const DataRow = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #494e67;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`

const BuyButton = styled.a`
  background: #00d092;
  border-radius: 20px;
  width: 95px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  &:hover {
    color: #ffffff;
  }
`

const Dashboard: FunctionComponent = () => {
  
  const validators = usePools()

  const activeValidators = React.useMemo(() => {
    return validators.filter((validator) => validator.status === ValidatorStatus.Active)
  }, [validators])

  const allValidatorVotes = React.useMemo(() => {
    return validators.reduce((prev, current, index) => {
      return prev.add(current.votes ?? 0)
    }, new BigNumber(0))
  }, [validators])

  const balance = useBalance()

  return (
    <DashboardWrap>
      <DataItem>
        <DataTitle style={{ marginTop: '0' }}>Validators</DataTitle>
        <DataRow style={{ justifyContent: 'flex-start' }}>
          <Text color="#040A2D" fontSize="28px" fontWeight={500} fontFamily="Barlow">
            {activeValidators && validators ? `${activeValidators.length}/${validators.length}` : `-`}
          </Text>
          <Text color="#7F8393" fontSize="14px" marginLeft="12px" marginTop="6px">
            (Active / All)
          </Text>
        </DataRow>
      </DataItem>
      <DataItem>
        <DataTitle>Total votes (KCS)</DataTitle>
        <DataRow>
          <Text color="#040A2D" fontSize="28px" fontWeight={500} fontFamily="Barlow">
            <CountUp
              start={0}
              end={allValidatorVotes?.toNumber() ?? 0}
              separator=","
              duration={1}
              decimal="."
              decimals={0}
              prefix=""
            />
          </Text>
        </DataRow>
      </DataItem>
      <DataItem>
        <DataTitle>Current balance (KCS)</DataTitle>
        <DataRow>
          <Text color="#040A2D" fontSize="28px" fontWeight={500} fontFamily="Barlow">
            <CountUp
              start={0}
              end={new BN(formatEther(balance ?? 0)).toNumber()}
              separator=","
              duration={1}
              decimal="."
              decimals={0}
              prefix=""
            />
          </Text>
          <BuyButton href="https://app.mojitoswap.finance/swap" target="_blank">
            Buy Now
          </BuyButton>
        </DataRow>
      </DataItem>
    </DashboardWrap>
  )
}

export default Dashboard
