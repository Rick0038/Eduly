# Front-End for Tutoring App

Requirements: Node v18.18.0

## Recommended VSCode extensions:

ESLint, Simple React Snippets, Prettier

## Recommended VSCode settings:

```json
{
  "appService.zipIgnorePattern": ["node_modules{,/**}", ".vscode{,/**}"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Local Development

### Start Mock API Server

Install Mockoon (https://mockoon.com/download/#download-section) and select `File > Open Local Environment` and open the file `mock-server-data/mock-server.json`. Then click `Start server`.

### Start UI

`npm install` to install dependencies.

`npm run dev` to start local UI server.

## Production Build

`npm install`

`npm run build` for generating the build assets (will be generated into the `dist` folder).

Set the environment varialbe `APP_API_URL` to the base URL of the API service in when deploying to the cloud.
