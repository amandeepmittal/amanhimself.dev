import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Heading from '../components/Heading';
import Container from '../components/Container';
import { BlogConfig, SavedTweets } from '../../blog-config';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TWBlogFooterBanner from '../components/TWBlogFooterBanner';
import Manning from '../../static/manning.png';
import Jscrambler from '../../static/jscrambler.png';

const Sponsor = () => {
  return (
    <>
      <Layout>
        <Helmet
          title={`Sponsor ${BlogConfig.username}`}
          links={[
            {
              rel: 'canonical',
              href: BlogConfig.siteUrl
            }
          ]}
        />
        <SEO />
        <Container as='main' noMargin className='md:px-4 space-y-14'>
          <Hero />
          <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
            <Heading size='h1'>
              Sponsor amanhimself.dev and reach thousands of developers
            </Heading>
            <p className='text-lg text-gray-600 my-4'>
              Since late 2016 I have writing and publishing articles and
              tutorials on various platform like Medium, Dev.to, Hashnode and so
              on. Only in 2019 after a friend's friendly suggestion I realize
              the importance of having a self-hosted blog. In the year 2020, I
              did not give emphasis much on Medium (which has been my primary
              publishing platform) and concentrated more on maintaining and
              writing more on this blog, even though I did reach an exploding{' '}
              <Link
                className='underline text-purple-600 hover:no-underline'
                to={SavedTweets.twoMillionViews}
              >
                2 Million+ views
              </Link>{' '}
              on Medium.
            </p>
            <p className='text-lg text-gray-600 my-4'>
              Since then <strong>amanhimself.dev</strong> has grown in{' '}
              <Link
                className='underline text-purple-600 hover:no-underline'
                to={`https://amanhimself.dev/blog/year-rewind-2020/`}
              >
                readership
              </Link>
              . Every month <strong>thousands of developers</strong> find their
              way to over <strong>100+ blog posts</strong>. My{' '}
              <Link
                className='underline text-purple-600 hover:no-underline'
                to={BlogConfig.newsletter}
              >
                newsletter
              </Link>{' '}
              is distributed to over <strong>1000+ devs</strong> every week.
              Every post is announced on my{' '}
              <Link
                className='underline text-purple-600 hover:no-underline'
                to={BlogConfig.twitter}
              >
                Twitter
              </Link>{' '}
              to over <strong>7500+ </strong> followers and included in the
              weekly newsletter. This results in <strong>6000+</strong>{' '}
              pageviews every month.
            </p>
            <p className='text-lg text-gray-600 my-4'>
              In these exciting times, if you decide to sponsor, I run a single
              advertisement every week/month that is visible both on this blog
              and the newsletter. With an audience interested in web dev,
              JavaScript, React, Node.js and React Native developers, there is a
              great opportunity to promote your product or service related to
              this audience.
            </p>
            <a
              href='mailto:amanmittal.work@gmail.com'
              class='bg-purple-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-600 mr-6'
            >
              BOOK NOW
            </a>
            <Heading size='h4'>Example of an advertisement</Heading>
            <TWBlogFooterBanner />
            <Heading size='h2'>Sponsorship Packages</Heading>
            <p className='text-lg text-gray-600 my-4'>
              The following sponsor packages are available for your product or
              service.
            </p>
            <Heading size='h4'>1 week of sponsorship – $59</Heading>
            <p className='text-lg text-gray-600 my-4'>
              It includes:
              <ul class='list-inside list-disc'>
                <li className='text-gray-600 my-4'>
                  Your advertisement visible for one week
                </li>
                <li className='text-gray-600 my-4'>
                  An advertisement that appears on both in the newsletter and
                  all 100+ blog posts for that week.
                </li>
              </ul>
            </p>
            <Heading size='h4'>4 weeks of sponsorship – $199</Heading>
            <p className='text-lg text-gray-600 my-4'>
              It includes:
              <ul class='list-inside list-disc'>
                <li className='text-gray-600 my-4'>
                  Your advertisement visible for one month (4 weeks)
                </li>
                <li className='text-gray-600 my-4'>
                  An advertisement that appears on both in the newsletter and
                  all 100+ blog posts for that week.
                </li>
              </ul>
            </p>
            <Heading size='h2'>Request a custom package</Heading>
            <p className='text-lg text-gray-600 my-4'>
              Contact me at{' '}
              <a href='mailto:amanmittal.work@gmail.com' className='underline'>
                amanmittal.work@gmail.com
              </a>{' '}
              for more info.
            </p>
            <Heading size='h4'>Previous sponsorship partners include</Heading>
            <div class='flex items-center justify-items-center my-4'>
              <div className='px-2'>
                <img src={Manning} alt='manning' width='75%' />
              </div>
              <div className='px-2 self-center'>
                <img src={Jscrambler} alt='jscrambler' width='25%' />
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Sponsor;
