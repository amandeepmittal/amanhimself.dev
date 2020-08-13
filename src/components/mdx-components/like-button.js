import React from "react"
import styled from "styled-components"
import { AiOutlineLike } from "react-icons/ai"
const LikeButton = () => {
  const [value, setValue] = React.useState(0)
  return (
    <Wrapper>
      <div>
        <button onClick={() => setValue(value + 1)}>
          <AiOutlineLike />
        </button>
        <p>
          Liked the post?
          <br />
          Click thumbs up few times
        </p>
      </div>
      <span>+{value}</span>
    </Wrapper>
  )
}

// Styling Only

const Wrapper = styled.div`
  margin: 2rem 0;
  div {
    display: flex;
    align-items: center;
  }
  button {
    font-size: 3.5rem;
    background: transparent;
    border: transparent;
    margin-right: 1rem;
    cursor: pointer;
    color: var(--clr-primary-5);
  }
  p {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
  span {
    font-size: 2rem;
    color: var(--clr-primary-5);
    font-weight: 700;
  }
`
export default LikeButton
