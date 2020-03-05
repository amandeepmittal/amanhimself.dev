import React from 'react'
import styled from 'styled-components'

const Subtitle = styled.p`
  color: ${props => props.theme.color.light.accent100};
`

const ButtonContainer = styled.div`
  background-color: #52b351;
  border: 0px;
  padding: 10px;
  text-align: center;
  display: inline-block;
  border-radius: 8px;
  font-size: 20px;
`

const ButtonText = styled.a`
  color: ${props => props.theme.color.light.accent100};
  &:hover {
    text-decoration: none;
  }
`

const NewsletterButton = () => (
  <div>
    <Subtitle>
      You can get an update when my new tutorials are out by signing up the
      newsletter below.
    </Subtitle>
    <ButtonContainer>
      <ButtonText
        href="https://tinyletter.com/amanhimself"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span role="img" aria-label="letter">
          💌{' '}
        </span>
        Subscribe here
      </ButtonText>
    </ButtonContainer>
  </div>
)

export default NewsletterButton
