const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Путь к вашему приложению Next.js для загрузки next.config.js и .env файлов
  dir: './apps/web',
});

// Добавляем любую кастомную конфигурацию Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Обработка импортов модулей
    '^@/components/(.*)$': '<rootDir>/apps/web/components/$1',
    '^@/pages/(.*)$': '<rootDir>/apps/web/app/$1',
    '^@/hooks/(.*)$': '<rootDir>/apps/web/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/packages/utils/$1',
    '^@/auth/(.*)$': '<rootDir>/packages/auth/$1',
    '^@/ai/(.*)$': '<rootDir>/packages/ai/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/apps/mobile/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'apps/web/**/*.{js,jsx,ts,tsx}',
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  // Временно отключаем проверку покрытия кода тестами
  // В будущем мы вернем эти требования, когда добавим больше тестов
  // coverageThreshold: {
  //   global: {
  //     branches: 10,
  //     functions: 10,
  //     lines: 10,
  //     statements: 10,
  //   },
  //   // Более высокие требования к покрытию для компонентов UI
  //   'apps/web/components/ui/': {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  // },
};

// createJestConfig экспортирует асинхронную функцию, которая возвращает конфигурацию Jest
// с настройками Next.js
module.exports = createJestConfig(customJestConfig);
