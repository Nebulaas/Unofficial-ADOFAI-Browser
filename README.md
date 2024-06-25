# adofai-browser

An Electron application with React and TypeScript

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
My (Nebulaa's) setup for this project (FOR MACOS SONOMA)
```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  brew install jq
  brew install pnpm
```
```bash
  mkdir ADOFAI_Browser_App
  cd ADOFAI_Browser_App
  pnpm i electron-vite -D
  pnpm create @quick-start/electron adofai-browser --template react-ts
  cd adofai-browser
```
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
  pnpm run dev
```
