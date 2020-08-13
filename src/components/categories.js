import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';

const Categories = () => {
  const {
    allMdx: { distinct }
  } = useStaticQuery(query);

  return (
    <ul className="categories">
      {distinct.map((category, index) => {
        return (
          <li key={index}>
            <Link to={`/${category}`} className="category">
              {category}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const query = graphql`
  {
    allMdx {
      totalCount
      distinct(field: frontmatter___category)
    }
  }
`;

export default Categories;
