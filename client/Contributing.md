# Contributing

1. Identify a Story In JIRA
2. Make sure that story is in the sprint before starting
3. Assign The story to yourself
4. Follow the step's outlined below

## Git Workflow

#### 1) Make sure your on the develop branch

First, make sure your current branch is up to date.

To do so run:

```bash
git status
```

You should see the following message:

```bash
nothing to commit, working tree clean
```

If you see untracked, unstaged, or uncommitted changes, handle
them appropriately before continuing.

Once your current working branch is clean:

```bash
if you have develop locally, run:

git checkout develop
git pull

if you do not have a local develop branch, run:

git fetch origin
git checkout --track -b origin/develop
```

#### 2) Create a feature branch off the develop branch

```bash
git checkout -b feature/<JIRA-ID>_<DESCRIPTION_SEPERATED_WITH_UNDERSCORES>
```


#### 3) Start working on your feature

While working on your feature:

```bash
To track stage changegs

Add all changes:
git add .

Add a specific file
git add <File>

git commit -m "you commit Messagge"

If it's your first push:

git push origin <your-branch>

After your first push:

git push
```


#### 4) Creating a Pull Request

First, merge develop into your feature to make sure your feature doesn't
break the current branch

This can be done as follows:

```bash
git pull origin develop
```


Make sure all tests are run properly, by running:

```bash
yarn test
```

Finally submit your pull request through bitbucket.

Ensure that your pull request complies with the checklist located in 
PULL_REQUEST_TEMPLATE.md
