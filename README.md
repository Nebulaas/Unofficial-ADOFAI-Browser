# adofai-browser

An Electron application with React, Vite and TypeScript
- [Go here for my full setup of the project](#my-nebulaas-setup-for-this-project-macos-sonoma)
- [Go here if you just want to run the project](#start-here-if-you-are-just-trying-to-run-this-project)

MAJOR CREDIT TO THE **TUF/T21+C** & **ADOFAI.GG** DEV TEAMS, YOUR WORK HELPED IMMENSELY!! <3

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

---
## Setup
#### My (Nebulaa's) setup for this project (MACOS SONOMA)

Homebrew stuff:
```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  brew install jq
  brew install pnpm
```

Project setup:
```bash
  mkdir ADOFAI_Browser_App
  cd ADOFAI_Browser_App
  pnpm i electron-vite -D
  pnpm create @quick-start/electron adofai-browser --template react-ts
  cd adofai-browser
```

### Start here if you are just trying to run this project!
#### Note: i use/used `pnpm` for this (as you can see), so either make sure you know what you're doing, or install it!

Install dependencies, libraries, etc.:
```bash
  pnpm install
  pnpm i react-router-dom
  pnpm i --save @fortawesome/fontawesome-svg-core
  pnpm install --save @fortawesome/free-solid-svg-icons
  pnpm install --save @fortawesome/free-regular-svg-icons
  pnpm install --save @fortawesome/free-brands-svg-icons
  pnpm i --save @fortawesome/react-fontawesome@latest
  pnpm install i18next --save
  pnpm install react-i18next i18next --save
  pnpm install classnames
  pnpm install axios

  pnpm i react-tooltip
  pnpm i react-select
  pnpm i react-infinite-scroll-component

  git submodule update --init
```
Run the app:
```bash
  pnpm run dev
```
