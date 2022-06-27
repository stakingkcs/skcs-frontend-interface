import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { CenterBox } from '../../../components/index'

const BalancePanelWrpa = styled.div`
  width: 383px;
  height: 102px;
  left: 120px;
  top: 220px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const ImageWrap = styled(CenterBox)`
  width: 56px;
  height: 56px;
  background: linear-gradient(133.79deg, #0dc898 7.56%, #b65cf2 101.89%);
  border-radius: 50%;
`

const BalancePanel: FunctionComponent = () => {
  return <BalancePanelWrpa></BalancePanelWrpa>
}
