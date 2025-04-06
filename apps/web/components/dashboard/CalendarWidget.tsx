'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface Event {
  id: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  location?: string;
  description?: string;
}

interface CalendarWidgetProps {
  events: Event[];
  onAddEvent?: () => void;
  onViewAll?: () => void;
}

/**
 * Виджет календаря для дашборда
 * Отображает список ближайших событий пользователя
 */
export const CalendarWidget = ({
  events = [],
  onAddEvent,
  onViewAll
}: CalendarWidgetProps) => {
  // Сортировка событий по дате начала
  const sortedEvents = [...events]
    .sort((a, b) => {
      const dateA = a.startDate instanceof Date ? a.startDate : new Date(a.startDate);
      const dateB = b.startDate instanceof Date ? b.startDate : new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5); // Показываем только 5 ближайших событий

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRange = (startDate: Date | string, endDate: Date | string) => {
    const startObj = startDate instanceof Date ? startDate : new Date(startDate);
    const endObj = endDate instanceof Date ? endDate : new Date(endDate);
    const isSameDay = startObj.toDateString() === endObj.toDateString();
    
    if (isSameDay) {
      return `${startObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - ${endObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return `${formatDate(startObj)} - ${formatDate(endObj)}`;
  };

  const isToday = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    const today = new Date();
    return dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();
  };

  const isTomorrow = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateObj.getDate() === tomorrow.getDate() &&
      dateObj.getMonth() === tomorrow.getMonth() &&
      dateObj.getFullYear() === tomorrow.getFullYear();
  };

  const getRelativeDay = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isToday(dateObj)) return 'Сегодня';
    if (isTomorrow(dateObj)) return 'Завтра';
    
    return dateObj.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long'
    });
  };

  const eventsList = sortedEvents.length > 0 ? (
    <ul className="space-y-3">
      {sortedEvents.map(event => (
        <li 
          key={event.id} 
          className="rounded-md border border-gray-200 bg-white p-3 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {getRelativeDay(event.startDate)}, {formatTimeRange(event.startDate, event.endDate)}
              </p>
              {event.location && (
                <p className="mt-1 text-xs text-gray-500">
                  <span className="inline-block align-middle">
                    <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  {event.location}
                </p>
              )}
            </div>
            <div className={`h-2 w-2 rounded-full ${isToday(event.startDate) ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
      <p className="text-sm text-gray-500">У вас пока нет запланированных событий</p>
      <p className="text-xs text-gray-400">Нажмите кнопку "Добавить событие", чтобы создать новое</p>
    </div>
  );

  // Используем явное указание children для компонентов, чтобы избежать ошибок линтера
  return (
    <Card children={
      <React.Fragment>
        <CardHeader children={<CardTitle children="Календарь" />} />
        <CardContent children={eventsList} />
        <CardFooter className="flex justify-between" children={
          <React.Fragment>
            <Button variant="outline" size="sm" onClick={onAddEvent} children="Добавить событие" />
            <Button variant="ghost" size="sm" onClick={onViewAll} children="Все события" />
          </React.Fragment>
        } />
      </React.Fragment>
    } />
  );
};

export default CalendarWidget;
