/**
 * Демо-пользователи для разных уровней доступа
 * Используются для демонстрации функциональности приложения
 */

import { User } from '../types';

export type UserRole = 'super-admin' | 'manager' | 'client' | 'developer' | 'partner';

export interface DemoUser extends User {
  role: UserRole;
  password: string;
  email: string; // Явно указываем, что email есть в DemoUser
}

/**
 * Демо-пользователи для разных уровней доступа
 */
export const demoUsers: DemoUser[] = [
  {
    id: 'sa-1',
    name: 'Александр Петров',
    email: 'admin@aisync.me',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'super-admin',
    password: 'admin123',
  },
  {
    id: 'mg-1',
    name: 'Елена Смирнова',
    email: 'manager@aisync.me',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'manager',
    password: 'manager123',
  },
  {
    id: 'cl-1',
    name: 'Иван Иванов',
    email: 'client@aisync.me',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'client',
    password: 'client123',
  },
  {
    id: 'dv-1',
    name: 'Дмитрий Соколов',
    email: 'developer@aisync.me',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'developer',
    password: 'developer123',
  },
  {
    id: 'pt-1',
    name: 'Мария Козлова',
    email: 'partner@aisync.me',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'partner',
    password: 'partner123',
  },
];

/**
 * Получить демо-пользователя по email и паролю
 * @param email Email пользователя
 * @param password Пароль пользователя
 * @returns Пользователь или null, если не найден
 */
export function getDemoUser(email: string, password: string): DemoUser | null {
  return demoUsers.find(user => user.email === email && user.password === password) || null;
}

/**
 * Получить демо-пользователя по id
 * @param id ID пользователя
 * @returns Пользователь или null, если не найден
 */
export function getDemoUserById(id: string): DemoUser | null {
  return demoUsers.find(user => user.id === id) || null;
}

/**
 * Получить всех демо-пользователей по роли
 * @param role Роль пользователя
 * @returns Массив пользователей с указанной ролью
 */
export function getDemoUsersByRole(role: UserRole): DemoUser[] {
  return demoUsers.filter(user => user.role === role);
}

/**
 * Получить описание прав доступа для роли
 * @param role Роль пользователя
 * @returns Описание прав доступа
 */
export function getRolePermissions(role: UserRole): string[] {
  const permissions: Record<UserRole, string[]> = {
    'super-admin': [
      'Полный доступ ко всем функциям системы',
      'Управление пользователями и их ролями',
      'Настройка системных параметров',
      'Доступ к аналитике и отчетам',
      'Управление модулями и интеграциями',
    ],
    'manager': [
      'Управление задачами и проектами',
      'Назначение задач пользователям',
      'Просмотр аналитики и отчетов',
      'Управление календарем и встречами',
      'Ограниченный доступ к настройкам системы',
    ],
    'client': [
      'Просмотр и управление своими задачами',
      'Создание новых задач и событий',
      'Использование AI-ассистента',
      'Доступ к личному календарю',
      'Настройка уведомлений',
    ],
    'developer': [
      'Доступ к API и документации',
      'Создание и тестирование интеграций',
      'Разработка и публикация модулей',
      'Просмотр логов и отладочной информации',
      'Ограниченный доступ к системным настройкам',
    ],
    'partner': [
      'Управление клиентами партнера',
      'Доступ к партнерской программе',
      'Просмотр статистики использования',
      'Управление лицензиями и подписками',
      'Доступ к маркетинговым материалам',
    ],
  };

  return permissions[role] || [];
}
