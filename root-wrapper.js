import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  Headings,
  Code,
  Blockquote,
  PrismWrapper,
  CustomUl
} from './src/components/mdx-components';

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  inlineCode: Code,
  blockquote: Blockquote,
  pre: PrismWrapper,
  ul: CustomUl
};

export const wrapMDX = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
