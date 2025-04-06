'use client';

import React from 'react';
import TaskWidget from '../../components/dashboard/TaskWidget';
import CalendarWidget from '../../components/dashboard/CalendarWidget';
import StatsWidget from '../../components/dashboard/StatsWidget';
import { AiAssistant } from '../../components/ai/AiAssistant';

// Типизация для задач
interface Task {
  id: string;
  title: string;
  dueDate: Date | null;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

// Демо-данные для задач
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Подготовить презентацию для клиента',
    dueDate: new Date(Date.now() + 86400000), // завтра
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Проверить отчеты по маркетингу',
    dueDate: new Date(Date.now() + 172800000), // через 2 дня
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Обновить план проекта',
    dueDate: new Date(Date.now() + 259200000), // через 3 дня
    priority: 'low',
    completed: false,
  },
  {
    id: '4',
    title: 'Созвон с командой разработки',
    dueDate: new Date(), // сегодня
    priority: 'high',
    completed: false,
  },
  {
    id: '5',
    title: 'Отправить счета клиентам',
    dueDate: new Date(Date.now() - 86400000), // вчера
    priority: 'medium',
    completed: false,
  },
];

// Демо-данные для событий
const demoEvents = [
  {
    id: '1',
    title: 'Встреча с инвесторами',
    startDate: new Date(Date.now() + 3600000), // через час
    endDate: new Date(Date.now() + 7200000), // через 2 часа
    location: 'Офис, переговорная №1',
  },
  {
    id: '2',
    title: 'Презентация нового продукта',
    startDate: new Date(Date.now() + 86400000 + 36000000), // завтра в 10:00
    endDate: new Date(Date.now() + 86400000 + 43200000), // завтра в 12:00
    location: 'Конференц-зал',
  },
  {
    id: '3',
    title: 'Обучение новых сотрудников',
    startDate: new Date(Date.now() + 172800000), // через 2 дня
    endDate: new Date(Date.now() + 172800000 + 10800000), // через 2 дня + 3 часа
    location: 'Учебный центр',
  },
];

// Типизация для статистики
interface Stat {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

// Демо-данные для статистики
const demoStats: Stat[] = [
  {
    id: '1',
    title: 'Выполненные задачи',
    value: 24,
    change: 12,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'green',
  },
  {
    id: '2',
    title: 'Предстоящие события',
    value: 8,
    change: -3,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'blue',
  },
  {
    id: '3',
    title: 'Активные проекты',
    value: 12,
    change: 0,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'purple',
  },
  {
    id: '4',
    title: 'Время работы',
    value: '32ч 45м',
    change: 8,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'yellow',
  },
];

/**
 * Главная страница дашборда
 * Отображает все ключевые виджеты и информацию для пользователя
 */
export default function DashboardPage() {
  const handleAddTask = () => {
    // Будет реализовано в будущем
    console.log('Добавление новой задачи');
  };

  const handleViewAllTasks = () => {
    // Будет реализовано в будущем
    console.log('Просмотр всех задач');
  };

  const handleAddEvent = () => {
    // Будет реализовано в будущем
    console.log('Добавление нового события');
  };

  const handleViewAllEvents = () => {
    // Будет реализовано в будущем
    console.log('Просмотр всех событий');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
      
      {/* Статистика */}
      <StatsWidget stats={demoStats} />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Задачи */}
        <TaskWidget 
          tasks={demoTasks} 
          onAddTask={handleAddTask} 
          onViewAll={handleViewAllTasks} 
        />
        
        {/* Календарь */}
        <CalendarWidget 
          events={demoEvents} 
          onAddEvent={handleAddEvent} 
          onViewAll={handleViewAllEvents} 
        />
      </div>
      
      {/* AI-ассистент */}
      <AiAssistant />
    </div>
  );
}
