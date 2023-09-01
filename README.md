# Nest_Clean_Node


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker
```bash
# Criar docker
$ docker-compose up -d
# Visualizar status do docker
$ docker ps
```

## Prisma
```bash
# Installation
$ npm i prisma -D
$ npm i @prisma/client
$ npx prisma init
$ npx prisma migrate dev
$ npx prisma studio

## Hash Password
```bash
# BcryptJS
- npm i bcryptjs
- npm i @types/bcryptjs -D

## Validation
```bash
# Zod
- npm i zod
- npm i zod-validation-error

## Variavel Global
```bash
# Nestjs/Config
- npm i @nestjs/config

## Authentication 
```bash
# Passport and JWT - Nest
- npm i @nestjs/passport @nestjs/jwt
# Private Key
- openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
# Public Key
- openssl rsa -pubout -in private_key.pem -out public_key.pem
- base64 -i private_key.pem -o private_key-base64.txt
- base64 -i public_key.pem -o public_key-base64.txt