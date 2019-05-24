# [Starter Kit](https://starter-kit.nandomoreira.dev/)

[![Maintainability](https://api.codeclimate.com/v1/badges/e98eec03de678dcdb610/maintainability)](https://codeclimate.com/github/onedevstudio/starter-kit/maintainability) ![GitHub](https://img.shields.io/github/license/onedevstudio/starter-kit.svg) ![GitHub repo size](https://img.shields.io/github/repo-size/onedevstudio/starter-kit.svg) ![GitHub package.json version](https://img.shields.io/github/package-json/v/onedevstudio/starter-kit.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/59489b42-daeb-4c07-af4a-158aae7ff899/deploy-status)](https://app.netlify.com/sites/starter-kit/deploys)

> A simple and powerful Starter Kit made with Webpack, Gulp 4, Pug and SASS

## Table of Contents

- [Installation](#installation)
- [Support](#support)
- [Contributing](#contributing)
- [Tasks](#tasks)
- [History](#history)
- [License](#license)

## Installation

```bash
git clone https://github.com/onedevstudio/starter-kit.git your-project
cd your-project/ && rm -rf .git
yarn install # or npm install
yarn dev # or npm run dev
```

## Support

Please [open an issue](../../issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](../../compare?expand=1).
Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## Tasks

**Gulp tasks**

- `gulp` ~> Build and watch files
- `gulp watch` ~> Watch js files
- `gulp server` ~> Watch js files and start browser sync server
- `gulp copyFiles` ~> Copy static files
- `gulp favicons` ~> Generate all favicons
- `gulp build` ~> Build all files

**NPM scripts**

- `npm run start` ~> Starts the task `gulp server` in env production
- `npm run prod` ~> Starts the tasks `npm run lint` and `npm run build`
- `npm run build` ~> Starts the tasks `gulp build` in env production
- `npm run dev` ~> Starts the tasks `gulp` in env development
- `npm run deploy` ~> Starts the tasks `npm run prod` and run the command `netlify deploy --prod`
- `npm run eslint` ~> Run the command `eslint .`
- `npm run eslint:fix` ~> Run the task `npm run eslint --fix`
- `npm run stylelint` ~> Run the command `stylelint "**/*.scss"`
- `npm run stylelint:fix` ~> Run the task `npm run stylelint --fix`
- `npm run lint` ~> Starts the tasks `npm run eslint` and `npm run stylelint`
- `npm run pre-commit` ~> Start the task `npm run lint`

## History

See [Releases](../../releases) for detailed changelog.

## Author

| [![twitter/oseunando](https://avatars6.githubusercontent.com/u/1318271?v=4&s=120)](http://twitter.com/oseunando "Follow @oseunando on Twitter") |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Fernando Moreira](http://twitter.com/oseunando)                                                                                                |

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Code is under [MIT License](/LICENSE) - © Fernando Moreira

## Buy me a coffee?

It will encourage me to keep it going, fix whatever bugs you find and spend time making it better :D

<a href="https://www.paypal.me/nandomoreira/5">
  <img src="https://img.shields.io/badge/Buy%20me%20a%20coffee%3F-US%24%205-blue.svg" alt="Buy me a coffee? - https://www.paypal.me/nandomoreira/5">
</a>
