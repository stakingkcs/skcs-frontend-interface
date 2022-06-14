import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { RowBetween, AutoRow } from '../../../components/Row/index'
import { Image } from 'components'
import { useResponsive } from '../../../utils/responsive'

const RulesWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 12px;
  padding: 38px 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
  @media (max-width: 768px) {
    margin-top: 16px;
    padding: 36px 20px;
  }
`

const Title = styled.div`
  font-family: 'Barlow Medium';
  font-style: normal;
  font-weight: 700;
  font-size: 25.5294px;
  line-height: 30px;
  color: #040a2d;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const FAQContainer = styled.a`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const FAQText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #040a2d;
  margin: 0 2px 0px 6px;
`
const RuleList = styled.div`
  margin-top: 24px;
  line-height: 28px;
`

const RuleText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #494e67;
`

const Rules: FunctionComponent = () => {
  const { isMobile } = useResponsive()

  const renderFaq = () => {
    return (
      <FAQContainer href="https://docs.kcc.io/#/en-us/?id=kcc-staking" target="_blank" style={{ cursor: 'pointer' }}>
        <Image
          src={require('../../../assets/images/Icons/faq.png').default}
          width="16px"
          height="16px"
          alt="faq-icon"
        />
        <FAQText>FAQ</FAQText>
        <Image
          src={require('../../../assets/images/Icons/arrow-right.png').default}
          width="16px"
          height="16px"
          alt="faq-icon"
        />
      </FAQContainer>
    )
  }

  return (
    <RulesWrap>
      <RowBetween>
        <Title>Staking and Voting Rules</Title>
        {!isMobile && renderFaq()}
      </RowBetween>
      <RuleList>
        <RuleText>
          Voting Rule: Users can vote for candidates by staking KCS, 1 KCS represents 1 vote and can only vote for one
          candidate.
        </RuleText>
        <RuleText>
          The top 7 candidates in the ranking are the validator, the ranking is updated according to the number of user
          votes, and rewards are issued every day.
        </RuleText>
        <RuleText>
          Exit Mechanism: Users can redeem KCS and exit the voting at any time on "My Vote", and the redeemed KCS will
          be locked in about 3 days before receiving.
        </RuleText>
      </RuleList>

      {isMobile && (
        <AutoRow justify="center" style={{ marginTop: '30px' }}>
          {renderFaq()}
        </AutoRow>
      )}
    </RulesWrap>
  )
}

export default Rules
