// Объявление типов для React
declare module 'react' {
  export = React;
}

declare module '@magic-mcp/ui' {
  export const Button: React.ComponentType<any>;
  export const Card: React.ComponentType<any>;
  export const Input: React.ComponentType<any>;
}
