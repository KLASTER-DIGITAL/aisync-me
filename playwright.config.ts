import { defineConfig, devices } from '@playwright/test';

/**
 * Конфигурация Playwright для E2E-тестирования
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Максимальное время выполнения всех тестов */
  timeout: 30 * 1000,
  /* Ожидание между повторными запусками */
  expect: {
    timeout: 5000
  },
  /* Количество повторных запусков при падении теста */
  retries: process.env.CI ? 2 : 0,
  /* Репортеры для вывода результатов тестов */
  reporter: [
    ['html'],
    ['list']
  ],
  /* Общие настройки для всех проектов */
  use: {
    /* Базовый URL для всех тестов */
    baseURL: 'http://localhost:3000',
    /* Делать скриншоты при падении тестов */
    screenshot: 'only-on-failure',
    /* Записывать видео при падении тестов */
    video: 'on-first-retry',
    /* Собирать трейс при падении тестов */
    trace: 'on-first-retry',
  },

  /* Конфигурация для разных браузеров */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Тестирование мобильных устройств */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Запуск локального сервера перед тестами */
  webServer: {
    command: 'cd apps/web && npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
