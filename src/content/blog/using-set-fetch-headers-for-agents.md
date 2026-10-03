---
title: "How to send a real 404 to agents when a page doesn't exist"
author: Aman Mittal
pubDatetime: 2026-10-03T00:00:01Z
slug: using-set-fetch-headers-for-agents
draft: false
tags:
  - ai
  - nextjs
description: ''
---

Every documentation site has an AI agent and a human reader nowadays, where AI agents are dominating the number of requests sent to the server to fetch a docs page. Agents fetch pages with HTTP clients and either use tools like web fetch to read the context of HTML or if provided, the markdown content of that page. When a URL is missing or is referenced in a wrong way, these two readers need different responses.

For humans, you would use a 404 page with a link to homepage or a better and a traditional way to handle is to provide redirects on the client-side. Redirects can also be provided on server-side to correct the page. In both cases, a redirect dictionary is usually maintained by authors. However, an agent or a human can equally run into 404 links. In case of an agent, it cannot know a page exists and may end up reading the wrong page.

This post lists down some suggestions that I have recently come across and implemented in the Expo docs, which I work on in my day job.

## Serve Markdown to agents

The first and foremost thing is to serve the markdown content of a page to agents. I talked about some strategies in a recent blog post I wrote for Expo's blog on [12 AEO practices to make your documentation AI-ready](https://expo.dev/blog/aeo-practices-to-make-your-documentation-ai-ready). I cannot emphasize enough outside of the blog post, how important it is to serve the right format of the content to agents.

Once served, an agent can get the Markdown one of the three following ways:

```shell
curl https://docs.expo.dev/router/advanced/tabs.md
curl https://docs.expo.dev/router/advanced/tabs/index.md
curl -H 'Accept: text/markdown' https://docs.expo.dev/router/advanced/tabs/
```

All three endpoints return `200` status with `Content-Type: text/markdown; charset=utf-8` header. The first two endpoints are direct links to the markdown file, while the last one is a link to the page with a header that tells the server to return markdown content.

In this scenario, when a page is missing it will also return the correct status. A missing `.md` URL returns `404` status with `Content-Type: text/markdown; charset=utf-8` header. It does return a `200` status with an error page in the body. If you use tools like Google Search Console and Core Web Vitals, you might have an error called "Soft 404" reported for your site. This happens because when a `200` status returns an error message in the body. Agents and crawlers cannot distinguish between a soft 404 or a real page.

## Redirects are useful for humans but might confuse agents

In a typical documentation site, a worker can recover a missing URL by sending a `302` status for that page. For a person who types `/guides/advanced/tabz/` (a typo or a previously existing URL), this is useful. The person then is redirected to `/guides/advanced/tabs/`, which is the actual URL or the current URL of the page.

> **What is a "worker" here?**
>
> A worker is a small program that runs on the Cloudflare network in front of your site. Each request goes to the worker before it goes to your pages. The worker can return the page, change the response, or send a different response, such as a redirect. If you support Markdown, it serves the Markdown version of a page and handles missing URLs.

In the same scenario, an agent that fetches a missing URL, will get `302` and then a `200`. It does not see a `404` in between. Then, it will read the page that an LLM model or a system one model like Jev, might select and will use that page as a fact.

## Use `Sec-Fetch` headers to find a browser navigation

Browsers already send Fetch Metadata headers with requests. These are used to determine the context of a request. The `Sec-Fetch-Mode` header is one of the headers that can be used to determine if a request is coming from a browser navigation or not. If the value of this header is `navigate`, then it is a browser navigation. If the value is anything else, the response does not go into a page. For example, a browser sends empty for a fetch() call.

The second header `Sec-Fetch-Dest` can be used to determine the destination of a request. If the value of this header is `document`, then it is a browser navigation.

