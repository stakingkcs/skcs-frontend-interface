import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { changeMobileMenuShow } from '../state/application/actions'
import { useResponsive } from '../utils/responsive'

const UnicornWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`

const Link = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  /* identical to box height, or 200% */
  color: #49ffa1;
  margin-right: 8px;
  font-family: 'Barlow';
`

const Image = styled.img`
  margin-top: -3px;
  width: 37px;
  height: 16px;
`

const UnicornLink = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isMobile } = useResponsive()
  return (
    <UnicornWrap>
      <Link
        onClick={() => {
          history.push('/unicorn')
          if (isMobile) {
            dispatch(changeMobileMenuShow({ show: false }))
          }
        }}
      >
        {t('Unicorn Contest')}
      </Link>
      <Image src={require('../assets/images/home/hot.png').default} />
    </UnicornWrap>
  )
}

export default UnicornLink
