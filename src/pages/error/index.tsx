import React from 'react'
import styled from 'styled-components'
export interface NotFoundProps {}
import { useTranslation } from 'react-i18next'

const PageNotFoundWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  min-height: calc(100vh - 320px);
  color: #fff;
  background: linear-gradient(0deg, #277453 0%, rgba(0, 0, 0, 1) 100%);
  @media (max-width: 768px) {
    min-height: calc(100vh - 224px);
  }
`

const NotFound: React.FunctionComponent<NotFoundProps> = () => {
  const { t } = useTranslation()
  return <PageNotFoundWrap>{t('ERROR_1')}</PageNotFoundWrap>
}

export default NotFound
