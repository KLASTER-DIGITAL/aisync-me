/**
 * Типы данных для моделей приложения
 * Содержит типы для задач, событий, заметок и других сущностей
 */

/**
 * Тип для приоритета задачи (расширенный)
 */
export type TaskPriorityExtended = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Тип для статуса задачи
 */
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Интерфейс для задачи (расширенный)
 */
export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate: Date | null;
  priority: TaskPriorityExtended;
  status: TaskStatus;
  completed: boolean;
  tags?: string[];
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

/**
 * Тип для повторяемости события
 */
export type EventRecurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

/**
 * Интерфейс для события (расширенный)
 */
export interface EventModel {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isAllDay: boolean;
  recurrence: EventRecurrence;
  recurrenceEndDate?: Date;
  attendees?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Интерфейс для заметки
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Интерфейс для контакта
 */
export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  notes?: string;
  tags?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Интерфейс для проекта (расширенный)
 */
export interface ProjectModel {
  id: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  members?: string[];
  tasks?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Интерфейс для интеграции с внешним сервисом
 */
export interface Integration {
  id: string;
  type: 'google' | 'telegram' | 'whatsapp' | 'trello' | 'jira' | 'custom';
  name: string;
  config: Record<string, any>;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
