# Autotests for project "Default Project"

This repository contains automated tests for project "Default Project".

## Requirements

- Node.js 22.0.0 or higher
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npm run install-browsers
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file and set your application URL:
```bash
BASE_URL=https://your-application-url.com
```

The `playwright.config.js` automatically loads these variables using dotenv.

## Test IT Integration

This project is integrated with Test IT test management system. Test results will be automatically sent to Test IT after test execution.

### Configuration

The Test IT integration is configured in `tms.config.json`. This file contains:
- Test IT server URL
- [Project ID](https://github.com/testit-tms/.github/tree/main/configuration#projectid) (fill this value manually before running tests)
- [Configuration ID](https://github.com/testit-tms/.github/tree/main/configuration#configurationid) (fill this value manually before running tests)
- API token (`privateToken`)

**Important:** The `tms.config.json` file contains sensitive information (API token). Make sure to:
- Add it to `.gitignore` if you're using version control
- Keep it secure and do not share it publicly
- Update the `privateToken` if you need to use different credentials

### Test Linking

Each test in this project is linked to Test IT test cases using:
- `externalId` - unique identifier for the test in Test IT
- `workItemIds` - links to test cases in Test IT

These identifiers are automatically added to test files during export.

### Running Tests with Test IT Integration

When you run tests, results will be automatically sent to Test IT:
```bash
npm test
```

The test results will appear in your Test IT project with all execution details, screenshots, and traces.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in headed mode
```bash
npm run test:headed
```

## Project Structure

- `tests/` - directory with autotests
- `playwright.config.js` - Playwright configuration
- `.env.example` - environment variables template
- `.env` - environment variables (create from .env.example)
- `tms.config.json` - Test IT integration configuration

## Configuration

### Base URL
Base URL for tests: `https://cucumber.sendbox.askona.ru`

This URL is configured via the `BASE_URL` environment variable in the `.env` file.
You can change the URL by editing the `BASE_URL` value in your `.env` file.

### Environment Variables
- `BASE_URL` - The base URL of your application under test

## Supported Browsers

- Chrome (Chromium)

## Report Generation

After running tests, reports will be available in the `playwright-report/` directory.

To view the report:
```bash
npx playwright show-report
```