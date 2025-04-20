---
title: Avoiding version conflicts with Vale and GitHub Actions
author: Aman Mittal
pubDatetime: 2025-04-20T00:00:01Z
slug: vale-and-github-actions
featured: false
draft: false
tags:
  - docs-as-code
  - tech-writing
description: ''
---

While implementing [Vale](https://vale.sh/) with Reviewdog and GitHub Actions is straightforward in theory, I have encountered a few issues that can sometimes break your CI. Both times, the solution was explicitly defining the Vale CLI version in the CI pipeline.

## Importance of version pinning in CI pipelines

At my day job, we use the prose linting process through Vale and run it on the documentation pull requests and deployment. One of the frustrating things that can happen is the inconsistent results between local and CI (GitHub Actions) due to version differences.

As an example, here is what the complete job looks like:

```yaml
name: Docs Website PR - Content Linting

defaults:
  run:
    shell: bash
    working-directory: docs

jobs:
  docs-pr:
    runs-on: ubuntu-22.04
    steps:
      - name: 💬 Lint Docs website content
        uses: errata-ai/vale-action@reviewdog
        with:
          version: 3.11.1 # <--- Pinned version
          reporter: github-pr-check
          files: 'docs/pages'
          vale_flags: '--config=./docs/.vale.ini'
          fail_on_error: true
```

Under `Lint Docs website content`, the `version` explicitly allows for setting a pinned version for this workflow. By default, the `version` is always used as the `latest`, but specifying the Vale CLI version helps avoid inconsistencies between the local version used and the CI.

**Another critical point** that it helps with is to avoid breaking changes. Sometimes, when a breaking change occurs on the latest version of the Vale CLI, it might break your CI. One recent breaking change was the feature introduced in Vale CLI version `3.11.0` to lint [Front Matter](https://vale.sh/docs/formats/front-matter) fields.

## How version differences manifest

The symptoms of version inconsistency are often subtle and, at times, dependent on custom rules you have set in your configuration rules. Newer Vale CLI versions might interpret rules differently and starts flagging the previously acceptable content.

Continuing the real-world example I shared in the previous section, the introduction of version `3.11.0` broke stuff in the following way:

```shell
E100 [pages/some-page.mdx] Runtime error

'Apple Developer Program roles and permissions' not found

Execution stopped with code 1.
```

It took me a while to go back and forth between the version I was using locally and the version used on the CI pipeline to identify what broke and why. Luckily, the maintainer had already deployed the fix in Vale CLI.

## How to use this version locally

There are two ways you can use Vale's CLI version locally. The easiest and lone-wolf approach is to install it in your development environment using one of the [available methods described in Vale's documentation](https://vale.sh/docs/install).

If you are working in a team environment, I recommend using something like [`@vvago/vale`](https://www.npmjs.com/package/@vvago/vale), which can download Vale binary and allow you to run it. In my case, it's part of our lint scripts inside the `package.json` file:

```json
{
  "scripts": {
    "lint-prose": "yarn vale ."
  }
}
```

## Verifying your pinned version

If you use the local version as a part of your docs app, you can easily verify it by installing a specific version. The dependency installed will be listed inside `package.json`:

```json
{
  "devDependencies": {
    "@vvago/vale": "3.11.1"
  }
}
```

On CI, after you've pinned the version in the workflow job, you can easily verify the output when that workflow runs by checking the installed Vale CLI version:

<img src="/images/github-actions-vale.png" alt="GitHub Actions Vale job log" class="mx-auto"/>

## Wrapping up

Version consistency might seem like a minor detail, but it can save hours of debugging cryptic CI failures. By pinning the Vale CLI version in GitHub Actions and ensuring it matches the local environment, you will have a much smoother workflow.
