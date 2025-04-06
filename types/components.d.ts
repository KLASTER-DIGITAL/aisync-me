/**
 * Базовые типы для компонентов
 * Этот файл содержит общие типы, используемые во всем проекте
 */

// Базовый интерфейс для всех компонентов
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

// Типы для кнопок
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Типы для карточек
export type CardVariant = 'default' | 'bordered' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

// Типы для уведомлений
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Типы для задач
export type TaskPriority = 'low' | 'medium' | 'high';

// Типы для статистики
export type StatColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red';

// Типы для тем
export type ThemeType = 'light' | 'dark';

// Типы для пользователей
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Типы для задач
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: TaskPriority;
  completed: boolean;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Типы для событий
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Типы для статистики
export interface Stat {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color: StatColor;
}

// Типы для уведомлений
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

// Типы для проектов
export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  members?: string[];
  createdAt: Date;
  updatedAt: Date;
}
