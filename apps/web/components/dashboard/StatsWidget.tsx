'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface Stat {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

interface StatsWidgetProps {
  stats: Stat[];
}

/**
 * Виджет статистики для дашборда
 * Отображает ключевые метрики пользователя
 */
export const StatsWidget = ({ stats = [] }: StatsWidgetProps) => {
  const getColorClass = (color: Stat['color']) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    }
    if (change < 0) {
      return (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id}>
          <Card children={
            <CardContent className="p-4" children={
              <div className="flex items-center">
                <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${getColorClass(stat.color)}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    {stat.change !== undefined && (
                      <p className={`ml-2 flex items-center text-xs ${getChangeColor(stat.change)}`}>
                        {getChangeIcon(stat.change)}
                        <span className="ml-0.5">{Math.abs(stat.change)}%</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            } />
          } />
        </div>
      ))}
    </div>
  );
};

export default StatsWidget;
