'use client';

import React from 'react';
import { BaseComponentProps, ThemeType } from '../../../../types/components';
import { cn } from '../../lib/utils';

interface ThemeToggleProps extends BaseComponentProps {}

/**
 * Компонент для переключения между светлой и темной темой
 * Сохраняет выбор пользователя в localStorage
 */
export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  // Инициализация темы при загрузке компонента
  React.useEffect(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Проверяем системные настройки, если нет сохраненной темы
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Устанавливаем начальную тему
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
    setTheme(initialTheme);
    
    // Применяем тему к документу
    applyTheme(initialTheme);
  }, []);

  // Функция для применения темы к документу
  const applyTheme = (newTheme: ThemeType) => {
    const root = window.document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Обработчик переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        "dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
        "border border-gray-200 dark:border-gray-700",
        className
      )}
      aria-label={theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}
    >
      {theme === 'light' ? (
        <svg
          className="h-5 w-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
