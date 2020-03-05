import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

const TutorialText = styled.div`
  padding-left: 5px;
  align-self: auto;
`

const CardWrapper = styled.div`
  background: ${props => props.theme.color.light.accent100};
  color: ${props => props.theme.color.dark.accent100};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 10px;
  padding: 15px;
  grid-gap: 5px;
  transition: transform 160ms;
  box-shadow: ${props => props.theme.shadow.default};
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(198, 208, 235);
  height: 80px;
  .dark & {
    background: ${props => props.theme.color.dark.accent200};
    color: ${props => props.theme.color.light.accent100};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px;
    border-color: rgba(255, 255, 255, 0.2);
    border-width: 1px;
    border-style: solid;
  }
  .dark & :hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 30px 60px;
  }
  .gatsby-image-wrapper {
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;
  }
  :hover {
    box-shadow: ${props => props.theme.shadow.hover};
    transform: scale(1.01);
  }
  :hover .gatsby-image-wrapper {
    transform: scale(1.1);
  }
`

const TutorialIcon = styled.div`
  width: 40px;
  align-self: center;
`

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 5px;
  align-items: center;
  justify-items: center;
`

const TutorialTitle = styled.p`
  margin: 0;
  line-height: 0.9em;
  @media (max-width: ${props => props.theme.screen.xs}) {
    font-size: 10px;
  }
`

const Card = props => (
  <CardWrapper>
    <CardContent>
      <TutorialIcon>
        <Image fluid={props.tutorialIcon} />
      </TutorialIcon>
      <TutorialText>
        <TutorialTitle>{props.tutorialTitle}</TutorialTitle>
      </TutorialText>
    </CardContent>
  </CardWrapper>
)

export default Card
