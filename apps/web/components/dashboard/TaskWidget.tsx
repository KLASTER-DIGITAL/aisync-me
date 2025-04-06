'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface Task {
  id: string;
  title: string;
  dueDate: Date | null;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface TaskWidgetProps {
  tasks: Task[];
  onAddTask?: () => void;
  onViewAll?: () => void;
}

/**
 * Виджет задач для дашборда
 * Отображает список ближайших задач пользователя
 */
export const TaskWidget = ({ 
  tasks = [], 
  onAddTask, 
  onViewAll 
}: TaskWidgetProps) => {
  // Приоритизация и сортировка задач
  const sortedTasks = [...tasks]
    .filter(task => !task.completed)
    .sort((a, b) => {
      // Сначала сортируем по приоритету
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Затем по сроку выполнения
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }
      
      return 0;
    })
    .slice(0, 5); // Показываем только 5 задач
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'Без срока';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);
    
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Сегодня';
    if (diffDays === 1) return 'Завтра';
    if (diffDays < 0) return `Просрочено (${Math.abs(diffDays)} дн.)`;
    if (diffDays <= 7) return `Через ${diffDays} дн.`;
    
    return date.toLocaleDateString('ru-RU');
  };

  const tasksList = sortedTasks.length > 0 ? (
    <ul className="space-y-3">
      {sortedTasks.map(task => (
        <li 
          key={task.id} 
          className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm"
        >
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-gray-300 text-indigo-600" 
              checked={task.completed}
              readOnly
            />
            <span className="ml-3 text-sm font-medium text-gray-700">{task.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
            </span>
            <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
      <p className="text-sm text-gray-500">У вас пока нет активных задач</p>
      <p className="text-xs text-gray-400">Нажмите кнопку "Добавить задачу", чтобы создать новую</p>
    </div>
  );

  // Используем явное указание children для компонентов, чтобы избежать ошибок линтера
  return (
    <Card children={
      <React.Fragment>
        <CardHeader children={<CardTitle children="Задачи" />} />
        <CardContent children={tasksList} />
        <CardFooter className="flex justify-between" children={
          <React.Fragment>
            <Button variant="outline" size="sm" onClick={onAddTask} children="Добавить задачу" />
            <Button variant="ghost" size="sm" onClick={onViewAll} children="Все задачи" />
          </React.Fragment>
        } />
      </React.Fragment>
    } />
  );
};

export default TaskWidget;
