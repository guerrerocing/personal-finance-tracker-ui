# Personal Finance Tracker UI

## Table of Contents

- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## About

The Financial Tracker Frontend is a React-based web application built with Vite, TypeScript, and NextUI. It provides a user-friendly interface for managing your financial transactions, tracking income and expenses, and viewing financial summaries.

## Requirements

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/): Make sure Node.js is installed on your system.
- [Yarn](https://yarnpkg.com/): Make sure Yarn is installed on your system.

## Installation

Follow these steps to set up and run your frontend project:

1. Clone the repository:

   ```bash
   git clone https://github.com/guerrerocing/personal-finance-tracker-ui.git
   ```

2. Navigate to the project directory:

   ```bash
   cd personal-finance-tracker-ui
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory of your project to set up environment variables. Add the following variable:

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api

```

Make sure to keep your `.env` file private and do not commit it to version control.

## Usage

1. Start the project:

   ```bash
   yarn dev
   ```

2. Access your browser `http://localhost:5173/login`
