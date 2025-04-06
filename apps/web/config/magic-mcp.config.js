/**
 * Конфигурация для интеграции magic-mcp с проектом aisync.me
 */

module.exports = {
  apiKey: '4a5fc3f63ecf274de06e5108b4f8ab4243b1dcf8064ac80ef3a0cd1da096afa8',
  theme: {
    colors: {
      primary: {
        DEFAULT: '#4F46E5', // indigo-600
        50: '#EEF2FF',
        100: '#E0E7FF',
        200: '#C7D2FE',
        300: '#A5B4FC',
        400: '#818CF8',
        500: '#6366F1',
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
        950: '#1E1B4B',
      },
      secondary: {
        DEFAULT: '#8B5CF6', // violet-500
        50: '#F5F3FF',
        100: '#EDE9FE',
        200: '#DDD6FE',
        300: '#C4B5FD',
        400: '#A78BFA',
        500: '#8B5CF6',
        600: '#7C3AED',
        700: '#6D28D9',
        800: '#5B21B6',
        900: '#4C1D95',
        950: '#2E1065',
      },
      success: {
        DEFAULT: '#10B981', // emerald-500
      },
      warning: {
        DEFAULT: '#F59E0B', // amber-500
      },
      error: {
        DEFAULT: '#EF4444', // red-500
      },
    },
    fonts: {
      sans: ['Inter', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '0.5rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
  },
  components: {
    // Настройка компонентов magic-mcp
    button: {
      variants: {
        primary: {
          backgroundColor: 'primary',
          textColor: 'white',
        },
        secondary: {
          backgroundColor: 'secondary',
          textColor: 'white',
        },
        outline: {
          borderColor: 'primary',
          textColor: 'primary',
        },
        ghost: {
          textColor: 'primary',
          hoverBackgroundColor: 'primary-50',
        },
      },
    },
    card: {
      borderRadius: 'lg',
      shadow: 'md',
    },
    input: {
      borderRadius: 'md',
      borderColor: 'gray-300',
      focusBorderColor: 'primary',
    },
  },
};
