# Vite Contentful App Template

Build a Contentful App using Vite. ๐

![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/vite-contentful-app-template)
[![dependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vite-contentful-app-template.svg)](https://david-dm.org/bcakmakoglu/vite-contentful-app-template)
[![devDependencies Status](https://status.david-dm.org/gh/bcakmakoglu/vite-contentful-app-template.svg?type=dev)](https://david-dm.org/bcakmakoglu/vite-contentful-app-template?type=dev)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/vite-contentful-app-template)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/vite-contentful-app-template)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/vite-contentful-app-template)

## ๐ช Features

![React](https://badges.aleen42.com/src/react.svg)
![TypeScript](https://badges.aleen42.com/src/typescript.svg) 
![Vite](https://badges.aleen42.com/src/vitejs.svg)
![ESLint](https://badges.aleen42.com/src/eslint.svg)

- ๐น Write components in __React__

- ๐จ Use the next generation utility-first CSS framework [Windi CSS](https://github.com/windicss/windicss)

- โก๏ธ Lightning fast development thanks to [__Vite 2__](https://vitejs.dev/guide/)!

- โ๏ธ [__APIs & Components Auto import__](https://github.com/antfu/unplugin-auto-import)

    - ๐คน __Components__ registered inside the [components](./src/components) directory
    
    - ๐ช React & React Hooks
    
    - โ๏ธ [__React-Use__](https://github.com/streamich/react-use)
    
    - ๐ [Contentful __Forma 36__ React Components](https://f36.contentful.com/)
    
- ๐ Enjoy a great dev experience with __TypeScript__

- ๐ช Comes with __ESLint__ & __Prettier__ to help you write neat code


## ๐  Setup
```bash
# create a new project
$ npx degit bcakmakoglu/contentful-vite-starter my-app
# or just clone the repo
$ git clone https://github.com/bcakmakoglu/contentful-vite-starter.git my-app

# you're free to use the package manager of your choosing
$ pnpm install
```

## ๐งช Development
After setting up your Contentful App config on the Contentful Web Application,
you can start development. 
For instructions on setting up the App check the [documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/tutorial/#embed-your-app-in-the-contentful-web-app).
```bash
# start (dev)
$ pnpm dev

# build app
$ pnpm build

# serve app from dist dir
$ pnpm serve

# upload dist dir to contentful
$ pnpm upload
```
