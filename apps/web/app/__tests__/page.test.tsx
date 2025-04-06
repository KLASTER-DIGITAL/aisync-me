import { render, screen } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

describe('Главная страница', () => {
  it('отображает заголовок и кнопки входа/регистрации', () => {
    render(<Home />);
    
    // Проверяем наличие заголовка
    expect(screen.getByText('AiSync.me')).toBeInTheDocument();
    
    // Проверяем наличие описания
    expect(
      screen.getByText('Ваш AI-ассистент для управления задачами, планирования встреч и автоматизации бизнес-процессов')
    ).toBeInTheDocument();
    
    // Проверяем наличие кнопок входа и регистрации
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    
    // Проверяем наличие блоков с описанием функциональности
    expect(screen.getByText('Управление задачами')).toBeInTheDocument();
    expect(screen.getByText('Планирование встреч')).toBeInTheDocument();
    expect(screen.getByText('Автоматизация')).toBeInTheDocument();
  });
});
