import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'apps/web/**/*.cy.{js,jsx,ts,tsx}',
  },
  env: {
    apiUrl: 'http://localhost:3000/api',
  },
  screenshotsFolder: 'tests/snapshots',
  videosFolder: 'tests/videos',
});
