'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date | string;
}

/**
 * Компонент AI-ассистента
 * Предоставляет интерфейс для общения с AI через текстовые команды
 */
export const AiAssistant = () => {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>(() => {
    // Используем фиксированную строку времени для предотвращения ошибок гидратации
    return [
      {
        id: '1',
        content: 'Привет! Я ваш AI-ассистент. Чем я могу вам помочь сегодня?',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Имитация ответа от AI (в реальном приложении здесь будет запрос к API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Я получил вашу команду: "${userMessage.content}". Скоро эта функция будет реализована полностью.`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev: Message[]) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle>AI-ассистент</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="mb-4 flex-1 overflow-y-auto rounded-md bg-gray-50 p-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800 shadow'
                }`}
              >
                <p>{message.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {typeof message.timestamp === 'string' 
                    ? message.timestamp 
                    : message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex space-x-1 rounded-lg bg-white px-4 py-2 shadow">
                <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <Input
            type="text"
            placeholder="Введите команду..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            fullWidth
            className="mr-2"
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiAssistant;
