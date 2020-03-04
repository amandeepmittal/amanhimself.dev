import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/card'
import Grid from '../components/grid'
import HeaderIntro from '../components/headerIntro'
import { HeaderWrapper, HeaderGroup } from '../components/header'
import AboutMe from '../components/aboutMe'
import WorkHistory from '../components/workHistory'
import Newsletter from '../components/newsletter'
import TechSkills from '../components/skills'
import OpenSource from '../components/openSource'
import Toolset from '../components/toolset'
import Collaboration from '../components/collaboration'
import Travel from '../components/travel'
import Interviews from '../components/interviews'

const Icon = styled.div`
  width: 60px;
  margin: auto;
  margin-bottom: 25px;
  animation: HeroAnimation 3s 0.8s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  opacity: 0;
  :hover {
    filter: brightness(1.1) saturate(110%);
  }
`

const TitlePadding = styled.div`
  padding: 5px;
`
const TitleWrapper = styled.div`
  max-width: ${props => props.theme.screen.sm};
  margin: auto;
  h3 {
    display: flex;
    align-items: center;
    border-bottom: 0;
    padding-bottom: 0;
    line-height: 0;
  }
  a {
    margin: 0 10px;
  }
  button {
    background: ${props => props.theme.color.primary.purple};
    display: inline-block;
    padding: 6px 20px;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: white;
    opacity: 0.9;
    .dark & {
      background: ${props => props.theme.color.primary.purple};
      color: ${props => props.theme.color.dark.accent100};
    }
  }
  button:hover {
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    opacity: 1;
  }
  @media (max-width: 680px) {
    h2 {
      font-size: 1.3rem;
    }
  }
`

const IntroHeader = () => (
  <HeaderWrapper>
    <HeaderGroup>
      <HeaderIntro />
    </HeaderGroup>
  </HeaderWrapper>
)

const IndexPage = ({ data }) => {
  const { edges: tutorials } = data.allMdx
  return (
    <Layout>
      {/* <SEO title="Home" /> */}
      <IntroHeader />
      <TitlePadding>
        <TitleWrapper>
          <h3>
            Latest Tutorials{' '}
            <Link to="/tutorials">
              <button>View All</button>
            </Link>
          </h3>
        </TitleWrapper>
      </TitlePadding>
      <Grid>
        {tutorials.map(({ node: tutorial }) => (
          <Link
            key={tutorial.id}
            to={`/tutorials/${tutorial.frontmatter.slug}`}
          >
            <Card
              tutorialIcon={tutorial.frontmatter.icon.sharp.fluid}
              tutorialTags={tutorial.frontmatter.tags}
              tutorialTitle={tutorial.frontmatter.title}
            />
          </Link>
        ))}
      </Grid>
      <AboutMe />
      <Newsletter />
      <TechSkills />
      <WorkHistory />
      <OpenSource />
      <Toolset />
      <Interviews />
      <Travel />
      <Collaboration />
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPage {
    allMdx(
      sort: { fields: frontmatter___tutorialID, order: DESC }
      filter: { fileAbsolutePath: { regex: "//tutorials//" } }
      limit: 5
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            slug
            tags
            tutorialID
            lead
            image {
              sharp: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            icon {
              sharp: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    featuredPost: allMdx(
      sort: { fields: frontmatter___tutorialID, order: DESC }
      filter: { fileAbsolutePath: { regex: "//tutorials//" } }
      limit: 1
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            slug
            tags
            tutorialID
            lead

            image {
              sharp: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            icon {
              sharp: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    placeholderImage2: file(relativePath: { eq: "lauro.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
