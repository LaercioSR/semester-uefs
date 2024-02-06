# Semester UEFS

![Logo of Project](https://raw.githubusercontent.com/LaercioSR/semester-uefs/main/__docs/logo.png)

UEFS Semester is a website that shows information about the days remaining until the end of the academic semester at UEFS, and also posts daily on Twitter/X so that the institution's students can follow the days on the social network.

- Link: <https://semestreuefs.laerciorios.com/>
- Twitter/X: <https://x.com/uefssemestre>

![Screenshot of Project](https://raw.githubusercontent.com/LaercioSR/semester-uefs/main/__docs/screenshot.png)

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### 📋 Prerequisites

To install this project locally, follow the steps below:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Clone this repository:

   ```sh
   git clone https://github.com/LaercioSR/semester-uefs.git
   cd semester-uefs
   ```

3. To run the posting features on Twitter/x you will need to create a developer account to have access to the social network's API, see more at:
<https://developer.twitter.com/>

4. Copy the .env:

    ```bash
    cp .env.example .env
    ```

    After that, you need to fill in the .env with the credentials for the Twitter/X API.

### 🔧 Install

1. Install the dependencies:

   ```sh
    npm install
   ```

2. How to Run the Project:

    After installation, you can run the project locally with the following command:

   ```sh
    npm run dev
   ```

The site will run locally at <http://localhost:3000>.

## ⚙️ Running the tests

With the dependencies installed, follow the following steps to run the tests.

### 🔩 Break down into end to end tests

We use CyPress to run the interface's E2E tests.

```bash
npm run test
```

### ⌨️ And coding style tests

For code styles we use ESLint.

```bash
npm run lint
```

## 🛠️ Built with

This project uses the following technologies:

- [Next.JS](https://nextjs.org/): A React framework.
- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces.
- [Vercel](https://vercel.com/): Platform used to host the project.
- [Github Actions](https://github.com/features/actions): Github functionality used for building CI/CD pipelines.
- [Styled-Components](https://styled-components.com/): A CSS-in-JS library for styling components.
- [ESLint](https://eslint.org/): Analyzer for checking errors and code patterns.
- [CyPress](https://www.cypress.io/): Tool for building interface tests.
- [Twitter/X Api](https://developer.twitter.com): API for posting tweets on the social network.
  - [twitter-api-v2](https://www.npmjs.com/package/twitter-api-v2): JS dependency that allows access to Twitter/X API resources.
- [zod](https://zod.dev/): Creation and validation schema in TS.
- [Material Symbols (Google)](https://fonts.google.com/icons): Google's Material Design icons library.

---
Made with ❤️ by [Laercio Rios](https://laerciorios.com) 😊
