import { slugifyStr } from '@utils/slugify';
import Datetime from './Datetime';
import type { CollectionEntry } from 'astro:content';

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<'blog'>['data'];
  secHeading?: boolean;
}

// export default function Card({ href, frontmatter, secHeading = true }: Props) {
//   const { title, pubDatetime, modDatetime, description } = frontmatter;

//   const headerProps = {
//     style: { viewTransitionName: slugifyStr(title) },
//     className: 'text-lg font-medium decoration-dashed hover:underline'
//   };

//   return (
//     <li className="my-6">
//       <a
//         href={href}
//         className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
//       >
//         {secHeading ? (
//           <h2 {...headerProps}>{title}</h2>
//         ) : (
//           <h3 {...headerProps}>{title}</h3>
//         )}
//       </a>
//       <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
//       <p>{description}</p>
//     </li>
//   );
// }

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  // Add defensive checks to prevent toString() errors on undefined values
  if (!frontmatter || !frontmatter.title) {
    console.warn('Card component received invalid frontmatter:', frontmatter);
    return null;
  }

  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: 'text-lg font-medium decoration-dashed hover:underline'
  };

  return (
    <li className="my-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <a
          href={href}
          className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <div className="sm:ml-4 sm:shrink-0">
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        </div>
      </div>
      <p className="text-sm text-gray-500">{description || ''}</p>
    </li>
  );
}
