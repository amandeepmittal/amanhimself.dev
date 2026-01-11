export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string | null;
  updated_at: string;
  created_at: string;
}

function withHttps(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export function getRepoHomepageUrl(repo: Pick<GithubRepo, 'homepage'>): string {
  const homepage = repo.homepage?.trim();
  if (!homepage) return '';
  return withHttps(homepage);
}

export type FetchGithubReposOptions = {
  username: string;
  token?: string;
  includeForks?: boolean;
  includeArchived?: boolean;
  maxPages?: number;
};

export async function fetchGithubRepos({
  username,
  token,
  includeForks = false,
  includeArchived = false,
  maxPages = 3
}: FetchGithubReposOptions): Promise<GithubRepo[]> {
  const headers = new Headers({
    Accept: 'application/vnd.github+json'
  });
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const repos: GithubRepo[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const url = new URL(`https://api.github.com/users/${username}/repos`);
    url.searchParams.set('per_page', '100');
    url.searchParams.set('sort', 'pushed');
    url.searchParams.set('page', String(page));

    // Avoid hard-failing local dev if GitHub is unreachable/rate-limited.
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
      const msg = await response.text().catch(() => '');
      throw new Error(
        `GitHub API request failed (${response.status} ${response.statusText})${
          msg ? `: ${msg}` : ''
        }`
      );
    }

    const pageRepos = (await response.json()) as GithubRepo[];
    repos.push(...pageRepos);

    if (pageRepos.length < 100) break;
  }

  return repos
    .filter(repo => (includeForks ? true : !repo.fork))
    .filter(repo => (includeArchived ? true : !repo.archived));
}

