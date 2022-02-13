---
title: 'Set up a Next.js project with ESLint, Prettier, Husky, and Lint Staged'
slug: 'setup-nextjs-project-with-eslint-prettier-husky-lint-staged'
date: '2022-02-13'
thumbnail: '/thumbnails/nextjs.png'
tag: 'nextjs'
canonicalUrl: 'https://amanhimself.dev/blog/setup-nextjs-project-with-eslint-prettier-husky-lint-staged/'
---

Working on a large codebase, having a consistent style guide is important. Inconsistencies can occur by using single quotes instead of double quotes, tabs instead of spaces, etc.

A pre-commit hook can address this problem. Before making a new commit, a pre-commit hook can check for types in TypeScript files, run a lint test, use prettier to format files, etc. All of this is possible by using:

- ESLint
- Prettier
- Husky
- Lint Staged

I'll share my personal and minimal configuration that I have recently started using for Next.js projects in this post.

## Setting up a new Next.js project

Creating a new Next.js project with TypeScript enabled is done by running the following command from a terminal:

```shell
npx create-next-app@latest --typescript

# After the project directory is created
# Navigate inside it
cd next-typescript-config
```

After the project directory generated, navigate inside it.

The `--typescript` flag prepares the Next.js app with all the configuration required to enable and use TypeScript. In addition, it comes with a `tsconfig.json` file:

```js
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

The flag also installs the required dependencies and type definitions installed as devDependencies found in the `package.json` file.

## ESLint is already set up

Linting is a technique to check the code for syntax errors. It also allows checking for code style issues. All the checking happens based on the defined set of rules and plugins.

Since [Next.js version 11](https://nextjs.org/blog/next-11#conformance), it comes with ESLint integration out-of-the-box. This means that Next.js installs devDependencies like `eslint` and `eslint-config-next` and creates an `eslintrc.json` file. Next.js uses the `next lint` command to catch ESLint errors.

The [eslint-config-plugin](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next) by Next.js team contains pre-defined set of rules. You do not have to define them explicitly. These rules include some common and best practices in React ecosystem.

For example, the `eslint-config-plugin` uses `eslint-plugin-react-hooks` and `eslint-plugin-react` as dependencies, and the recommended set of rules from both these packages are already included. This takes care of installing the standard eslint packages for React apps in the Next.js app and then manually adding them as `plugins`.

Next.js ESLint plugin also includes best practices around Core Web Vitals and accessibility.

## Setting up Prettier

Prettier is a code formatter that ensures that all the code files follow a consistent styling. If you are into Web development, chances are you are already using it.

ESLint rules in Next.js already come with some code formatting rules. To override them and initiate your personal prettier config, start by installing the following devDependencies:

```shell
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
```

To do Prettier work with ESLint, add `"prettier"` to the `extends` and the `plugins` array in the `.eslintrc.json` file.

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["prettier"]
}
```

In the `extends` array, make sure `prettier` is the last item so that when you define your Prettier configuration that takes precedence over other configurations that may have their way of formatting code.

You can also define the `rules` in this file. For example, whenever there is a code formatting issue with any of the files in my Next.js app, I like it to be exposed as a warning rather than an error.

```json
{
  "extends": ["next", "next/core-web-vitals", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "warn",
    "no-console": "warn"
  }
}
```

Create a new file `.prettierrc` and add a custom Prettier configuration:

```json
{
  "singleQuote": true,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "tabWidth": 2
}
```

Also, add a `.prettierignore` file to ignore formatting on certain directories and files:

```js
.next
.cache
package-lock.json
public
node_modules
next-env.d.ts
next.config.ts
yarn.lock
```

## Installing Husky

[Husky](https://typicode.github.io/husky/#/) is a utility that allows linting and testing when committing the code.

To set it up, initially, install the package as a dev dependency:

```shell
yarn add --dev husky
```

To enable Husky run:

```shell
yarn husky install
```

In the next step, I will configure Husky's pre-commit hook after setting up lint-staged.

## Setting up Lint Staged

The [lint-staged](https://github.com/okonet/lint-staged) package allows linting staged git files. It also checks for the changed files instead of the whole source code.

You can configure lint-staged to not lint files in markdown or json format. You can also separate ESLint checks based on a file's extension.

Create a `.lintstagedrc.js` file at the root of the Next.js app and add the following snippet:

```js
module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': filenames => [
    `yarn eslint ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`
};
```

After setting up the lint-staged configuration, open the `/.husky/pre-commit` file and add the following pre-commit hook:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Add the following
yarn lint-staged

# If using npm, remove above and uncomment below
# npm run lint-staged
```

To test it, I have modified the `/pages/_app.tsx` file and removed the reference of `AppProps`. This will return a type error when committing this file:

![ss1](https://i.imgur.com/ubLHL12.png)

## Conclusion

That's all for setting up ESLint, Prettier, Husky, and Lint Staged with a minimal configuration. You can expand the configuration for any tools as per your needs or modify the pre-commit hook.
