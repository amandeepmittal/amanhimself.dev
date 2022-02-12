import type { NextPage } from 'next';

import {
  Hero,
  ProjectsSectionList,
  CountriesVisitedSection,
  LatestPostsSection,
  DocumentHead
} from '../src/components';
import { ProjectsList } from '../src/data';
import { getAllBlogPosts } from './blog';

export const getRecentBlogPosts = async () => {
  const posts = await getAllBlogPosts();

  const recentPosts = posts
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10);

  return recentPosts;
};

export const getStaticProps = async () => {
  const posts = await getRecentBlogPosts();

  const props = {
    posts
  };

  return {
    props
  };
};

const HomePage: NextPage = ({ posts }) => {
  return (
    <>
      <DocumentHead pageTitle="Aman Mittal – Software Developer, Tech Writer." />
      <Hero />
      {/* Latest Blog Posts */}
      <LatestPostsSection posts={posts} />
      {/* Open Source Projects I've Worked on */}
      <ProjectsSectionList projects={ProjectsList} />
      {/* Countries I've Visited */}
      <CountriesVisitedSection />
    </>
  );
};

export default HomePage;
