import { slugifyStr } from '@utils/slugify';
import { LOCALE } from '@config';
import type { PostFrontmatter } from '../types';

export interface Props {
  href?: string;
  frontmatter: PostFrontmatter;
  secHeading?: boolean;
}

function formatListDate(
  pubDatetime: string | Date,
  modDatetime?: string | Date | null
) {
  const source =
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime;
  const date = new Date(source);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(LOCALE.langTag, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  if (!frontmatter || !frontmatter.title) {
    console.warn('Card component received invalid frontmatter:', frontmatter);
    return null;
  }

  const { title, pubDatetime, modDatetime, externalUrl, externalSource } =
    frontmatter;
  const showDraftBadge = import.meta.env.DEV && Boolean(frontmatter.draft);
  const formattedDate = formatListDate(pubDatetime, modDatetime);
  const isoDate = new Date(pubDatetime).toISOString();

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      'text-base font-medium text-skin-base transition-colors group-hover:text-skin-accent'
  };

  return (
    <li className="border-b border-dashed border-skin-line">
      <a
        href={externalUrl ?? href}
        target={externalUrl ? '_blank' : undefined}
        rel={externalUrl ? 'noopener noreferrer' : undefined}
        className="group grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-3 sm:grid-cols-[7rem_1fr] sm:gap-6"
      >
        <time
          dateTime={isoDate}
          className="whitespace-nowrap font-mono text-xs tabular-nums text-skin-base opacity-50"
        >
          {formattedDate}
        </time>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          {externalUrl && (
            <span className="whitespace-nowrap rounded bg-skin-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-skin-base opacity-60">
              {externalSource}
              <span aria-hidden="true"> ↗</span>
            </span>
          )}
          {showDraftBadge && (
            <span className="rounded bg-skin-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-skin-accent">
              Draft
            </span>
          )}
        </div>
      </a>
    </li>
  );
}
