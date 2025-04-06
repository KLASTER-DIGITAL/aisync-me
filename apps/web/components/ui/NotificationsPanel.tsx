import * as React from 'react';
import Notification from './Notification';
import { Notification as NotificationType } from '../../../../types/components';

interface NotificationsPanelProps {
  notifications: NotificationType[];
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  onReadNotification?: (id: string) => void;
  onDismissNotification?: (id: string) => void;
}

/**
 * Панель уведомлений для отображения списка уведомлений пользователя
 * Позволяет управлять уведомлениями (отметить как прочитанное, удалить)
 */
export const NotificationsPanel = ({
  notifications = [],
  onMarkAllAsRead,
  onClearAll,
  onReadNotification,
  onDismissNotification,
}: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div className="relative">
      {/* Кнопка уведомлений */}
      <button
        type="button"
        className="relative rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        onClick={togglePanel}
      >
        <span className="sr-only">Уведомления</span>
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Панель уведомлений */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Уведомления</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Прочитать все
                </button>
                <button
                  type="button"
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  onClick={handleClearAll}
                  disabled={notifications.length === 0}
                >
                  Очистить
                </button>
              </div>
            </div>

            <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    timestamp={notification.timestamp}
                    isRead={notification.isRead}
                    onRead={onReadNotification}
                    onDismiss={onDismissNotification}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  <svg
                    className="mx-auto mb-2 h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>У вас нет новых уведомлений</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
