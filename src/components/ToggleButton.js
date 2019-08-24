import React, { Component } from 'react'
import { css } from '@emotion/core'
import { REACT_NATIVE } from '../data/reactnative'
import { MERN_STACK } from '../data/mern'
import { GATSBY_JS } from '../data/gatsbyjs'
import { ANGULAR } from '../data/angular'
import { REACT_JS } from '../data/reactjs'
import { NODE_JS } from '../data/nodejs'
import { MISC } from '../data/misc'
import { IONIC } from '../data/ionic'

class ToggleButton extends Component {
  state = {
    reactNativeButton: false,
    nodejsButton: false,
    mernButton: false,
    reactButton: false,
    angularButton: false,
    miscButton: false,
    gatsbyButton: false,
    ionicButton: false
  }

  toggleRN = () => {
    this.setState({
      reactNativeButton: true,
      nodejsButton: false,
      mernButton: false,
      reactButton: false,
      angularButton: false,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: false
    })
  }

  toggleNode = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: true,
      mernButton: false,
      reactButton: false,
      angularButton: false,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: false
    })
  }

  toggleMern = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: true,
      reactButton: false,
      angularButton: false,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: false
    })
  }

  toggleReact = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: false,
      reactButton: true,
      angularButton: false,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: false
    })
  }

  toggleGatsby = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: false,
      reactButton: false,
      angularButton: false,
      miscButton: false,
      gatsbyButton: true,
      ionicButton: false
    })
  }

  toggleAngular = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: false,
      reactButton: false,
      angularButton: true,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: false
    })
  }

  toggleMisc = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: false,
      reactButton: false,
      angularButton: false,
      miscButton: true,
      gatsbyButton: false,
      ionicButton: false
    })
  }
  toggleIonic = () => {
    this.setState({
      reactNativeButton: false,
      nodejsButton: false,
      mernButton: false,
      reactButton: false,
      angularButton: false,
      miscButton: false,
      gatsbyButton: false,
      ionicButton: true
    })
  }

  render() {
    return (
      <div>
        <ul
          css={css`
            list-style-type: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
          `}
        >
          <li
            onClick={this.toggleRN}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #457fca 0%, #5691c8 51%);
            `}
          >
            React Native&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {REACT_NATIVE.length}
            </span>
          </li>

          <li
            onClick={this.toggleNode}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #0cebeb 0%, #20e3b2 51%);
            `}
          >
            Nodejs&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {NODE_JS.length}
            </span>
          </li>
          <li
            onClick={this.toggleReact}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #1fa2ff 0%, #12d8fa 51%);
            `}
          >
            Reactjs&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {REACT_JS.length}
            </span>
          </li>
          <li
            onClick={this.toggleGatsby}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #a770ef 0%, #cf8bf3 51%);
            `}
          >
            Gatsbyjs&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {GATSBY_JS.length}
            </span>
          </li>
          <li
            onClick={this.toggleMern}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #614385 0%, #516395 51%);
            `}
          >
            MERN Stack&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {MERN_STACK.length}
            </span>
          </li>
          <li
            onClick={this.toggleAngular}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #ff512f 0%, #dd2476 51%);
            `}
          >
            Angular&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {ANGULAR.length}
            </span>
          </li>
          <li
            onClick={this.toggleMisc}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #d7dde8 0%, #757f9a 51%);
            `}
          >
            Misc&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {MISC.length}
            </span>
          </li>
          <li
            onClick={this.toggleIonic}
            css={css`
              cursor: pointer;

              margin-right: 15px;
              width: 8.5rem;
              height: 1.5rem;
              text-align: center;
              color: white;
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              border: none;
              border-radius: 5rem;
              background: linear-gradient(to right, #56ccf2 0%, #2f80ed 51%);
            `}
          >
            Ionic&nbsp;
            <span
              css={css`
                font-weight: bold;
                border: none;
                padding: 2px;
                border-radius: 5rem;
              `}
            >
              {IONIC.length}
            </span>
          </li>
        </ul>

        <div
          css={css`
            p {
              font-size: 16px;
            }
          `}
        >
          {this.state.reactNativeButton ? (
            <div>
              <h3>
                React Naitve <span role="img">⚛️ 📱</span>
              </h3>

              {REACT_NATIVE.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.mernButton ? (
            <div>
              <h3>MERN Stack</h3>
              {MERN_STACK.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.gatsbyButton ? (
            <div>
              <h3>Gatsbyjs</h3>
              {GATSBY_JS.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.angularButton ? (
            <div>
              <h3>Angular</h3>
              {ANGULAR.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.reactButton ? (
            <div>
              <h3>Reactjs</h3>
              {REACT_JS.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.nodejsButton ? (
            <div>
              <h3>Nodejs</h3>
              {NODE_JS.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.miscButton ? (
            <div>
              <h3>Miscellaneous</h3>
              {MISC.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
          {this.state.ionicButton ? (
            <div>
              <h3>Ionic</h3>
              {IONIC.map(item => (
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  published at {item.publishedAt}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default ToggleButton
