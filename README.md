# Piñata 📦

Bundler is a tool for dealing with JS bundling.

## Table of Contents
- [Piñata 📦](#pi-ata---)
  * [How it works](#how-it-works)
    + [What is Bundling?](#what-is-bundling-)
    + [Ok, but how?](#ok--but-how-)
    + [Parsing the entry file](#parsing-the-entry-file)
    + [Dependency graphs](#dependency-graphs)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)

## How it works

### What is Bundling?
Bundling is a technique used by developers to reduce the number of HTTP requests for JS files to the minimum. Essentially, in the front end world, to bundle something is to put your whole project into a big, sometimes obfuscated or minified, JS file.

### Ok, but how?
Well, here are the steps my bundler takes:
- Parse the entry file and generate an **AST**;
- Create a **dependency graph**;
- Create an **AST** for every dependency;
- **Transpile** everything with Babel

### Parsing the entry file
To find the dependencies inside a file, we need to parse it. We can do this using AST (or simply syntax trees) parsers.

Now that we know our dependencies, we store them into a list for later.

![JS to AST](https://raw.githubusercontent.com/pasenidis/js-bundler/main/docs/assets/01.png)

### Dependency graphs
A dependency graph represents dependencies of the project files towards each other.

The example below is the visual dependency graph representation of the example files of this repository.

![Dependency Graph](https://raw.githubusercontent.com/pasenidis/js-bundler/main/docs/assets/02.png)

## Installation

Just install the package:

```bash
npm i -D @pinatajs/core  # -D means --save-dev which appends the package to the devDependencies object
# or use yarn if you want
yarn -D @pinatajs/core
# or use pnpm
```

## Usage

Just run the command. (I would suggest you to add it as a script)

```bash
pinata-cli
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.