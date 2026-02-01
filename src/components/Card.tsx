import { slugifyStr } from '@utils/slugify';
import Datetime from './Datetime';
import type { CollectionEntry } from 'astro:content';

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<'blog'>['data'];
  secHeading?: boolean;
  showReadingTime?: boolean;
}

// export default function Card({ href, frontmatter, secHeading = true }: Props) {
//   const { title, pubDatetime, modDatetime, description } = frontmatter;

//   const headerProps = {
//     style: { viewTransitionName: slugifyStr(title) },
//     className: 'text-lg font-medium decoration-dashed hover:underline'
//   };

//   return (
//     <li className="my-8">
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

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  showReadingTime = false
}: Props) {
  // Add defensive checks to prevent toString() errors on undefined values
  if (!frontmatter || !frontmatter.title) {
    console.warn('Card component received invalid frontmatter:', frontmatter);
    return null;
  }

  const { title, pubDatetime, modDatetime, description, readingTime } =
    frontmatter;
  const showDraftBadge = import.meta.env.DEV && Boolean(frontmatter.draft);

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: 'text-lg font-medium decoration-dashed hover:underline'
  };

  return (
    <li className="my-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
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
          {showDraftBadge && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
              Draft
            </span>
          )}
        </div>
        <div className="sm:ml-4 sm:shrink-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Datetime
              pubDatetime={pubDatetime}
              modDatetime={modDatetime}
              size="xs"
              className="text-skin-base opacity-60"
            />
            {showReadingTime && readingTime && (
              <>
                <span
                  aria-hidden="true"
                  className="text-xs text-skin-base opacity-60"
                >
                  &bull;
                </span>
                <span className="text-xs italic text-skin-base opacity-60">
                  {readingTime}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">{description || ''}</p>
    </li>
  );
}
