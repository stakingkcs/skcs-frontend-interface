import { Collapse, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Image, RowCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse

const StepsWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 80px 0 80px 0;
  .ant-collapse {
    background: #1d1d1d;
    color: #fff;
    border: none;
    width: 100%;
  }

  .ant-collapse-content {
    background: #1d1d1d;
    color: #fff;
    border-top: 1px solid #333;
    width: 100%;
  }

  .ant-collapse-item {
    border-bottom: none;
    border-radius: 8px;
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
    font-family: 'Barlow';
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
  align-items: center;
`

const Title = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    max-width: 300px;
    font-size: 24px;
    text-align: center;
  }
`

const PanelHeader = styled.div`
  font-family: 'Barlow';
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
`

const RotateArrow = styled.div`
  transform: rotate(90deg);
`

const FaqP = styled.div`
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

const FAQ: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const faqList = [
    {
      title: t("HOME_41"),
      desc: (
        <div>
          <FaqP>
            {t("HOME_42")}
          </FaqP>
          <FaqP>{t("HOME_43")}</FaqP>
          <FaqP>
           {t("HOME_44")}
          </FaqP>
        </div>
      ),
    },
    {
      title: t("HOME_45"),
      desc: (
        <div>
          <FaqP>{t("HOME_46")}</FaqP>
          <FaqP>{t("HOME_47")}</FaqP>
        </div>
      ),
    },
    {
      title: t("HOME_48"),
      desc: (
        <div>
          <FaqP>{t("HOME_49")}</FaqP>
          <FaqP>{t("HOME_50")}</FaqP>
          <FaqP>
            {t("HOME_51")}
          </FaqP>
        </div>
      ),
    },
  ]
  const [activeList, setActiveList] = React.useState<boolean[]>(new Array(faqList.length).fill(false))
  const { isMobile } = useResponsive()

  const handlePanelChange = (index) => {
    setActiveList((oldList) => {
      const list = [...oldList]
      list.splice(index, 1, !oldList[index])
      console.log('list', list)
      return list
    })
  }

  return (
    <StepsWrap>
      <Content>
        <Title>{t("HOME_52")}</Title>
        <RowCenterBox justify="center" style={{ width: '100%', marginTop: isMobile ? '32px' : '50px' }}>
          <Space direction="vertical" size={16} style={{ width: isMobile ? '351px' : '100%' }}>
            {faqList.map((faq, index) => {
              return (
                <Collapse
                  key={index}
                  collapsible="header"
                  onChange={handlePanelChange.bind(null, index)}
                  style={{ borderRadius: '8px' }}
                >
                  <Panel
                    header={
                      <PanelHeader>
                        <span>{faq.title}</span>
                        {!activeList[index] ? (
                          <Image
                            src={require('../../../assets/images/home/arrow-right-home.png').default}
                            width="16px"
                            height="16px"
                            alt="arrow-right-icon"
                          />
                        ) : (
                          <RotateArrow>
                            <Image
                              src={require('../../../assets/images/home/arrow-right-home.png').default}
                              width="16px"
                              height="16px"
                              alt="arrow-down-icon"
                            />
                          </RotateArrow>
                        )}
                      </PanelHeader>
                    }
                    showArrow={false}
                    key={faq.title}
                  >
                    {faq.desc}
                  </Panel>
                </Collapse>
              )
            })}
            <RowCenterBox justify="center">
              <PanelHeader style={{ justifyContent: 'center', cursor: 'pointer', height: isMobile ? '36px' : '72px' }}>
                <MoreLink href="https://docs.kcc.io/#/en-us/?id=kcc-staking" target="_blank">
                  {t("HOME_53")}
                </MoreLink>
              </PanelHeader>
            </RowCenterBox>
          </Space>
        </RowCenterBox>
      </Content>
    </StepsWrap>
  )
}

export default FAQ
