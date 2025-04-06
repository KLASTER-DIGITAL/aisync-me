'use client';

import React from 'react';
import { NotificationType, BaseComponentProps } from '../../../../types/components';
import { cn } from '../../lib/utils';

export interface NotificationProps extends BaseComponentProps {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

/**
 * Компонент для отображения уведомлений пользователя
 * Поддерживает различные типы уведомлений и действия с ними
 */
export const Notification = ({
  id,
  title,
  message,
  type = 'info',
  timestamp,
  isRead,
  onRead,
  onDismiss,
}: NotificationProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-5 w-5 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} назад`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'} назад`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'минуту' : minutes < 5 ? 'минуты' : 'минут'} назад`;
    } else {
      return 'Только что';
    }
  };

  const handleRead = () => {
    if (onRead && !isRead) {
      onRead(id);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDismiss) {
      onDismiss(id);
    }
  };

  return (
    <div
      className={cn(
        "relative mb-4 rounded-lg border-l-4 p-4 shadow-md transition-all duration-300",
        "hover:shadow-lg cursor-pointer",
        getTypeStyles(),
        isRead ? 'opacity-70' : ''
      )}
      onClick={handleRead}
    >
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{title}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(timestamp)}</span>
          </div>
          <div className="mt-1 text-sm">{message}</div>
        </div>
        <button
          onClick={handleDismiss}
          className={cn(
            "ml-4 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
            "text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none",
            "dark:hover:bg-gray-700 dark:hover:text-gray-300",
            "transition-colors duration-200"
          )}
          aria-label="Закрыть"
        >
          <span className="sr-only">Закрыть</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {!isRead && (
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
      )}
    </div>
  );
};

export default Notification;
