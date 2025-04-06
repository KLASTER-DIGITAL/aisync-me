'use client';

import * as React from 'react';
import { VoiceAssistant } from '../../../components/ai/VoiceAssistant';
import { CommandProcessor, CreateTaskHandler, CreateEventHandler, HelpHandler } from '../../../lib/ai/commandParser';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

/**
 * Страница AI-ассистента в дашборде
 * Позволяет пользователю взаимодействовать с AI через голосовые команды
 */
export default function AssistantPage() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [lastResponse, setLastResponse] = React.useState('');
  const [commandHistory, setCommandHistory] = React.useState<Array<{command: string, response: string}>>([]);
  
  // Инициализация процессора команд
  const commandProcessorRef = React.useRef<CommandProcessor | null>(null);
  
  React.useEffect(() => {
    // Создаем процессор команд при монтировании компонента
    const processor = new CommandProcessor();
    
    // Добавляем обработчики команд
    // Здесь будут реальные сервисы для работы с задачами и событиями
    processor.addHandler(new CreateTaskHandler({}));
    processor.addHandler(new CreateEventHandler({}));
    processor.addHandler(new HelpHandler());
    
    commandProcessorRef.current = processor;
    
    // Приветственное сообщение
    setLastResponse('Привет! Я ваш голосовой ассистент. Чем могу помочь?');
  }, []);
  
  // Обработчик команд от голосового ассистента
  const handleCommand = async (command: string) => {
    if (!command.trim() || !commandProcessorRef.current) return;
    
    setIsProcessing(true);
    
    try {
      // Обрабатываем команду
      const result = await commandProcessorRef.current.processCommand(command);
      
      // Обновляем последний ответ
      setLastResponse(result.message);
      
      // Добавляем команду и ответ в историю
      setCommandHistory(prev => [...prev, { command, response: result.message }]);
    } catch (error) {
      setLastResponse(`Произошла ошибка при обработке команды: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">AI-ассистент</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Колонка с голосовым ассистентом */}
        <div className="md:col-span-2">
          <VoiceAssistant 
            onCommand={handleCommand}
            isProcessing={isProcessing}
            lastResponse={lastResponse}
          />
        </div>
        
        {/* Колонка с историей команд */}
        <div className="md:col-span-1">
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">История команд</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {commandHistory.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">История команд пуста</p>
              ) : (
                <div className="space-y-4">
                  {commandHistory.map((item: {command: string, response: string}, index: number) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Вы: {item.command}</p>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">Ассистент: {item.response}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Секция с подсказками */}
      <Card className="mt-6 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Примеры команд</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <h3 className="font-medium text-blue-600 dark:text-blue-400">Задачи</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>"Создай задачу подготовить отчет"</li>
                <li>"Покажи все задачи"</li>
                <li>"Заверши задачу позвонить клиенту"</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <h3 className="font-medium text-blue-600 dark:text-blue-400">События</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>"Создай встречу с командой"</li>
                <li>"Покажи все события"</li>
                <li>"Добавь событие презентация проекта"</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <h3 className="font-medium text-blue-600 dark:text-blue-400">Помощь</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>"Помощь"</li>
                <li>"Что ты умеешь?"</li>
                <li>"Покажи список команд"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
