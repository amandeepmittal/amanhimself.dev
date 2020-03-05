import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Grid from '../components/Grid'
// import SEO from '../components/seo'

const TutorialsPage = ({ data }) => {
  const allTutorials = data.allMdx.edges

  const emptyQuery = ''
  const [state, setState] = React.useState({
    filteredData: [],
    query: emptyQuery
  })

  // credit: https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial#final-code
  const handleInputChange = event => {
    const query = event.target.value

    // this is how we get all of our tutorials
    const tutorials = data.allMdx.edges || []
    // return all filtered tutorials
    const filteredData = tutorials.filter(tutorial => {
      // destructure data from tutorial frontmatter
      const { title, tags, lead } = tutorial.node.frontmatter

      return (
        // standardize data with .toLowerCase()
        // return true if the description, title or tags
        // contains the query string

        lead.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        tags
          .join('') // convert tags from an array to string
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    })
    // update state according to the latest query and results
    setState({
      query, // with current query string from the `Input` event
      filteredData // with filtered data from tutorials.filter(tutorial => (//filteredData)) above
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const tutorials = hasSearchResults ? filteredData : allTutorials

  return (
    <Layout>
      {/* <SEO title="Blog" /> */}
      <Header>Articles</Header>
      <p style={{ fontSize: '18px' }}>
        A list of all posts I have written on Nodejs, Reactjs, GraphQL, React
        Native and other libraries or frameworks.
      </p>
      <SearchWrapper>
        <Input
          type="text"
          aria-label="Search"
          placeholder="Type to filter tutorials..."
          onChange={handleInputChange}
        />
        <SearchTotal>{tutorials.length}</SearchTotal>
      </SearchWrapper>

      {tutorials.map(({ node: tutorial }) => (
        <Grid>
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
        </Grid>
      ))}
    </Layout>
  )
}

export default TutorialsPage

const Header = styled.h1`
  margin: auto;
  max-width: ${props => props.theme.screen.sm};
  padding-top: 5px;
  position: relative;
  text-align: center;
  opacity: 0;
  font-weight: 600;
  font-size: 32px;
  letter-spacing: -2px;
  margin-bottom: 20px;
  animation: HeroAnimation 1s 0.1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  @media (max-width: ${props => props.theme.screen.sm}) {
    font-size: 36px;
    letter-spacing: -2px;
  }
`

const Input = styled.input`
  ::placeholder {
    color: #dcdcdc;
    /* opacity: 0.5; */
  }
`

const SearchWrapper = styled.div`
  margin: auto;
  max-width: ${props => props.theme.screen.sm};
  position: relative;
  text-align: center;
  padding: 20px 0;
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
  opacity: 0;
  animation: HeroAnimation 2s 0.8s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  @media (max-width: ${props => props.theme.screen.md}) {
    padding: 10px 20px;
  }
  @media (max-width: ${props => props.theme.screen.xs}) {
    grid-template-columns: 1fr;
  }
  @keyframes HeroAnimation {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    h1 {
      font-size: 36px;
      letter-spacing: -2px;
    }
    p {
      font-size: 22px;
    }
  }
`

const SearchTotal = styled.div`
  border-radius: 10px;
  padding: 18px;
  color: white;
  font-weight: 600;
  background: ${props => props.theme.color.primary.purple};
  box-shadow: rgba(198, 208, 235, 0.5) 0px 10px 20px;
  .dark & {
    background: ${props => props.theme.color.primary.blue};
    color: ${props => props.theme.color.dark.accent100};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 30px 60px;
  }
`

export const pageQuery = graphql`
  query WritingPage {
    allMdx(
      sort: { fields: frontmatter___tutorialID, order: DESC }
      filter: { fileAbsolutePath: { regex: "//tutorials//" } }
      limit: 1000
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            slug
            tags
            lead
            tutorialID
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
  }
`