Agents usually send different values or no `Sec-Fetch-*` headers at all. If you have used [afdocs tool](https://afdocs.dev/) to check the agentic readiness, of your docs site, it sends `Sec-Fetch-Mode: cors` and no `Sec-Fetch-Dest`. The worker which is handling these requests on the server-side does not check if a request comes from an agent or not. It checks only if the request is a browser navigation, which means `Sec-Fetch-Mode: navigate` and `Sec-Fetch-Dest: document`.

You can add a check in your worker configuration or URL recovery logic to recover a missing URL only when the request has both values:

```ts
if (
  request.headers.get('Sec-Fetch-Mode') === 'navigate' &&
  request.headers.get('Sec-Fetch-Dest') === 'document'
) {
  // recover the missing URL
}
```

If one of these checks fails, the worker sends the normal 404. So for a missing URL, curl and afdocs always get the 404. Only a person in a browser gets the redirect.

## Add the headers to `Vary`

A missing URL now has two responses: a `302` for a browser navigation and a `404` for all other requests. If a cache stores the `302` and sends it to an agent, the agent gets the redirect, and the check has no effect. To prevent this, add the two headers to `Vary`. You can also send `Cache-Control: no-store`, so that no cache stores the redirect.

```ts
return new Response(null, {
  status: 302,
  headers: {
    Location: target.href,
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex',
    Vary: 'Accept, Sec-Fetch-Mode, Sec-Fetch-Dest'
  }
});
```

`Accept` is in Vary because the worker also recovers Markdown requests. A navigation to a missing `.md` URL goes to the `index.md` of the matched page.

## Use `node:http` to test the navigation case

The Expo docs repository has a test, `scripts/test-worker.ts`, that starts the worker on a computer and sends requests to it. The test replaces systemone model with a mock AI binding, so each run gives the same result. To test the redirect, the test must act like a browser and send `Sec-Fetch-Mode: navigate`.

Node `fetch` cannot send this value. Node `fetch` follows the browser Fetch API, and in that API a `fetch()` call is never a navigation. The default mode of a request is `cors`, and the `navigate` mode is not allowed:

```ts
new Request('http://localhost/', { mode: 'navigate' });
// TypeError: Request constructor: invalid request mode navigate.
```

So Node `fetch` sets `Sec-Fetch-Mode` from the request mode and replaces your value with `cors`. It does not change `Sec-Fetch-Dest`. `node:http` has no request modes, so it sends each header as you give it.

The following script shows the difference. It starts a server that returns the headers it gets, and then sends the same headers with `fetch` and with `node:http`:

```ts
import http from 'node:http';

const server = http
  .createServer((req, res) => {
    res.end(
      JSON.stringify({
        mode: req.headers['sec-fetch-mode'],
        dest: req.headers['sec-fetch-dest']
      })
    );
  })
  .listen(0, async () => {
    const url = `http://localhost:${server.address().port}/`;
    const headers = {
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Dest': 'document'
    };
    console.log('fetch    ', await (await fetch(url, { headers })).text());
    const viaHttp = await new Promise(resolve =>
      http.get(url, { headers }, res => {
        let body = '';
        res.on('data', chunk => (body += chunk));
        res.on('end', () => resolve(body));
      })
    );
    console.log('node:http', viaHttp);
    server.close();
  });
```

The output using Node 24.17.0:

```shell
fetch     {"mode":"cors","dest":"document"}
node:http {"mode":"navigate","dest":"document"}
```

A test that uses `fetch` always gets the `404`, so it can never test the redirect. To test the redirect, send the navigation requests with `node:http`. This is the helper in the Expo test:

```ts
function navigateAsync(path: string, headers: http.OutgoingHttpHeaders = {}) {
  return new Promise<http.IncomingMessage>((resolve, reject) => {
    http
        `${BASE_URL}${path}`,
        {
          headers: {
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Dest': 'document',
            ...headers
          }
        },
        response => {
          resolve(response.resume());
        }
      )
      .on('error', reject);
  });
}
```

The test calls `navigateAsync` with a missing path and checks for a `302` to the expected page. In this test, `BASE_URL` is the local address of the worker, and `NATIVE_TABS` is the page that the mock AI binding selects:

```ts
const response = await navigateAsync(path);
if (
  response.statusCode !== 302 ||
  response.headers.location !== `${BASE_URL}${NATIVE_TABS}`
) {
  throw new Error(
    `Expected recovery redirect for ${path}, got ${response.statusCode}`
  );
}
```

Make sure that the test can fail. In `navigateAsync`, change `navigate` to `cors` and run the test again. The test must fail with `Expected recovery redirect for /router/basics/tabs/, got 404`. If the test passes, it does not check the redirect.

## Check the result in production

You can use `curl` with and without navigation headers and pass a missing/non-existing URL and use a real page as a control:

```shell
curl -s -o /dev/null -w '%{http_code}\n' https://docs.expo.dev/router/advanced/tabz/
curl -s -D - -o /dev/null \
    -H 'Sec-Fetch-Mode: navigate' -H 'Sec-Fetch-Dest: document' \
    https://docs.expo.dev/router/advanced/tabz/
```

Here's an example of the output from Expo docs:

| Request                                                    | Status              | Location                       |
| ---------------------------------------------------------- | ------------------- | ------------------------------ |
| /router/advanced/tabz/, no Sec-Fetch headers               | 404                 |
| /router/advanced/tabz/, Sec-Fetch-Mode: cors               | 404                 |
| /router/advanced/tabz/, navigation headers                 | 302                 | /router/advanced/tabs/         |
| /router/basics/tabs.md, no Sec-Fetch headers               | 404 (text/markdown) |
| /router/basics/tabz-nonexistent-xyz.md, navigation headers | 302                 | /router/advanced/tabs/index.md |
| /router/advanced/tabs/ (control)                           | 200                 |

You can run the afdocs soft-404 check using the command below:

```shell
npx afdocs@0.22.2 check https://docs.expo.dev -c http-status-codes -v

# Output
url-stability
  ✓ http-status-codes: All 50 sampled pages return proper error codes for bad URLs
```
