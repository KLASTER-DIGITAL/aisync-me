import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../../../components/ui/Input';
import '@testing-library/jest-dom';

describe('Input компонент', () => {
  test('рендерится корректно', () => {
    render(<Input id="test-input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('отображает label, если он передан', () => {
    render(<Input id="test-input" label="Тестовый ввод" />);
    expect(screen.getByText('Тестовый ввод')).toBeInTheDocument();
  });

  test('отображает звездочку, если поле обязательное', () => {
    render(<Input id="test-input" label="Тестовый ввод" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('отображает сообщение об ошибке, если оно передано', () => {
    const errorMessage = 'Это поле обязательно для заполнения';
    render(<Input id="test-input" error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('применяет fullWidth класс, если передан соответствующий prop', () => {
    render(<Input id="test-input" fullWidth />);
    const inputContainer = screen.getByRole('textbox').parentElement?.parentElement;
    expect(inputContainer).toHaveClass('w-full');
  });

  test('передает дополнительные атрибуты в input', () => {
    render(<Input id="test-input" placeholder="Введите текст" maxLength={10} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Введите текст');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
