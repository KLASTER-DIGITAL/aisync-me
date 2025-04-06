/**
 * Модуль для парсинга и обработки команд AI-ассистента
 * Анализирует текстовые и голосовые команды и выполняет соответствующие действия
 */

import { TaskModel as Task, EventModel as Event, TaskPriorityExtended } from '../../../../types';

// Типы команд, которые может обрабатывать ассистент
export enum CommandType {
  UNKNOWN = 'unknown',
  CREATE_TASK = 'create_task',
  COMPLETE_TASK = 'complete_task',
  LIST_TASKS = 'list_tasks',
  CREATE_EVENT = 'create_event',
  LIST_EVENTS = 'list_events',
  HELP = 'help',
}

// Интерфейс для результата парсинга команды
export interface ParsedCommand {
  type: CommandType;
  params: Record<string, any>;
  originalText: string;
  confidence: number; // 0-1, насколько уверенно распознана команда
}

// Интерфейс для результата выполнения команды
export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
}

// Интерфейс для обработчика команд
export interface CommandHandler {
  canHandle(command: ParsedCommand): boolean;
  handle(command: ParsedCommand): Promise<CommandResult>;
}

// Базовые регулярные выражения для распознавания команд
const COMMAND_PATTERNS = {
  CREATE_TASK: [
    /создай (задачу|таск|task) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /добавь (задачу|таск|task) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /новая (задача|таск|task) (?:с названием |под названием |)["']?([^"']+)["']?/i,
  ],
  COMPLETE_TASK: [
    /заверши(?:ть)? (задачу|таск|task) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /выполни(?:ть)? (задачу|таск|task) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /отметь(?:ть)? (задачу|таск|task) (?:с названием |под названием |)["']?([^"']+)["']? как выполненную/i,
  ],
  LIST_TASKS: [
    /покажи (?:все |мои |)(задачи|таски|tasks)/i,
    /список (?:всех |моих |)(задач|тасков|tasks)/i,
    /(?:все |мои |)(задачи|таски|tasks)/i,
  ],
  CREATE_EVENT: [
    /создай (событие|встречу|мероприятие|event) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /добавь (событие|встречу|мероприятие|event) (?:с названием |под названием |)["']?([^"']+)["']?/i,
    /новое (событие|встреча|мероприятие|event) (?:с названием |под названием |)["']?([^"']+)["']?/i,
  ],
  LIST_EVENTS: [
    /покажи (?:все |мои |)(события|встречи|мероприятия|events)/i,
    /список (?:всех |моих |)(событий|встреч|мероприятий|events)/i,
    /(?:все |мои |)(события|встречи|мероприятия|events)/i,
  ],
  HELP: [
    /помощь/i,
    /справка/i,
    /помоги/i,
    /что ты умеешь/i,
    /команды/i,
    /help/i,
  ],
};

/**
 * Парсит текстовую команду и определяет её тип и параметры
 * @param text Текст команды от пользователя
 * @returns Распознанная команда с параметрами
 */
export function parseCommand(text: string): ParsedCommand {
  // Удаляем лишние пробелы и приводим к нижнему регистру для упрощения сравнения
  const normalizedText = text.trim();
  
  // Проверяем каждый тип команды
  for (const [commandType, patterns] of Object.entries(COMMAND_PATTERNS)) {
    for (const pattern of patterns) {
      const match = normalizedText.match(pattern);
      
      if (match) {
        // Команда распознана, извлекаем параметры
        const params: Record<string, any> = {};
        
        switch (commandType) {
          case 'CREATE_TASK':
          case 'COMPLETE_TASK':
            params.title = match[2] || '';
            break;
            
          case 'CREATE_EVENT':
            params.title = match[2] || '';
            // Здесь можно добавить извлечение даты и времени из текста
            break;
        }
        
        return {
          type: CommandType[commandType as keyof typeof CommandType],
          params,
          originalText: text,
          confidence: 0.8, // Базовое значение уверенности
        };
      }
    }
  }
  
  // Если команда не распознана, возвращаем UNKNOWN
  return {
    type: CommandType.UNKNOWN,
    params: {},
    originalText: text,
    confidence: 0.3,
  };
}

/**
 * Класс для обработки команд создания задач
 */
export class CreateTaskHandler implements CommandHandler {
  private taskService: any; // Здесь должен быть сервис для работы с задачами
  
  constructor(taskService: any) {
    this.taskService = taskService;
  }
  
  canHandle(command: ParsedCommand): boolean {
    return command.type === CommandType.CREATE_TASK;
  }
  
