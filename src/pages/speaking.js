import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Layout, Now, SEO } from '../components';
import { link } from '../styles/partials';
import { config } from '../helpers';

const PageWrapper = styled.div`
  ${link}
  /* align-self: center; */
  justify-self: center;
  font-size: 1.25rem;
  table {
    font-size: 1.5rem;
    margin-left: 0;
  }
  td {
    padding: 0 1rem 0 0;
  }
`;

const Speaking = ({ data }) => {
  const { html } = data.contact;

  return (
    <Layout>
      <Helmet title={`Speaking | ${config.username}`} />
      <SEO />
      <PageWrapper dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    contact: markdownRemark(
      fileAbsolutePath: { regex: "/content/pages/speaking/" }
    ) {
      html
    }
  }
`;

Now.propTypes = {
  data: PropTypes.object.isRequired
};

export default Speaking;
