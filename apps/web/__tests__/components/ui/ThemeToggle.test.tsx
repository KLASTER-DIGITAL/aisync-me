import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import '@testing-library/jest-dom';

// Мокаем localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)' ? true : false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // устаревший метод, но нужен для совместимости
    removeListener: jest.fn(), // устаревший метод, но нужен для совместимости
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
});

// Мокаем методы classList
const mockClassList = {
  add: jest.fn(),
  remove: jest.fn(),
  contains: jest.fn((className) => className === 'dark'),
  toggle: jest.fn()
};

// Сохраняем оригинальные методы classList
const originalAdd = document.documentElement.classList.add;
const originalRemove = document.documentElement.classList.remove;
const originalContains = document.documentElement.classList.contains;
const originalToggle = document.documentElement.classList.toggle;

// Переопределяем методы classList
document.documentElement.classList.add = mockClassList.add;
document.documentElement.classList.remove = mockClassList.remove;
document.documentElement.classList.contains = mockClassList.contains;
document.documentElement.classList.toggle = mockClassList.toggle;

describe('ThemeToggle компонент', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    // Восстанавливаем оригинальные методы classList
    document.documentElement.classList.add = originalAdd;
    document.documentElement.classList.remove = originalRemove;
    document.documentElement.classList.contains = originalContains;
    document.documentElement.classList.toggle = originalToggle;
  });

  test('рендерится корректно', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('переключает тему при клике', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');
    
    // Проверяем начальное состояние (темная тема)
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Кликаем на кнопку для переключения на светлую тему
    fireEvent.click(toggleButton);
    
    // Проверяем, что classList.remove был вызван с 'dark'
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
    
    // Проверяем, что localStorage.setItem был вызван с правильными параметрами
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('загружает тему из localStorage при монтировании', () => {
    // Устанавливаем значение в localStorage
    localStorageMock.getItem.mockReturnValueOnce('light');
    
    render(<ThemeToggle />);
    
    // Проверяем, что getItem был вызван с правильным ключом
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });
});
