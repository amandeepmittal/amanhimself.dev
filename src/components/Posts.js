import React from 'react';
import { Link } from 'gatsby';

import Container from './Container';
import BlogCard from './BlogCard';

// const Cell = ({ node }) => {
//   const date = new Date(node.date);
//   const oneMonthAgo = new Date();
//   oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//   let isNew = false;

//   if (date > oneMonthAgo) {
//     isNew = true;
//   }

//   const isPopular = node.categories && node.categories.includes('Popular');

//   const dateArr = node.date.split(' ');
//   dateArr.pop();
//   dateArr[0] = dateArr[0].slice(0, 3);
//   const formattedDate = dateArr.join(' ').slice(0, -1);

//   return (
//     <div className='post' key={node.id}>
//       <Link to={node.slug}>
//         <div className='post-row'>
//           <time>{formattedDate}</time>
//           <h3>{node.title}</h3>
//         </div>
//         {isNew && <div className='new-post'>New!</div>}
//         {isPopular && <div className='popular-post'>Popular</div>}
//       </Link>
//     </div>
//   );
// };

export default function Posts({ data, showYears }) {
  // const postsByYear = {};

  // data.forEach(post => {
  //   const year = post.date.split(', ')[1];

  //   postsByYear[year] = [...(postsByYear[year] || []), post];
  // });

  // const years = useMemo(() => Object.keys(postsByYear).reverse(), [
  //   postsByYear
  // ]);

  // if (showYears) {
  //   return years.map(year => (
  //     <section key={year}>
  //       <Container as='main' noMargin className='md:px-4 space-y-14'>
  //         <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
  //           <Heading size='h3' noMargin>
  //             {year}
  //           </Heading>
  //           {data.map(node => (
  //             <BlogCard key={node.id} frontMatter={node} />
  //           ))}
  //         </div>
  //       </Container>
  //     </section>
  //   ));
  // } else {
  // }
  return (
    <Container as='main' noMargin className='md:px-4 space-y-14'>
      <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
        {data.map(node => (
          <BlogCard key={node.id} frontMatter={node} />
        ))}
      </div>
    </Container>
  );
}
