// ***********************************************************
// Этот файл поддержки загружается автоматически перед тестами
// ***********************************************************

import './commands';

// Отключаем вывод консольных ошибок для тестов
Cypress.on('uncaught:exception', (err, runnable) => {
  // Возвращаем false, чтобы Cypress не завершался с ошибкой
  return false;
});
