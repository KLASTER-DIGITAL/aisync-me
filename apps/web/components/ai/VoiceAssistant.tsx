import * as React from 'react';
import { BaseComponentProps } from '../../../../types';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';

interface VoiceAssistantProps extends BaseComponentProps {
  onCommand?: (command: string) => void;
  isProcessing?: boolean;
  lastResponse?: string;
}

/**
 * Компонент голосового AI-ассистента
 * Позволяет пользователю взаимодействовать с AI через голосовые команды
 */
export const VoiceAssistant = ({
  onCommand,
  isProcessing = false,
  lastResponse = '',
  className = '',
}: VoiceAssistantProps) => {
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  
  // Ссылка на объект распознавания речи
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  
  // Инициализация распознавания речи при монтировании компонента
  React.useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Настройка распознавания речи
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ru-RU'; // Русский язык
        
        // Обработчики событий
        recognitionRef.current.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          
          // Вызываем обработчик команды, если он предоставлен
          if (onCommand) {
            onCommand(result);
          }
        };
        
        recognitionRef.current.onerror = (event) => {
          setError(`Ошибка распознавания: ${event.error}`);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    } else {
      setError('Распознавание речи не поддерживается вашим браузером.');
    }
    
    // Очистка при размонтировании
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onCommand]);
  
  // Функция для начала прослушивания
  const startListening = () => {
    setError(null);
    setTranscript('');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setError('Не удалось начать распознавание речи.');
        setIsListening(false);
      }
    }
  };
  
  // Функция для остановки прослушивания
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg 
            className="mr-2 h-5 w-5 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
            />
          </svg>
          Голосовой ассистент
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
              {error}
            </div>
          )}
          
          {transcript && (
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Ваша команда:</p>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{transcript}</p>
            </div>
          )}
          
          {lastResponse && (
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Ответ ассистента:</p>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{lastResponse}</p>
            </div>
          )}
          
          <div className="flex justify-center">
            {isListening ? (
              <div className="flex items-center">
                <div className="mr-4 flex space-x-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Слушаю...</span>
              </div>
            ) : isProcessing ? (
              <div className="flex items-center">
                <div className="mr-4 h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Обрабатываю команду...</span>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button
          variant={isListening ? 'outline' : 'primary'}
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className="flex items-center"
        >
          {isListening ? (
            <>
              <svg 
                className="mr-2 h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" 
                />
              </svg>
              Остановить
            </>
          ) : (
            <>
              <svg 
                className="mr-2 h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                />
              </svg>
              Начать запись
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceAssistant;

// Добавляем типы для Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
