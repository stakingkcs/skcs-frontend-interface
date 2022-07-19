import { RowCenterBox, Image } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { getNetworkInfo } from '../../utils/index'

const HashText = styled.a`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #00d092;
  margin-right: 4px;
  &:hover {
    color: #00d092;
  }
`

const HashLink: React.FunctionComponent<{ hash: string }> = ({ hash }) => {
  const chainInfo = getNetworkInfo(Number(process.env.REACT_APP_CHAIN_ID))
  const { t } = useTranslation()
  return (
    <RowCenterBox justify="center" style={{ display: hash ? 'flex' : 'none', cursor: 'pointer' }}>
      <HashText href={`${chainInfo.browser}/tx/${hash}`} target="_blank">
        {t("COMPONENT_11")}
      </HashText>
      <Image src={require('../../assets/images/Icons/share.png').default} width="16px" height="16px" alt="share-icon" />
    </RowCenterBox>
  )
}

export default HashLink
