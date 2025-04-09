'use client';

import React from 'react';
import DashboardNav from '../../components/ui/DashboardNav';
import NotificationsPanel from '../../components/ui/NotificationsPanel';
import ThemeToggle from '../../components/ui/ThemeToggle';

// Импортируем типы из правильного пути
import { Notification } from '../../../../types/components.d';

// Временно определяем тип User, пока не будет создан в types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout для страниц дашборда
 * Включает боковую навигацию и основное содержимое
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Демо-данные для пользователя
  const user: User = {
    id: '1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
  };

  // Демо-данные для уведомлений
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Новая задача',
      message: 'Вам назначена новая задача "Подготовить отчет"',
      type: 'info',
      timestamp: new Date(Date.now() - 15 * 60000), // 15 минут назад
      isRead: false,
    },
    {
      id: '2',
      title: 'Встреча через 30 минут',
      message: 'Напоминание о встрече с командой разработки',
      type: 'warning',
      timestamp: new Date(Date.now() - 45 * 60000), // 45 минут назад
      isRead: false,
    },
    {
      id: '3',
      title: 'Задача выполнена',
      message: 'Задача "Обновить документацию" была успешно выполнена',
      type: 'success',
      timestamp: new Date(Date.now() - 120 * 60000), // 2 часа назад
      isRead: true,
    },
  ]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Обработчики для уведомлений
  const handleReadNotification = (id: string): void => {
    setNotifications((prevNotifications: Notification[]) =>
      prevNotifications.map((notification: Notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDismissNotification = (id: string): void => {
    setNotifications((prevNotifications: Notification[]) =>
      prevNotifications.filter((notification: Notification) => notification.id !== id)
    );
  };

  const handleMarkAllAsRead = (): void => {
    setNotifications((prevNotifications: Notification[]) =>
      prevNotifications.map((notification: Notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleClearAllNotifications = (): void => {
    setNotifications([]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Мобильная навигация (отображается только на мобильных устройствах) */}
      <div
        className={`fixed inset-0 z-40 transform bg-gray-900 bg-opacity-50 transition-opacity md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">AiSync.me</h2>
          <DashboardNav 
            items={[
              {
                title: 'Дашборд',
                href: '/dashboard',
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: 'AI-ассистент',
                href: '/dashboard/assistant',
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
              },
              {
                title: 'Задачи',
                href: '/dashboard/tasks',
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                title: 'Календарь',
                href: '/dashboard/calendar',
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'Настройки',
                href: '/dashboard/settings',
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ]}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user.avatar}
              alt={user.name}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Верхняя панель */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Открыть меню</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Поиск
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Поиск..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {/* Переключатель темы */}
            <ThemeToggle className="mr-4" />

            {/* Уведомления */}
            <div className="mr-4">
              <NotificationsPanel
                notifications={notifications}
                onReadNotification={handleReadNotification}
                onDismissNotification={handleDismissNotification}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAllNotifications}
              />
            </div>

            {/* Профиль пользователя */}
            <div className="relative">
              <button
                type="button"
                className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">Открыть меню пользователя</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Контент страницы */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
