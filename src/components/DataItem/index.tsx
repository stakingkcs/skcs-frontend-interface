import { RowCenterBox } from 'components'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const DataItemWrap = styled.div`
  width: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  @media (max-width: 768px) {
    & + & {
      margin-top: 10px;
    }
  }
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`

const SubTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  margin-right: 6px;
  @media (max-width: 768px) {
    font-size: 14px;
    text-align: left;
  }
`
const BalanceText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #00d092;
  margin-right: 8px;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const UBalanceText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #b4b7c1;
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface Props {
  title: string
  uBalance?: string
  titleExtra?: ReactElement
  balance: string
  balanceExtra?: ReactElement
}

const DataItem: React.FunctionComponent<Props> = ({ uBalance, titleExtra, balance, balanceExtra, title }) => {
  return (
    <DataItemWrap>
      <RowCenterBox>
        <SubTitle>{title}</SubTitle>
        {titleExtra}
      </RowCenterBox>
      <RowCenterBox style={{ margin: '8px 0 4px 0' }}>
        <BalanceText>{balance}</BalanceText>
        {balanceExtra}
      </RowCenterBox>
      {uBalance && <UBalanceText>{uBalance}</UBalanceText>}
    </DataItemWrap>
  )
}

export default DataItem
