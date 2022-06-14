import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Button, Divider, Table, Tooltip } from 'antd'
import BN from 'bignumber.js'
import { Image, RowCenterBox } from 'components'
import { RowBetween } from 'components/Row'
import Text from 'components/Text'
import { BigNumber } from 'ethers/utils'
import { sortBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { useAprList } from 'state/application/hooks'
import { Pool } from 'state/types'
import styled from 'styled-components'
import { ValidatorStatus } from '../../../constants/types'
import { useSortedPools } from '../../../state/hooks'
import { useResponsive } from '../../../utils/responsive'
import FailedModal from './FailedModal'
import SuccessModal from './SuccessModal'
import ValidatorMoldal from './ValidatorModal'
import VoteModal from './VoteModal'

const ValidatorTableWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 12px;
  padding: 6px 0px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`

const StyledButton = styled(Button)``

const TableWrap = styled.div`
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 12px;
  width: 100%;

  .ant-table-cell {
    background: #fff;
    &::before {
      background-color: transparent !important;
    }
    &::after {
      background-color: transparent;
    }
    border-bottom: none;
  }

  tr:first-child td {
    border-top: 1px solid #dbdbe6 !important;
  }

  .ant-table-cell-fix-right {
    z-index: 0;
  }

  .ant-table-thead > tr > th {
    color: #494e67;
    font-size: 16px;
  }
`

const TableCellText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #040a2d;
`

const Title = styled.div`
  font-family: 'Barlow Medium';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #040a2d;
  margin: 30px 0 15px 0;
`

const MobileItem = styled.div`
  height: 265px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  padding: 34px 16px;
  margin-bottom: 12px;
`

const ValidatorCell = styled(RowCenterBox)`
  cursor: pointer;
  &:hover ${TableCellText} {
    color: #00d092;
    text-decoration: underline;
  }
`

const validatorStatusColors = ['#14D89D', '#666666', '#FB6491']
const validatorStatusBackgroundColors = ['#D4F8EC', '#E8E9EB', '#FEE2EA']

const ValidatorTag = styled.div<{ nth: ValidatorStatus }>`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: auto;
  max-width: 62px;
  border-radius: 12px;
  padding: 0 8px;
  color: ${({ nth }) => validatorStatusColors[nth]};
  background: ${({ nth }) => validatorStatusBackgroundColors[nth]};
  @media (max-width: 768px) {
    width: 120px;
  }
`

const StyledDivider = styled.div`
  width: 132px;
  margin: 0 auto;
  margin-top: 26px;
`

const EndText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #7f8393;
`

const ValidatorTable: FunctionComponent = () => {
  const { account } = useWeb3React()

  const { isMobile } = useResponsive()

  const initModalStatus = {
    voteModalShow: false,
    successModalShow: false,
    failModalShow: false,
    validatorModalShow: false,
  }

  const [modalList, setModalList] = React.useState<typeof initModalStatus>(initModalStatus)

  const [hash, setHash] = React.useState<string>('')

  const initTargetRow = {
    rank: 0,
    validator: '',
    name: '',
    website: '',
    vote: new BigNumber(0),
    apr: 0,
    address: '',
    email: '',
    details: '',
    percent: 0,
  }

  const [targetRow, setTargetRow] = React.useState<Pool & { percent: number }>(initTargetRow)

  const sortedPools = useSortedPools()

  const allValidatorVotes = React.useMemo(() => {
    return sortedPools.reduce((prev, current, index) => {
      return prev.add(current.votes ?? 0)
    }, new BigNumber(0))
  }, [sortedPools])

  const aprList = useAprList()

  const dataSource = React.useMemo(() => {
    const source = sortedPools.map((pool, index) => {
      return {
        ...pool,
        apr: aprList[pool.address.toLowerCase()] ? aprList[pool.address.toLowerCase()] : '0',
        rank: index + 1,
        percent: pool?.votes && allValidatorVotes.gt(0) ? pool.votes.mul(100).div(allValidatorVotes).toNumber() : 0,
      }
    })

    const activePools = sortBy(
      source.filter((p) => p.status === ValidatorStatus.Active),
      (p) => (p?.votes ? -p.votes.toNumber() : 0)
    )

    const jailedPools = sortBy(
      source.filter((p) => p.status === ValidatorStatus['In Jail']),
      (p) => (p?.votes ? -p.votes.toNumber() : 0)
    )
    const inactivePools = sortBy(
      source.filter((p) => p.status === ValidatorStatus.Inactive),
      (p) => (p?.votes ? -p.votes.toNumber() : 0)
    )

    return [...activePools, ...inactivePools, ...jailedPools]
  }, [sortedPools, allValidatorVotes, aprList])

  const formatBigNumber = (value) => <TableCellText>{value ? value?.toString() : '-'}</TableCellText>

  const formatApr = (value) => <TableCellText>{value ? `${value?.toString()}%` : '-'}</TableCellText>

  const openValidatorModal = (rowData) => {
    console.log('rowData', rowData)
    setTargetRow(() => rowData)
    setModalList((list) => {
      return { ...list, validatorModalShow: true }
    })
  }

  const renderValidator = (value, rowData) => (
    <ValidatorCell style={{ cursor: 'pointer' }} onClick={openValidatorModal.bind(null, rowData)}>
      <Image
        src={require('../../../assets/images/Icons/validator.png').default}
        width="16px"
        height="16px"
        alt="validator-icon"
      />
      <TableCellText style={{ marginLeft: '8px' }}>{value ? value : '-'}</TableCellText>
    </ValidatorCell>
  )

  const renderAllVotes = (value) => {
    if (!value || allValidatorVotes.lte(0)) return '-'
    const percent = value.mul(100).div(allValidatorVotes).toString()
    return (
      <TableCellText>{`${new BN(value?.toString() ?? 0).toFormat({
        groupSeparator: ',',
        groupSize: 3,
      })}/${percent}%`}</TableCellText>
    )
  }

  const renderCommission = (value) => {
    if (!value) return '-'
    const percent = value.mul(100).div(10000).toString()
    return <TableCellText>{`${percent}%`}</TableCellText>
  }

  const renderStatus = (status) => {
    if (status === undefined) return '-'
    return <ValidatorTag nth={status}>{ValidatorStatus[status]}</ValidatorTag>
  }

  const columns: any[] = React.useMemo(() => {
    return [
      {
        title: 'No.',
        dataIndex: 'rank',
        key: 'rank',
        width: '100px',
        align: 'center',
        render: (rowData, key, index) => <TableCellText style={{ justifyContent: 'center' }}>{rowData}</TableCellText>,
      },
      {
        title: 'Validator',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        render: renderValidator,
      },
      {
        title: (
          <RowCenterBox>
            <TableCellText style={{ marginRight: '5px' }}>Vote/Proportion</TableCellText>
            <Tooltip placement="top" title="Percentage of votes received by this node to the total number of votes">
              <QuestionCircleOutlined />
            </Tooltip>
          </RowCenterBox>
        ),
        dataIndex: 'votes',
        key: 'votes',
        align: 'left',
        render: renderAllVotes,
        sorter: (a: Pool, b: Pool) => (a?.votes?.toNumber() ?? 0) - (b?.votes?.toNumber() ?? 0),
      },
      {
        title: (
          <RowCenterBox>
            <TableCellText style={{ marginRight: '5px' }}>APR</TableCellText>
            <Tooltip
              placement="top"
              title="Annual Percentage Rate(APR) is the annual rate of rewards paid to voters. The calculation is based on the income of this validator 2 days ago. It is not compounded and updated every 24 hours."
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </RowCenterBox>
        ),
        dataIndex: 'apr',
        key: 'apr',
        align: 'left',
        render: formatApr,
        sorter: (a: Pool, b: Pool) => (a?.apr ?? 0) - (b?.apr ?? 0),
      },
      {
        title: (
          <RowCenterBox>
            <TableCellText style={{ marginRight: '5px' }}>Commission Rate</TableCellText>
            <Tooltip
              placement="top"
              title="The validator can apply a commission on the part of the revenue that goes to their delegators. This commission is set as a percentage. "
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </RowCenterBox>
        ),
        dataIndex: 'feeShares',
        key: 'feeShares',
        align: 'left',
        render: renderCommission,
        sorter: (a: Pool, b: Pool) => (a?.feeShares?.toNumber() ?? 0) - (b?.feeShares?.toNumber() ?? 0),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'left',
        render: renderStatus,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 140,
        align: 'center',
        render: (rowData, key, index) => {
          return (
            <StyledButton
              shape="round"
              type="primary"
              style={{ background: 'transparent' }}
              disabled={!account || rowData.status === ValidatorStatus['In Jail']}
              onClick={() => {
                setTargetRow(() => rowData)
                setModalList((list) => {
                  return { ...list, voteModalShow: true }
                })
              }}
            >
              <Text
                color={!account || rowData.status === ValidatorStatus['In Jail'] ? '#D4D4D4' : '#00D092'}
                fontSize="14px"
              >
                Vote
              </Text>
            </StyledButton>
          )
        },
      },
    ]
  }, [dataSource])

  const renderItem = (data, index) => {
    const RowItem = (title, content) => {
      return (
        <RowBetween style={{ marginBottom: '15px' }}>
          <Text color="#494E67">{title}</Text>
          <Text>{content}</Text>
        </RowBetween>
      )
    }

    return (
      <MobileItem key={index}>
        <RowBetween style={{ marginBottom: '20px' }}>
          {renderValidator(data?.name, data)}
          {renderStatus(data?.status)}
        </RowBetween>
        {RowItem('Vote/Proportion', renderAllVotes(data?.votes))}
        {RowItem('APR', formatBigNumber(data?.apr))}
        {RowItem('Commission', renderCommission(data?.feeShares))}
        <StyledButton
          shape="round"
          type="primary"
          style={{
            background: 'transparent',
            width: '100%',
            height: '40px',
            border: '1px solid #00D092',
            marginTop: '8px',
          }}
          disabled={!account}
          onClick={() => {
            setTargetRow(() => data)
            setModalList((list) => {
              return { ...list, validatorModalShow: true }
            })
          }}
        >
          <Text color="#00D092">Vote</Text>
        </StyledButton>
      </MobileItem>
    )
  }

  return (
    <>
      {isMobile ? (
        <>
          <Title>Validator</Title>
          {dataSource.map((item, index) => {
            return renderItem(item, index)
          })}
          <StyledDivider>
            <Divider>
              <EndText>End</EndText>
            </Divider>
          </StyledDivider>
        </>
      ) : (
        <ValidatorTableWrap>
          <TableWrap>
            <Table
              rowKey="address"
              bordered={false}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              showSorterTooltip={false}
            />
            <StyledDivider>
              <Divider>
                <EndText>End</EndText>
              </Divider>
            </StyledDivider>
          </TableWrap>
        </ValidatorTableWrap>
      )}
      {/* Modal list */}

      {modalList.voteModalShow && (
        <VoteModal
          validator={targetRow}
          visible={modalList.voteModalShow}
          title={targetRow?.name}
          setModalList={setModalList}
          setHash={setHash}
          onCancel={() => {
            setModalList((list) => {
              return { ...list, voteModalShow: false }
            })
          }}
        />
      )}

      {modalList.validatorModalShow && (
        <ValidatorMoldal
          validator={targetRow}
          visible={modalList.validatorModalShow}
          setModalList={setModalList}
          onCancel={() => {
            setModalList((list) => {
              return { ...list, validatorModalShow: false }
            })
          }}
        />
      )}

      {modalList.successModalShow && (
        <SuccessModal
          title={targetRow.name}
          visible={modalList.successModalShow}
          setModalList={setModalList}
          hash={hash}
          onCancel={() => {
            setModalList((list) => {
              return { ...list, successModalShow: false }
            })
          }}
        />
      )}

      {modalList.failModalShow && (
        <FailedModal
          title={targetRow.name}
          hash={hash}
          visible={modalList.failModalShow}
          setModalList={setModalList}
          onCancel={() => {
            setModalList((list) => {
              return { ...list, failModalShow: false }
            })
          }}
        />
      )}
    </>
  )
}

export default ValidatorTable
