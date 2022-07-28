import React from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

const MaskWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`

const Text = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #b4b7c1;
`

const Mask: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <MaskWrap>
      <Text>{t('Coming Soon')}</Text>
    </MaskWrap>
  )
}

export default Mask
