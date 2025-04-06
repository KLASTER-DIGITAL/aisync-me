// Добавляем расширения Jest для тестирования
import '@testing-library/jest-dom';

// Мокаем fetch для тестов
global.fetch = jest.fn();

// Настройка для тестирования с next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Отключаем предупреждения для тестов
console.error = jest.fn();
console.warn = jest.fn();
