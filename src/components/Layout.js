import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Global from '../styles/global'
import theme from '../styles/theme'
import Wrapper from './wrapper'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
