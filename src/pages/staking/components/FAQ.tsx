import { Collapse, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Image, RowCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'
import { sKCS } from 'constants/index'
import { useLanguage } from 'state/application/hooks'

const { Panel } = Collapse

const StepsWrap = styled.div`
  width: 100%;
  height: auto;
  .ant-collapse {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    width: 100%;
  }

  .ant-collapse-content {
    color: #fff;
    border-top: 1px solid #333;
    width: 100%;
    background: none;
  }

  .ant-collapse-item {
    border-bottom: none;
    border-radius: 16px !important;
    overflow: hidden;
    width: 100%;
  }

  .ant-collapse-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    width: 100%;
  }

  .ant-collapse-header-text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    width: 100%;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0;
    padding: 0 20px;
    width: 100%;
  }
  .ant-collapse-content-box {
    padding-left: 30px;
    position: relative;
    background: rgba(0, 0, 0, 0.1) !important;
    &::before {
      position: absolute;
      content: '';
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 4px;
      z-index: 4;
      background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%);
    }
  }
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  text-align: left;
  color: #ffffff;
  flex: 1;
  width: 340px;
  white-space: nowrap;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 40px;
    width: 100%;
  }
`

const PanelHeader = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  user-select: none;
  padding-left: 0px;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const FaqP = styled.div`
  font-family: 'Arial';
  line-height: 1.4;
  &:not(:first-child) {
    margin-top: 5px;
  }
`
const MoreLink = styled.a`
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`

const MoreText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
`

const FAQ: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const language = useLanguage()

  const [activeList, setActiveList] = React.useState<boolean[]>(new Array(3).fill(false))

  const faqList = React.useMemo(() => {
    return [
      {
        title: t('STAKE_24'),
        desc: (
          <div>
            <FaqP>{t('STAKE_25')}</FaqP>
            <FaqP>{t('STAKE_26')}</FaqP>
          </div>
        ),
      },
      {
        title: t('STAKE_28'),
        desc: (
          <div>
            <FaqP>{t('STAKE_29')}</FaqP>
            <FaqP>{t('STAKE_30')}</FaqP>
          </div>
        ),
      },
      {
        title: t('STAKE_31'),
        desc: (
          <div>
            <FaqP>{t('STAKE_32')}</FaqP>
            <FaqP>{t('STAKE_33')}</FaqP>
            <FaqP>{t('STAKE_34')}</FaqP>
            <FaqP>{t('STAKE_84')}</FaqP>
          </div>
        ),
      },
    ]
  }, [language, t, activeList])

  const { isMobile } = useResponsive()

  const handlePanelChange = (index) => {
    setActiveList((oldList) => {
      const list = [...oldList]
      list.splice(index, 1, !oldList[index])
      return list
    })
  }

  return (
    <StepsWrap>
      <Content>
        <RowCenterBox justify="space-between">
          <Title>{t('HOME_52')}</Title>
          <RowCenterBox
            justify="flex-end"
            style={{ cursor: 'pointer', display: isMobile ? 'none' : 'flex' }}
            onClick={() => window.open(sKCS.faq, '_blank')}
          >
            <MoreText>{t('STAKE_23')}</MoreText>
            <Image
              src={require('../../../assets/images/Icons/arrow-right-white.png').default}
              width="24px"
              height="24px"
              alt="arrow-right"
            />
          </RowCenterBox>
        </RowCenterBox>

        <RowCenterBox justify="center" style={{ width: '100%', marginTop: isMobile ? '24px' : '24px' }}>
          <Space direction="vertical" size={16} style={{ width: isMobile ? '351px' : '100%', height: 'auto' }}>
            {faqList.map((faq, index) => {
              return (
                <Collapse
                  key={index}
                  collapsible="header"
                  onChange={handlePanelChange.bind(null, index)}
                  style={{ borderRadius: '16px' }}
                >
                  <Panel
                    header={
                      <PanelHeader>
                        <span style={{ textAlign: 'left', fontFamily: 'Arial' }}>{`${index + 1}. ${faq.title}`}</span>
                        {!activeList[index] ? (
                          <Image
                            src={require('../../../assets/images/Icons/purple-plus.png').default}
                            width="24px"
                            height="24px"
                            alt="arrow-right-icon"
                          />
                        ) : (
                          <Image
                            src={require('../../../assets/images/Icons/purple-minus.png').default}
                            width="24px"
                            height="24px"
                            alt="arrow-down-icon"
                          />
                        )}
                      </PanelHeader>
                    }
                    showArrow={false}
                    key={index}
                  >
                    {faq.desc}
                  </Panel>
                </Collapse>
              )
            })}
          </Space>
        </RowCenterBox>
      </Content>
    </StepsWrap>
  )
}

export default FAQ
