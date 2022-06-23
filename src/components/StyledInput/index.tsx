import { Input, InputProps } from 'antd'
import BN from 'bignumber.js'
import { Image } from 'components'
import React from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'
import { useBalance } from '../../state/wallet/hooks'
import { RowCenterBox } from '../index'
import './index.less'

const StyledInputWrap = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`

const SInput = styled(Input)`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  padding-left: 18px;
  .ant-input {
    margin-left: 10px;
    color: #fff !important;
    background: transparent;
    height: 40px;
  }
`

const ErrorInfo = styled.div`
  position: absolute;
  bottom: -26px;
  left: 0;
  color: red;
`

const SuffixText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
`

const MaxButton = styled.div`
  background: rgba(0, 208, 146, 0.16);
  border-radius: 4px;
  width: 44px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #00d092;
  margin-right: 12px;
  cursor: pointer;
`

interface Props {
  inputValue: string
  setVaule: any
  error: { hasError: boolean; errorInfo: string }
  setError: any
  maxLimit: string
  checkBalance?: boolean
}

const StyledInput: React.FunctionComponent<InputProps & Props> = (props) => {
  const balance = useBalance()
  const { account } = useWeb3React()

  React.useEffect(() => {
    if (props.checkBalance && new BN(balance).div(10 ** 18).lte(0)) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'Insufficient balance' }
      })
    }
  }, [balance, props.checkBalance])

  const checkValue = (input) => {
    if (!account) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'Please connect your wallet' }
      })
      props.setVaule(() => input.target.value)
      return
    }

    const value = input.target.value?.trim()

    props.setError(() => {
      return { hasError: false, errorInfo: '' }
    })

    if (value === '') {
      props.setError(() => {
        return { hasError: true, errorInfo: '' }
      })
      props.setVaule(() => '')
      return
    }

    if (Number(value) === 0) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'The amount must be greater than 0.' }
      })
      props.setVaule(() => '')
      return
    }

    const Reg = /^[1-9][0-9]*([\.][0-9]{1,18})?$/

    if (!Reg.test(value)) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'Please enter a valid number with up to 18 decimal places.' }
      })
    }

    if (props.maxLimit && Number(value) > Number(props.maxLimit)) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'The amount exceeds the available balance.' }
      })
    }

    props.setVaule(() => value)
  }

  return (
    <StyledInputWrap>
      <SInput
        onChange={checkValue}
        width="100%"
        height="54px"
        size="large"
        style={{ color: '#fff' }}
        placeholder="Amount"
        value={props.inputValue}
        suffix={
          <RowCenterBox>
            <MaxButton
              onClick={() => {
                props.setVaule(props.maxLimit)
              }}
            >
              Max
            </MaxButton>
            <SuffixText>KCS</SuffixText>
          </RowCenterBox>
        }
        prefix={
          <Image src={require('../../assets/images/Icons/kcs.png').default} width="24px" height="24px" alt="kcs-icon" />
        }
      />
      {props.error.hasError && props.error.errorInfo && <ErrorInfo>{`* ${props.error.errorInfo}`}</ErrorInfo>}
    </StyledInputWrap>
  )
}

export default StyledInput
