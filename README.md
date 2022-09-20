# Development Guideline

## Evironment

```
Node version: 16.15.1
```

## Setup

After cloning:

- SHOULD:

```
    npm i
    npm start
or
    yarn
    yarn start
```

After pulling:

- SHOULD:

```
    npm i
or
    yarn
```

When you're preparing for develop a new feature:

- SHOULD
  - create a new feature branch base on `develop` branch
  - when finish, create a pull/merge request
- NOT RECOMMENDED
  - work on any existing branches, especially `develop` branch

When create a new **feature branches**:

- SHOULD:

  - if you don't use git-flow:

```

git checkout develop
git checkout -b feature_branch

```

- if you use git-flow

```

git flow feature start feature_branch
...
git flow feature finish feature_branch

```

- HAVE TO:
- add "`#`" prefix before your feature branch name
- add "`v`" prefix before a release

When you're working on your feature branch and **want to get code of another** feature branch:

- SHOULD:
- rebase your branch to head of `develop` branch

```

git rebase develop

```

- NOT RECOMMENDED:
- if the another feature branch has not finished yet, you should not rebase your current branch to the head of that branch. If you have to do so, please make sure that it's the last choice.

### Creating a new component

- HAVE TO:
- create a brand new file (.tsx) in `/components`, name it clearly
- if the component has it's own props, declare & define the component Props type, and do NOT export it

```

- SHOULD:
- use `useCallback` hook for component functions

### Creating a new feature/slice of state (Redux state)

- HAVE TO:
- create a brand new **folder** in `/components`, name it by a noun, and short;
- create a brand new file (.ts) in that new folder, name it by concating the folder name and "`Slice`" suffix;

### Font

Use gibson, sans-serif font family

## Deploy

- Create build folder:

```

      npm run build

```

- Setup environment: `.env` file
- The build folder is ready to be deployed. You may serve it with a static server.

```
