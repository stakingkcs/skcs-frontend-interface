import React from 'react'
import { Button, Input, Select, message, Radio, Table, Popconfirm } from 'antd'
import { FlexBox, RowCenterBox } from 'components'
import pools from 'constants/pools'
import { BigNumber, formatEther } from 'ethers/utils'
import { useValidatorContract } from '../../hooks/useContract'
import { parseInt, sortBy } from 'lodash'

import { constants } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { usePools } from 'state/hooks'
import { fetchPoolsUserDataAsync } from 'state/pools'
import { useDispatch } from 'react-redux'
import { useSortedPools } from '../../state/hooks'
import styled from 'styled-components'
import { useBalance } from '../../state/wallet/hooks'
import { redeemFromValidator, voteForValidator, withdrawFromValidator } from 'utils/validator'
import { validatorContractHelper } from '../../utils/validator'
import { fetchPoolsPublicDataAsync } from '../../state/pools/index'

const { Option } = Select

const StyledButton = styled(Button)`
  & + & {
    margin-left: 20px;
  }
`

type Props = {}

function Test({}: Props) {
  const { account } = useWeb3React()

  const [voteAddress, setVoteAddress] = React.useState<string>(pools[0].address)

  const [voteNumber, setVoteNumber] = React.useState<BigNumber>(new BigNumber(100))

  const [summary, setSummary] = React.useState<any>(null)

  const banlance = useBalance()

  const dispatch = useDispatch()

  const validatorContract = useValidatorContract()

  const userPools = usePools()

  const initStatus = {
    loading: false,
    visible: false,
    number: '',
  }

  const initStatusList = new Array(pools.length).fill(initStatus)

  const [voteAction, setVoteAction] = React.useState<typeof initStatus[]>(initStatusList)
  const [withdrawAction, setWithdrawAction] = React.useState<typeof initStatus[]>(initStatusList)
  const [reedomAction, setReedomAction] = React.useState<typeof initStatus[]>(initStatusList)
  const [claimAction, setClaimAction] = React.useState<typeof initStatus[]>(initStatusList)

  const changeVoteAddress = (e) => {
    console.log('value', e)
    setVoteAddress(() => e.target.value)
  }

  const changeVoteNumber = (e) => {
    console.log('e.target.value', e.target.value)
    setVoteNumber(() => (e.target.value ? new BigNumber(parseInt(e.target.value)) : constants.Zero))
  }

  const vote = React.useCallback(() => {
    async function votePool() {
      console.log('vote')
      try {
        const res = await validatorContract.vote(voteAddress, { value: constants.WeiPerEther.mul(voteNumber) })
        console.log('res', res)
        res.wait(1).then(() => {
          message.success('vote success')
        })
      } catch (e) {
        message.error(e as any)
      }
    }

    console.log(validatorContract)

    if (validatorContract && voteAddress && voteNumber) {
      votePool()
    }
  }, [validatorContract, voteAddress, voteNumber])

  const formatBigNumber = (value) => <span>{value ? value?.toString() : '-'}</span>
  const formatPending = (value) => <span>{value ? formatEther(value) + 'KCS' : '-'}</span>

  const sortedPools = useSortedPools()
  const dataSource = React.useMemo(() => {
    return sortedPools.map((pool) => {
      const p1 = pool.userData
      return {
        ...pool,
        ballot: p1?.ballot,
        feeShares: p1?.feeShares,
        pendingReward: p1?.pendingReward,
        revokeLockingEndTime: p1?.revokeLockingEndTime,
        revokingBallot: p1?.revokingBallot,
      }
    })
  }, [sortedPools])

  // modal

  const handleVote = async (rowData, index) => {
    const response = await voteForValidator(validatorContract, rowData.address, Number(voteAction[index].number))
    if (response.status) {
      dispatch(fetchPoolsPublicDataAsync(account as string))
      setVoteAction((old) => {
        const list = [...old]
        list.splice(index, 1, { ...list[index], visible: false })
        return list
      })
    } else {
      message.error(`${response.error?.message}`)
    }
  }

  const handleRevokeVote = async (rowData, index) => {
    const response = await redeemFromValidator(validatorContract, rowData.address, Number(reedomAction[index].number))
    if (response.status) {
      message.success('voted')
      dispatch(fetchPoolsUserDataAsync(account))
      setReedomAction((old) => {
        const list = [...old]
        list.splice(index, 1, { ...list[index], visible: false })
        return list
      })
    } else {
      message.error(`${response.error?.message}`)
    }
  }

  const handleWithdraw = async (rowData) => {
    const response = await withdrawFromValidator(validatorContract, rowData.address)
    if (response.status) {
      message.success('withdraw success')
      dispatch(fetchPoolsUserDataAsync(account))
    } else {
      message.error(`${response.error?.message}`)
    }
  }

  const handleClaim = async (rowData) => {
    const response = await validatorContractHelper.claimRewardFromValidator(validatorContract, rowData.address)
    if (response.status) {
      if (response.data?.status === 1) {
        message.success('claim success')
        dispatch(fetchPoolsUserDataAsync(account))
      } else {
        message.success('claim error')
      }
    } else {
      message.error(`${response.error?.message}`)
    }
  }

  const columns: any[] = React.useMemo(() => {
    return [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'website',
        dataIndex: 'website',
        key: 'website',
      },
      {
        title: 'details',
        dataIndex: 'details',
        key: 'details',
      },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'rank',
        dataIndex: 'rank',
        key: 'rank',
      },
      {
        title: 'votes',
        dataIndex: 'votes',
        key: 'votes',
        render: formatBigNumber,
      },
      {
        title: 'feeShares',
        dataIndex: 'feeShares',
        key: 'feeShares',
        render: formatBigNumber,
      },
      {
        title: 'ballot',
        dataIndex: 'ballot',
        key: 'ballot',
        render: formatBigNumber,
      },
      {
        title: 'pendingReward',
        dataIndex: 'pendingReward',
        key: 'pendingReward',
        render: formatPending,
      },
      {
        title: 'revokeLockingEndTime',
        dataIndex: 'revokeLockingEndTime',
        key: 'revokeLockingEndTime',
        render: formatBigNumber,
      },
      {
        title: 'revokingBallot',
        dataIndex: 'revokingBallot',
        key: 'revokingBallot',
        render: formatBigNumber,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 300,
        render: (rowData, key, index) => {
          return (
            <FlexBox>
              {new BigNumber(String(banlance ?? 0)).gt(constants.WeiPerEther) && (
                <Popconfirm
                  icon={null}
                  title={
                    <RowCenterBox>
                      <span>KCS:</span>
                      <Input
                        type="number"
                        onChange={(e) => {
                          setVoteAction((old) => {
                            const list = [...old]
                            list.splice(index, 1, { ...list[index], number: e.target.value })
                            return list
                          })
                        }}
                      />
                    </RowCenterBox>
                  }
                  visible={voteAction[index].visible}
                  onConfirm={handleVote.bind(null, rowData, index)}
                  okButtonProps={{ loading: voteAction[index].loading }}
                  onCancel={() =>
                    setVoteAction((old) => {
                      const list = [...old]
                      list.splice(index, 1, { ...list[index], visible: false })
                      return list
                    })
                  }
                >
                  <StyledButton
                    onClick={() =>
                      setVoteAction((old) => {
                        const list = [...old]
                        list.splice(index, 1, { ...list[index], visible: true })
                        return list
                      })
                    }
                  >
                    Vote
                  </StyledButton>
                </Popconfirm>
              )}

              {rowData?.ballot?.gte(1) && (
                <Popconfirm
                  icon={null}
                  title={
                    <RowCenterBox>
                      <span>KCS:</span>
                      <Input
                        type="number"
                        onChange={(e) => {
                          setReedomAction((old) => {
                            const list = [...old]
                            list.splice(index, 1, { ...list[index], number: e.target.value })
                            console.log(list)
                            return list
                          })
                        }}
                      />
                    </RowCenterBox>
                  }
                  visible={reedomAction[index].visible}
                  onConfirm={handleRevokeVote.bind(null, rowData, index)}
                  okButtonProps={{ loading: reedomAction[index].loading }}
                  onCancel={() =>
                    setReedomAction((old) => {
                      const list = [...old]
                      list.splice(index, 1, { ...list[index], visible: false })
                      return list
                    })
                  }
                >
                  <StyledButton
                    onClick={() =>
                      setReedomAction((old) => {
                        const list = [...old]
                        list.splice(index, 1, { ...list[index], visible: true })
                        return list
                      })
                    }
                  >
                    Redeem
                  </StyledButton>
                </Popconfirm>
              )}
              {rowData?.revokingBallot?.gte(1) && (
                <StyledButton onClick={handleWithdraw.bind(null, rowData)}>Withdraw</StyledButton>
              )}
              {rowData?.pendingReward?.gte(1) && (
                <StyledButton onClick={handleClaim.bind(null, rowData)}>Claim</StyledButton>
              )}
            </FlexBox>
          )
        },
      },
    ]
  }, [dataSource])

  React.useEffect(() => {
    console.log('dataSource', dataSource)
  }, [dataSource])

  return (
    <>
      <FlexBox style={{ marginTop: '300px' }}>
        <RowCenterBox>
          <Table dataSource={dataSource} columns={columns} />
        </RowCenterBox>
      </FlexBox>

      <FlexBox style={{ marginTop: '20px' }}>
        <RowCenterBox>
          <Radio.Group defaultValue={pools[0].address} onChange={changeVoteAddress}>
            <Radio value={pools[0].address}>{pools[0].name}</Radio>
            <Radio value={pools[1].address}>{pools[1].name}</Radio>
          </Radio.Group>
          <Input value={voteNumber.toNumber()} onChange={changeVoteNumber} />
          <Button onClick={vote}>Vote</Button>
        </RowCenterBox>
      </FlexBox>
    </>
  )
}

export default Test
