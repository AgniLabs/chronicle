# Contribute! <!-- omit in toc -->

Thank you for investing your time in contributing to newsimages! Any contribution you make will be reflected on [newsimages.agnilabs.xyz](https://newsimages.agnilabs.xyz) :sparkles:

When contributing to `newsimages`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/AgniLabs/newsimages/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/AgniLabs/newsimages/issues/new/choose) describing the problem you would like to solve.

### Contributing via Codesandbox

You can contribute to this documentation on codesandbox which will automatically run all the setup command for you.

[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/AgniLabs/newsimages)

### Setup your environment locally

_Some commands will assume you have the Github CLI installed, if you haven't, consider [installing it](https://github.com/cli/cli#installation), but you can always use the Web UI if you prefer that instead._

In order to contribute to this project, you will need to fork the repository:

```bash
gh repo fork AgniLabs/newsimages
```

then, clone it to your local machine:

```bash
gh repo clone <your-github-name>/newsimages
```

This project uses [bun](https://bun.sh) as its package manager. Install it if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then, install the project's dependencies:

```bash
bun install
```

### Implement your changes

Here are some useful scripts for when you are developing:

| Command                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `bun run dev`          | Starts the website on localhost:3000 with HMR            |
| `bun run build`        | Builds the application                                   |
| `bun run start`        | Starts the website in production mode                    |
| `bun run lint`         | Lints the code                                           |
| `bun run lint:fix`     | Lints the code and fixes any errors                      |
| `bun run preview`      | Runs the website in preview mode                         |
| `bun run typecheck`    | Checks for type errors                                   |
| `bun run format:check` | Outputs any code formatting                              |
| `bun run format:write` | Outputs any code formatting and fixes any errors         |
| `bun run check`        | Checks your code for type errors, formatting and linting |

When making commits, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines, i.e. prepending the message with `feat:`, `fix:`, `chore:`, `docs:`, etc... You can use `git status` to double check which files have not yet been staged for commit:

```bash
git add <file> && git commit -m "feat/fix/chore/docs: commit message"
```

### When you're done

Check that your code follows the project's style guidelines by running:

```bash
bun run check
```

> [!IMPORTANT]
> Please also make a manual, functional test of your changes.

<!-- If your change should appear in the changelog, i.e. it changes some behavior of either the CLI or the outputted application, it must be captured by `changeset` which is done by running

```bash
pnpm changeset
```

and filling out the form with the appropriate information. Then, add the generated changeset to git:

```bash
git add .changeset/*.md && git commit -m "chore: add changeset"
``` -->

When all that's done, it's time to file a pull request to upstream:

<!-- **NOTE**: All pull requests should target the `next` branch. `main` has been feature-locked since 2023-11-01. -->

```bash
gh pr create --web
```

and fill out the title and body appropriately. Again, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines for your title.

## Credits

This documentation was inspired by [create t3 app's contributing guidelines](https://github.com/t3-oss/create-t3-app/blob/main/CONTRIBUTING.md), which was inspired by the contributing guidelines for [cloudflare/wrangler2](https://github.com/cloudflare/wrangler2/blob/main/CONTRIBUTING.md) :)
