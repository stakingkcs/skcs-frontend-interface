import { Collapse, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Image, RowCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'

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

const faqList = [
  {
    title: '1.How to participate in KCC node validator with staking?',
    desc: (
      <div>
        <FaqP>
          By staking your KCS, you participate in the node selection voting process of Kucoin Community Chain（KCC）
          validators and earn rewards. Staking KCS is critical for securing the network.
        </FaqP>
        <FaqP>Validators can stake KCS to themselves, and they can also receive delegations from KCS voting.</FaqP>
        <FaqP>
          You can vote for validators by staking KCS, 1 KCS represents 1 vote, you can get the KCS back if you redeem
          the voting.
        </FaqP>
      </div>
    ),
  },
  {
    title: '2.How to check/withdraw my staking rewards?',
    desc: (
      <div>
        <FaqP>1.Click on "My Vote" to see your rewards overview</FaqP>
        <FaqP>2.You can check the rewards of each validator and click “Claim” to get it</FaqP>
      </div>
    ),
  },
  {
    title: '3.How to redeem my staking?',
    desc: (
      <div>
        <FaqP>1.Click on "My Vote" to see your staking overview</FaqP>
        <FaqP>2.Click "Redeem" to stop staking</FaqP>
        <FaqP>
          3.You can withdraw it after 3days unbinding period, during the unbinding period, your staked KCS will not
          receive any rewards.
        </FaqP>
      </div>
    ),
  },
]

const FAQ: React.FunctionComponent = () => {
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
        <Title>FAQ</Title>
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
                  More
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
