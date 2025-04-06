import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BaseComponentProps } from '../../../../types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardNavProps extends BaseComponentProps {
  items: NavItem[];
}

/**
 * Компонент навигации для дашборда
 * Отображает список ссылок с иконками и выделяет активную страницу
 */
export const DashboardNav = ({ items, className = '' }: DashboardNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${isActive 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
            `}
          >
            <span className={`mr-3 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {item.icon}
            </span>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
