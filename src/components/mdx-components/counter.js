import React from "react"
import styled from "styled-components"
const Counter = () => {
  const [count, setCount] = React.useState(0)
  return (
    <Wrapper>
      <h1>counter</h1>
      <span id="value">{count}</span>
      <div className="btn-container">
        <button className="btn dec-btn" onClick={() => setCount(count - 1)}>
          decrease
        </button>
        <button className="btn reset-btn" onClick={() => setCount(0)}>
          reset
        </button>
        <button className="btn inc-btn" onClick={() => setCount(count + 1)}>
          increase
        </button>
      </div>
    </Wrapper>
  )
}

// Styling Only

const Wrapper = styled.div`
  max-width: 500px;
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  background: var(--clr-grey-10);
  text-align: center;
  #value {
    font-size: 6rem;
    font-weight: bold;
  }
  .btn {
    margin: 0.5rem;
  }
  .dec-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
  }
  .dec-btn:hover {
    background: var(--clr-red-light);
    color: var(--clr-red-dark);
  }
  .inc-btn {
    background: var(--clr-green-dark);
    color: var(--clr-white);
  }
  .inc-btn:hover {
    background: var(--clr-green-light);
    color: var(--clr-green-dark);
  }
  .reset-btn {
    background: var(--clr-black);
    color: var(--clr-white);
  }
  .reset-btn:hover {
    background: var(--clr-grey-5);
    color: var(--clr-white);
  }
`

export default Counter
