import { Input, InputProps } from 'antd'
import BN from 'bignumber.js'
import { Image } from 'components'
import React from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'
import { useBalance } from '../../state/wallet/hooks'
import { RowCenterBox } from '../index'
import './index.less'
import { useResponsive } from 'utils/responsive'
import { useTranslation } from 'react-i18next'

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
  font-family: Arial;
  .ant-input {
    margin-left: 10px;
    color: #fff !important;
    background: transparent;
    height: 40px;
    font-family: Arial;
  }
  @media (max-width: 768px) {
    padding-left: 0px;
  }
`

const ErrorInfo = styled.div`
  position: absolute;
  bottom: -26px;
  left: 0;
  color: red;
  font-family: Arial;
  @media (max-width: 768px) {
    position: relative;
    bottom: -5px;
  }
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
  width: auto;
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
  padding: 0 5px;
`

interface Props {
  inputValue: string
  setVaule: any
  error: { hasError: boolean; errorInfo: string }
  setError: any
  maxLimit: string
  checkBalance?: boolean
  showMax?: boolean
}

const StyledInput: React.FunctionComponent<InputProps & Props> = ({ showMax = true, ...props }) => {
  const { isMobile } = useResponsive()
  const balance = useBalance()
  const { account } = useWeb3React()
  const { t } = useTranslation()

  React.useEffect(() => {
    if (props.readOnly) return
    if (props.checkBalance && new BN(balance).div(10 ** 18).lte(0)) {
      props.setError(() => {
        return { hasError: true, errorInfo: t('COMPONENT_4') }
      })
    }
  }, [balance, props.checkBalance])

  const checkValue = (input) => {
    console.log('readonly', props.readOnly)
    if (props.readOnly) return
    if (!account) {
      props.setError(() => {
        return { hasError: true, errorInfo: t('COMPONENT_5') }
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

    const Reg = /^([1-9][0-9]*|[0])(\.[0-9]{1,18})?$/

    if (!Reg.test(value)) {
      props.setError(() => {
        return { hasError: true, errorInfo: t('COMPONENT_6') }
      })
      const arr = value.split('.')
      if (arr.length > 1 && arr[arr.length - 1].length < 20) {
        props.setVaule(() => value)
      }
      return
    }

    if (props.maxLimit && Number(value) > Number(props.maxLimit)) {
      props.setError(() => {
        return { hasError: true, errorInfo: t('COMPONENT_7') }
      })
      props.setVaule(() => value)
      return
    }

    if (Number(value) === 0) {
      props.setError(() => {
        return { hasError: true, errorInfo: t('COMPONENT_8') }
      })
      props.setVaule(() => '0')
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
        placeholder={props.placeholder}
        value={props.inputValue}
        readOnly={props.readOnly}
        maxLength={37}
        suffix={
          <RowCenterBox>
            {showMax && (
              <MaxButton
                onClick={() => {
                  props.setError(() => {
                    return { hasError: false, errorInfo: '' }
                  })

                  props.setVaule(props.maxLimit)

                  if (Number(props.maxLimit) === 0) {
                    props.setError(() => {
                      return { hasError: true, errorInfo: t('COMPONENT_8') }
                    })
                  }
                }}
              >
                {t('COMPONENT_10')}
              </MaxButton>
            )}

            <SuffixText>{props.suffix ?? 'KCS'}</SuffixText>
          </RowCenterBox>
        }
        prefix={
          isMobile ? null : (
            <Image
              src={require('../../assets/images/Icons/kcs.png').default}
              width="24px"
              height="24px"
              alt="kcs-icon"
            />
          )
        }
      />
      {!props.readOnly && props.error.hasError && props.error.errorInfo && (
        <ErrorInfo>{`* ${props.error.errorInfo}`}</ErrorInfo>
      )}
    </StyledInputWrap>
  )
}

export default StyledInput
