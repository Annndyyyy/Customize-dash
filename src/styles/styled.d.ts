import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    widgetBackground: string;
    textPrimary: string;
    textSecondary: string;
    background: string;
    border: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  }
} 