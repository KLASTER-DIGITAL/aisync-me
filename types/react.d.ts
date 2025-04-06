/**
 * Объявления типов для React
 * Этот файл решает проблемы с импортами React и его хуками
 */

// Разрешаем использование React как модуля с дефолтным экспортом
declare module 'react' {
  import React from 'react';
  export = React;
  export as namespace React;
  
  // Явное объявление хуков и типов, которые могут отсутствовать
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useContext: any;
  export const useReducer: any;
  export const useLayoutEffect: any;
  
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type FC<P = {}> = React.FC<P>;
  export type CSSProperties = React.CSSProperties;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
}
