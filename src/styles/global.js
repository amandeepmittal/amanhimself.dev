import { createGlobalStyle } from 'styled-components'

const normalize = `
  /*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}:root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}hr{height:0}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{padding:0}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}
`

const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    font-family: ${props => props.theme.font.primary};
    background: ${props => props.theme.color.light.accent100};
    
  }
   img {
    border-radius: 10px;
  }
  .gatsby-resp-image-wrapper {
    border-radius: 10px;
  }
  strong {
    font-weight: bold;
    color: ${props => props.theme.color.dark.accent100};
  }
  a {
    color:${props => props.theme.color.primary.purple};
    text-decoration: none;
    font-weight: 700;
  }
  a:hover {
    text-decoration: none;
  }
  h1, h2, h3 {
    font-weight: bold;
  }
  h1 {
    ${props => props.theme.font_size.xlarge};
  }
  h2 {
    ${props => props.theme.font_size.larger};
  }
  h3 {
    ${props => props.theme.font_size.large};
  }
  p {
    ${props => props.theme.font_size.small};
    color: ${props => props.theme.color.dark.accent200};
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    h1 {
      ${props => props.theme.font_size.larger};
    }
    h2 {
      ${props => props.theme.font_size.large};
    }
    h3 {
      ${props => props.theme.font_size.regular};
    }
  }
  button {
    border: none;
    background: none;
    outline: none;
    padding: 0;
    cursor: pointer;
  }
  input {
    width: 100%;
    height: 56px;
    position: relative;
    padding: 0px 16px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background:${props => props.theme.color.light.accent100};
    color: ${props => props.theme.color.dark.accent100};
    outline: none;
    -webkit-appearance: none;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(198,208,235);
    box-shadow: rgba(198,208,235,0.5) 0px 10px 20px;
  }
  input:focus {
    border-color: ${props => props.theme.color.primary.purple};
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${props => props.theme.color.dark.accent300};
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${props => props.theme.color.dark.accent300};
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: ${props => props.theme.color.dark.accent300};
  }
  :-moz-placeholder { /* Firefox 18- */
    color: ${props => props.theme.color.dark.accent300};
  }
 #gatsby-plugin-page-progress {
    background-image: linear-gradient(90deg, #4e01ff 40%, #0055ff 50%, #60d9fa 100%);
 }
  .anchor {
    padding-right: 10px;
    margin-left: -30px;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;
  }
  @media (max-width: 620px) {
    .anchor {
      padding-right: 2px;
      margin-left: -15px;
    }
  }
  h1:hover .anchor {
    opacity: 1;
  }
  h2:hover .anchor {
    opacity: 1;
  }
  h3:hover .anchor {
    opacity: 1;
  }
  h4:hover .anchor {
    opacity: 1;
  }
  h5:hover .anchor {
    opacity: 1;
  }
  h6:hover .anchor {
    opacity: 1;
  }
  hr {
    height: 0;
    margin: 4rem 0;
    opacity: .2;
  }
  :target:before {
    content:"";
    display:block;
    height:60px; /* fixed header height*/
    margin:-40px 0 0; /* negative fixed header height */
  }
  ul {
    ${props => props.theme.font_size.small};
    line-height: 1em;
  }
  li {
    ${props => props.theme.font_size.small};
    line-height: 1em;
  }
  .dark {
    background: #1d1e4a;
    color: ${props => props.theme.color.light.accent100};
    p {
      color: ${props => props.theme.color.light.accent300};
    }
    strong {
      font-weight: bold;
      color: ${props => props.theme.color.light.accent100};
    }
    svg path {
      fill: #1d1e4a;
    }
    .anchor svg path {
      fill: ${props => props.theme.color.primary.blue};
    }
    pre {
      background: ${props => props.theme.color.dark.accent200} !important;
      border-color: rgba(255, 255, 255, 0.2) !important;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px !important;
      border-radius: 10px;
    }
    input {
      background:${props => props.theme.color.dark.accent200};
      color: ${props => props.theme.color.light.accent100};
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: rgba(0, 0, 0, 0.5) 0px 30px 60px;
    }
    input:focus {
      border-color: ${props => props.theme.color.primary.blue};
      transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  }
`

export default GlobalStyles
