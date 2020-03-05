import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
// import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    {/* <SEO title="404: Not found" /> */}
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Consider returning to back to the Home page.</p>
    <Link to="/" aria-label="go to home page">
      Go back to the home page
    </Link>
  </Layout>
)

export default NotFoundPage
