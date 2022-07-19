import { DownOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import React, { CSSProperties, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { allLanguages } from '../../constants/languageCodes'
import { theme } from '../../constants/theme'
import { changeLanguage } from '../../state/application/actions'
import { useLanguage } from '../../state/application/hooks'
import { AppDispatch } from '../../state/index'
import { useResponsive } from '../../utils/responsive'
import { BrowserView, MobileView } from '../Common'
import { RowBetween } from '../Row'

import StyledButton from 'components/StyledButton'
import { RowCenterBox } from '../index'
import './index.less'

export interface ChangeLanguageProps {
  styles?: CSSProperties
}

const MenuWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    padding-left: 0px;
  }
`

const LanguageItem = styled.div``

const Text = styled.div`
  height: 22px;
  font-size: 14px;
  font-weight: 500;
  color: ${() => theme.colors.primary};
  line-height: 24px;
  margin: 8px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`

export const LanguageButton = styled.div`
  cursor: pointer;
  width: 100px;
  height: 30px;
  line-height: none;
  padding: 0;
  border-radius: 20px;
  font-size: 12px;
  outline: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: #212124;
  &:hover {
    background: transparent !important;
  }
  @media (max-width: 768px) {
    background: none;
    border: none;
    width: 70px;
    margin-right: 10px;
  }
`

const BgColor = styled.div`
  position: absolute;
  width: 98%;
  height: 96%;
  left: 1%;
  top: 2%;
  z-index: 0;
  background: #000;
  border-radius: 28px;
`

const StyledPopover = styled(Popover)`
  .ant-popover-inner {
    background-color: #000000 !important;
  }

  .ant-popover-arrow-content::before {
    background: #000 !important;
  }
`

const ChangeLanguage: React.FunctionComponent<ChangeLanguageProps> = ({ styles }) => {
  const { isMobile } = useResponsive()
  const { i18n } = useTranslation()

  const [show, setShow] = useState(false)

  let timer: any = null

  const dispatch = useDispatch<AppDispatch>()

  const showPop = () => {
    timer && clearTimeout(timer)
    setShow(() => true)
  }

  const hidePopover = () => {
    timer = setTimeout(() => {
      setShow(() => false)
    }, 300)
  }

  const selectChange = (code: string) => {
    dispatch(changeLanguage({ lng: code }))
    i18n.changeLanguage(code)
    setShow(() => false)
  }

  const lang = useLanguage()

  const currentLanguage = React.useMemo(() => {
    for (let i = 0; i < allLanguages.length; i++) {
      if (allLanguages[i].code === i18n.language) {
        return allLanguages[i].language
      }
    }
    return 'English'
  }, [i18n.language, allLanguages, lang])

  const selectOptions = allLanguages.map((lng, index) => {
    return (
      <LanguageItem
        key={index}
        onClick={selectChange.bind(null, lng.code)}
        onMouseEnter={showPop}
        onMouseLeave={hidePopover}
      >
        <RowBetween>
          <Text> {lng.language}</Text>
        </RowBetween>
      </LanguageItem>
    )
  })
  return (
    <MenuWrap style={styles}>
      <StyledPopover style={{ background: '#000' }} placement="bottom" content={selectOptions} visible={show}>
        <BrowserView>
          <StyledButton
            onMouseEnter={showPop}
            onMouseLeave={hidePopover}
            onClick={() => {
              setShow(() => !show)
            }}
            style={{
              color: theme.colors.primary,
              fontSize: isMobile ? '14px' : '12px',
              height: '36px',
              position: 'relative',
            }}
          >
            <BgColor />
            <RowCenterBox style={{ position: 'relative', zIndex: 2 }}>
              {currentLanguage}
              <DownOutlined style={{ fontSize: '10px', marginLeft: isMobile ? '2px' : '6px' }} />
            </RowCenterBox>
          </StyledButton>
        </BrowserView>
        <MobileView>
          <LanguageButton
            onClick={() => {
              setShow(() => !show)
            }}
            style={{ color: theme.colors.primary, fontSize: isMobile ? '14px' : '12px' }}
          >
            {currentLanguage}
            <DownOutlined style={{ fontSize: '10px', marginLeft: isMobile ? '2px' : '6px' }} />
          </LanguageButton>
        </MobileView>
      </StyledPopover>
    </MenuWrap>
  )
}

export default React.memo(ChangeLanguage)
