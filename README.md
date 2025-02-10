# portfolio

My personal website using next.js nested layouts.

## developing

### pre-requisite

This repository uses mise to manage yarn. So, firstly, install the correct yarn version.

```
mise trust ./mise.toml
mise install
```

Then, install the dependencies.

```
yarn
```

### running

Start the typed scss module builder and development server

```
yarn start
```

### tooling
Linters and formatters should be set up for you in VS Code. Otherwise, you can run them manually.

Take a closer look at the scripts in [package.json](./package.json). There are commands for linting, formatting, fixing lint/format errors, and building.

To get started, try linting and formatting the codebase:
```
yarn lint
yarn format
```