import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Appreciation from '../components/Appreciation'

const Testimonials = () => {
  return (
    <Layout>
      <h2>Heart what people say about me and my work 💙💙💙</h2>
      <Appreciation />
    </Layout>
  )
}

export default Testimonials