  async handle(command: ParsedCommand): Promise<CommandResult> {
    try {
      const { title } = command.params;
      
      if (!title) {
        return {
          success: false,
          message: 'Не указано название задачи',
        };
      }
      
      // Создаем новую задачу
      const task: Partial<Task> = {
        title,
        dueDate: null, // По умолчанию без срока
        priority: 'medium' as TaskPriorityExtended, // По умолчанию средний приоритет
        status: 'pending',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Здесь должен быть вызов сервиса для сохранения задачи
      // const savedTask = await this.taskService.createTask(task);
      
      return {
        success: true,
        message: `Задача "${title}" успешно создана`,
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: `Ошибка при создании задачи: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      };
    }
  }
}

/**
 * Класс для обработки команд создания событий
 */
export class CreateEventHandler implements CommandHandler {
  private eventService: any; // Здесь должен быть сервис для работы с событиями
  
  constructor(eventService: any) {
    this.eventService = eventService;
  }
  
  canHandle(command: ParsedCommand): boolean {
    return command.type === CommandType.CREATE_EVENT;
  }
  
  async handle(command: ParsedCommand): Promise<CommandResult> {
    try {
      const { title } = command.params;
      
      if (!title) {
        return {
          success: false,
          message: 'Не указано название события',
        };
      }
      
      // Создаем новое событие
      const now = new Date();
      const startDate = new Date(now.getTime() + 3600000); // Через час от текущего времени
      const endDate = new Date(now.getTime() + 7200000); // Через 2 часа от текущего времени
      
      const event: Partial<Event> = {
        title,
        startDate,
        endDate,
        createdAt: now,
        updatedAt: now,
      };
      
      // Здесь должен быть вызов сервиса для сохранения события
      // const savedEvent = await this.eventService.createEvent(event);
      
      return {
        success: true,
        message: `Событие "${title}" успешно создано на ${startDate.toLocaleString()}`,
        data: event,
      };
    } catch (error) {
      return {
        success: false,
        message: `Ошибка при создании события: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      };
    }
  }
}

/**
 * Класс для обработки команд помощи
 */
export class HelpHandler implements CommandHandler {
  canHandle(command: ParsedCommand): boolean {
    return command.type === CommandType.HELP;
  }
  
  async handle(command: ParsedCommand): Promise<CommandResult> {
    const helpMessage = `
Я могу помочь вам с управлением задачами и событиями. Вот что я умею:

1. Создание задач:
   - "Создай задачу подготовить отчет"
   - "Добавь задачу позвонить клиенту"

2. Управление задачами:
   - "Заверши задачу подготовить отчет"
   - "Покажи все задачи"

3. Создание событий:
   - "Создай встречу с командой разработки"
   - "Добавь событие презентация проекта"

4. Управление событиями:
   - "Покажи все события"

Вы можете уточнять команды, добавляя детали, например:
"Создай задачу подготовить отчет с приоритетом высокий и сроком завтра"
    `;
    
    return {
      success: true,
      message: helpMessage,
    };
  }
}

/**
 * Главный класс для обработки команд
 * Использует паттерн "Цепочка обязанностей" для обработки команд
 */
export class CommandProcessor {
  private handlers: CommandHandler[] = [];
  
  constructor() {
    // Здесь будут инициализированы обработчики команд
  }
  
  /**
   * Добавляет обработчик команд в цепочку
   * @param handler Обработчик команд
   */
  addHandler(handler: CommandHandler): void {
    this.handlers.push(handler);
  }
  
  /**
   * Обрабатывает команду
   * @param text Текст команды от пользователя
   * @returns Результат выполнения команды
   */
  async processCommand(text: string): Promise<CommandResult> {
    // Парсим команду
    const parsedCommand = parseCommand(text);
    
    // Если команда не распознана, пытаемся использовать AI для её интерпретации
    if (parsedCommand.type === CommandType.UNKNOWN) {
      // Здесь будет вызов OpenAI API для интерпретации команды
      // Пока просто возвращаем сообщение о том, что команда не распознана
      return {
        success: false,
        message: 'Извините, я не понимаю эту команду. Попробуйте сказать иначе или спросите "помощь" для получения списка доступных команд.',
      };
    }
    
    // Ищем подходящий обработчик
    for (const handler of this.handlers) {
      if (handler.canHandle(parsedCommand)) {
        return await handler.handle(parsedCommand);
      }
    }
    
    // Если не нашли подходящий обработчик
    return {
      success: false,
      message: 'Извините, я пока не умею выполнять эту команду.',
    };
  }
}
