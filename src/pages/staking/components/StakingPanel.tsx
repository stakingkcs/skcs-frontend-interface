import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { usePools } from '../../../state/hooks'
import { ValidatorStatus } from '../../../constants/types'
import Text from 'components/Text'
import { BigNumber, formatEther } from 'ethers/utils'
import { useBalance } from '../../../state/wallet/hooks'
import BN from 'bignumber.js'
import CountUp from 'react-countup'
import DataPanel from './DataPanel'
import { useWeb3React } from '@web3-react/core'

const StakingPanelWrap = styled.div<{ connected: boolean }>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: ${({ connected }) => {
    if (connected) {
      return '495px'
    }
    return '454px'
  }};
`

const DataPanelWrap = styled.div`
  width: 568px;
  height: 100%;
`
const StakePanel = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 600px;
  height: 100%;
`

const StakingPanel: FunctionComponent = () => {
  const balance = useBalance()
  const { account } = useWeb3React()

  return (
    <StakingPanelWrap connected={Boolean(account)}>
      <DataPanelWrap>
        <DataPanel />
      </DataPanelWrap>
      <StakePanel></StakePanel>
    </StakingPanelWrap>
  )
}

export default StakingPanel
