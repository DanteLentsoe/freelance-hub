# freelance-hub

This application allows freelances to log, clients and projects they have with clients. This features, a client and a graphql API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node](https://nodejs.org/en/) minimum v12.3.0
- [yarn] (https://yarnpkg.com/)

### Installing

```
git clone https://github.com/DanteLentsoe/freelance-hub.git
cd freelance-hub
cp server/.env.example server/.env
# set your db connection string in there when you're ready MONGO_URI
cd server && yarn && cd ..
cd server && yarn dev && cd ..
cd client && yarn && cd ..
cd client && yarn dev && cd ..
```

Server endpoint: http://localhost:8000/graphql

## Environments

There are 2 environments each corresponding to a branch on the repository:

- Production - `master` branch
- Development - `dev` branch

## Deployment

The application is deployed on [Repl.it](```https://.repl.it```)

## Built With

Details of the tech stack that has been used.

## Client

- [Typescript](https://www.typescriptlang.org/)
- [Nextjs](https://www.typescriptlang.org/)
- [ApolloClient](https://www.apollographql.com/docs/react/)

## Server

- [Node](https://nodejs.org/en/)
- [MonoDB](https://www.mongodb.com/)
- [GraphQl](https://graphql.org/)
- [Typescript](https://www.typescriptlang.org/)

## Architecture

A basic architecture diagram or description of the chosen architecture should be detailed here. Lol, I did not include it.

## File Structure/ Project Structure

Within the download you'll find the following directories and files:

```
freelance-hub/

├── client
│   ├──
│   ├──
│   ├──
│
|
|
|
├── server
│   ├── src
    │   ├── config
    │   ├── contants
    │   ├── models
    │   ├── schema
    │   ├── index.ts
    |   ├── package.json
    |   ├── README.md
    |   ├── tsconfig.json
    |   ├── yarn.lock


```

## Authors

- **Dante Lentsoe** <dllentsoe@gmail.com>

## Licenses

```
├─ MIT: 953
├─ ISC: 78
├─ BSD-3-Clause: 37
├─ BSD-2-Clause: 29
├─ Apache-2.0: 26
├─ MIT*: 8
├─ BSD: 5
├─ (MIT OR CC0-1.0): 5
├─ CC0-1.0: 4
├─ WTFPL: 2
├─ Unlicense: 2
├─ 0BSD: 2
├─ Custom: https://github.com/tmcw/jsonlint: 1
├─ BSD-3-Clause OR MIT: 1
├─ (MIT OR Apache-2.0): 1
├─ CC-BY-4.0: 1
├─ Public Domain: 1
├─ AFLv2.1,BSD: 1
├─ (MIT AND Zlib): 1
├─ (MIT AND BSD-3-Clause): 1
└─ CC-BY-3.0: 1
```

## Meta

| Version | Author                              | Date       |
| ------- | ----------------------------------- | ---------- |
| 0.0.2   | Dante Lentsoe <dllentsoe@gmail.com> | 05/07/2022 |
