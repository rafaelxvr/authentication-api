# Authentication.API

Authentication.API is an API based on SOLID, built using Domain Driven Design (DDD), and Clean Architecture. The purpose of this API is to provide functionalities for user registration, login, and authentication, as well as authentication for requests between applications.

## Features

- User registration: Allows the registration of new users in the application.
- User login: Enables authenticated users to log in to the application.
- User authentication and permissioning: Provides mechanisms to authenticate and authorize users.
- Authentication for requests between applications: Allows authentication and validation of the integrity of requests sent by other applications.

## Technologies Used

- Programming language: Typescript
- Node.js

## Principles
- Test Driven Development (TDD): Development approach that prioritizes creating tests before implementing the code (for more details, read <https://tddmanifesto.com>).
- SOLID: Object-oriented programming principles for building clean and maintainable code.
- Domain Driven Design (DDD): Software development methodology that aligns code with the business domain.
- Clean Architecture: Software architecture that separates concerns into layers, facilitating code maintenance and testing.
- Database: MongoDB was used due to the need for storing records that will not be frequently modified.

## Installation

- Have [Node.js](https://nodejs.org) in your development environment.
- Use the package manager [npm](https://www.npmjs.com/) to install project dependencies.

```bash
npm install
```

## Available Scripts
In the project directory, you can run the following scripts:

### `npm start`

Starts the API in production mode.\
Open [http://localhost:3000](http://localhost:6060) to view it in the browser.

### `npm run build`

Builds the project.\
Removes the `dist` directory and compiles the Typescript code.

### `npm run debug`

Starts the API in Debug mode using nodemon.\
Watches the `dist` folder for any changes and enables debug on port 9222.

### `npm run up`

Builds the project and starts the API using docker-compose.\
Runs the containers in detach mode.

### `npm run down`

Stops the API containers using docker-compose.

### `npm test`

Runs all unit tests.\
The tests are executed silently without detailed output. The tests run sequentially. 
If there are no tests, it exits with a success message.

### `npm run test:verbose`

Runs unit tests with detailed output.\
The tests are executed sequentially.

### `npm run test:unit`

Runs unit tests in watch mode.\
The tests are executed interactively, watching for any changes in files to rerun the tests.

### `npm run test:integration`

Runs integration tests in watch mode.\
The tests are executed interactively, watching for any changes in files to rerun the tests.

### `npm run test:staged`

Runs tests related to modified files staged for commit.\
The tests are executed in watch mode.

### `npm run test:ci`

Runs CI tests.\
The tests are executed with code coverage.
