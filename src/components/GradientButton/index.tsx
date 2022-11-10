import styled from 'styled-components'
import { Image } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const ButtonWrap = styled.div`
  position: relative;
  width: 160px;
  height: 44px;
  background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%);
  border-radius: 25px;
`

const Button = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  width: 158px;
  height: 42px;
  background: #1a1a1a;
  border-radius: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%);
  }
`
const Text = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #efeff2;
  margin-right: 14px;
`

const TableWrap = styled.div`
  position: relative;
  width: 563px;
  height: 248px;
  background: linear-gradient(131.22deg, rgba(0, 208, 146, 0.1) 1.46%, rgba(208, 74, 255, 0.1) 99.85%);
  border-radius: 12px;
  padding: 2px;
`
const Table = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const TitleColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 32px;
`

const KCSColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const SKCSColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const GradientButton: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  return (
    <ButtonWrap>
      <Button onClick={() => history.push('/staking')}>
        <Text>{t('HOME_5')}</Text>
        <Image
          src={require('../../assets/images/home/right-arrow.svg').default}
          width="24px"
          height="24px"
          alt="right-arrow"
        />
      </Button>
    </ButtonWrap>
  )
}

export default GradientButton
