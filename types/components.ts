/**
 * Типы для компонентов UI
 */

import React from 'react';
type ReactNode = React.ReactNode;

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export type CardVariant = 'default' | 'bordered' | 'elevated';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeType = 'light' | 'dark';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
