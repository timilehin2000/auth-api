# NestJS Authentication API

## Description

This is a **NestJS-based authentication API** that supports:

- **User Registration** (Email + Password)
- **Standard Login** (Email + Password)
- **Biometric Login** (Using `biometricKey`)
- **JWT Authentication**
- **Prisma ORM** with **PostgreSQL**
- **GraphQL API**
- **Dockerized PostgreSQL**
- **Unit Tests for Authentication**

## Requirements

- **Node.js** installed
- **PostgreSQL** installed (or use Docker)

## Installation

- Clone this repository:

```bash
git clone https://github.com/timilehin2000/auth-api
```

- Change Directory

```bash
cd auth-api
```

- Install all dependencies

```bash
npm install
```

- Initiate .env file

```bash
cp .env.example .env
```

- Modify `.env` file with your correct database credentials and other necessary variables

- Run postgres with docker

```bash
docker-compose up -d
```

- Run db migration

```bash
npx prisma migrate dev
npx prisma generate
```

## Usage

To run this application, execute:

```bash
npm run start:dev
```

```bash
npm run test
```

You should be able to access this application at `http://127.0.0.1:3000/graphql`. You can also access the API documentation at https://documenter.getpostman.com/view/36399546/2sAYkBrLKB

```

```
