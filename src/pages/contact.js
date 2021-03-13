import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Layout, Now, SEO } from '../components';
import { link } from '../styles/partials';
import { config } from '../helpers';

const ContactPageWrapper = styled.div`
  ${link}
  align-self: center;
  justify-self: center;
  font-size: 1rem;
  table {
    font-size: 1.5rem;
    margin-left: 0;
  }
  td {
    padding: 0 1rem 0 0;
  }
`;

const Contact = ({ data }) => {
  const { html } = data.contact;

  return (
    <Layout>
      <Helmet title={`Contact | ${config.username}`} />
      <SEO />
      <ContactPageWrapper dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    contact: markdownRemark(
      fileAbsolutePath: { regex: "/content/pages/contact/" }
    ) {
      html
    }
  }
`;

Now.propTypes = {
  data: PropTypes.object.isRequired
};

export default Contact;
