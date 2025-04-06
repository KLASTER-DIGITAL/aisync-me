/**
 * Базовые типы для приложения aisync.me
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: string; // ID пользователя
  createdBy: string; // ID пользователя
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  participants: string[]; // ID пользователей
  createdBy: string; // ID пользователя
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate?: Date;
  members: string[]; // ID пользователей
  tasks: string[]; // ID задач
  createdBy: string; // ID пользователя
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdBy: string; // ID пользователя
  createdAt: Date;
  updatedAt: Date;
}
