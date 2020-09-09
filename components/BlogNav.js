// import parseISO from 'date-fns/parseISO';
// import Link from 'next/link';
// import { withRouter } from 'next/router';

// import { frontMatter as allPosts } from '../pages/blog/**/*.mdx';

// import useKeyPress from './hooks/useKeyPress';

// // Styles
// // import styles from './blog-nav.module.css';

// const posts = allPosts
//   // The `sort` method can be conveniently used with function expressions:
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//   .sort((a, b) => Number(parseISO(b.date)) - Number(parseISO(a.date)));

// const BlogNav = ({ router }) => {
//   console.log(router);
//   const postIndex = posts.findIndex(post => {
//     post.id === post.__resourcePath.replace('blog/', '').replace('.mdx', '');
//   });

//   const nextPost = posts[postIndex - 1];
//   const prevPost = posts[postIndex + 1];

//   useKeyPress('ArrowLeft', () => {
//     if (postIndex > 0) {
//       router.push(`/blog/${nextPost.id}`);
//     }
//   });

//   useKeyPress('ArrowRight', () => {
//     if (postIndex < posts.length - 1) {
//       router.push(`/blog/${prevPost.id}`);
//     }
//   });

//   return (
//     <div>
//       {postIndex > 0 ? (
//         <Link href={`/blog/${nextPost.id}`}>
//           <a>&larr; {nextPost.title}</a>
//         </Link>
//       ) : null}{' '}
//       {postIndex < posts.length - 1 ? (
//         <Link href={`/blog/${prevPost.id}`}>
//           <a>{prevPost.title} &rarr;</a>
//         </Link>
//       ) : null}
//     </div>
//   );
// };

// export default withRouter(BlogNav);
