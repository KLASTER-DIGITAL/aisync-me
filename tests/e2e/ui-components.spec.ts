import { test, expect } from '@playwright/test';

/**
 * Тесты для компонентов UI
 */
test.describe('Компоненты UI', () => {
  test('ThemeToggle должен переключать тему', async ({ page }) => {
    // Переходим на страницу дашборда, где есть ThemeToggle
    await page.goto('/dashboard');
    
    // Используем демо-аккаунт, если находимся на странице логина
    if (page.url().includes('/auth/login')) {
      await page.getByText('Демо-аккаунт').click();
      await page.waitForURL('**/dashboard', { timeout: 10000 });
    }
    
    // Находим кнопку переключения темы
    const themeToggle = await page.locator('button[aria-label="Переключить тему"]');
    
    // Делаем скриншот до переключения темы
    await page.screenshot({ path: 'tests/e2e/screenshots/theme-before.png', fullPage: true });
    
    // Проверяем текущую тему
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    // Кликаем на кнопку переключения темы
    await themeToggle.click();
    
    // Ждем применения темы
    await page.waitForTimeout(500);
    
    // Делаем скриншот после переключения темы
    await page.screenshot({ path: 'tests/e2e/screenshots/theme-after.png', fullPage: true });
    
    // Проверяем, что тема изменилась
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    expect(newTheme).not.toBe(initialTheme);
  });

  test('Notification должен отображаться корректно', async ({ page }) => {
    // Переходим на страницу дашборда
    await page.goto('/dashboard');
    
    // Используем демо-аккаунт, если находимся на странице логина
    if (page.url().includes('/auth/login')) {
      await page.getByText('Демо-аккаунт').click();
      await page.waitForURL('**/dashboard', { timeout: 10000 });
    }
    
    // Находим иконку уведомлений
    const notificationIcon = await page.locator('button[aria-label="Уведомления"]');
    
    // Делаем скриншот до открытия панели уведомлений
    await page.screenshot({ path: 'tests/e2e/screenshots/notification-closed.png', fullPage: false });
    
    // Кликаем на иконку уведомлений
    await notificationIcon.click();
    
    // Ждем открытия панели уведомлений
    await page.waitForSelector('.notifications-panel', { state: 'visible' });
    
    // Делаем скриншот открытой панели уведомлений
    await page.screenshot({ path: 'tests/e2e/screenshots/notification-open.png', fullPage: false });
    
    // Проверяем, что панель уведомлений видима
    await expect(page.locator('.notifications-panel')).toBeVisible();
  });

  test('AiAssistant должен отвечать на сообщения', async ({ page }) => {
    // Переходим на страницу дашборда
    await page.goto('/dashboard');
    
    // Используем демо-аккаунт, если находимся на странице логина
    if (page.url().includes('/auth/login')) {
      await page.getByText('Демо-аккаунт').click();
      await page.waitForURL('**/dashboard', { timeout: 10000 });
    }
    
    // Находим поле ввода сообщения
    const messageInput = await page.locator('input[placeholder*="Введите сообщение"]');
    
    // Вводим тестовое сообщение
    await messageInput.fill('Привет, как дела?');
    
    // Делаем скриншот перед отправкой сообщения
    await page.screenshot({ path: 'tests/e2e/screenshots/ai-assistant-before.png', fullPage: false });
    
    // Нажимаем Enter для отправки сообщения
    await messageInput.press('Enter');
    
    // Ждем ответа от AI Assistant
    await page.waitForSelector('.message.ai', { timeout: 10000 });
    
    // Делаем скриншот после получения ответа
    await page.screenshot({ path: 'tests/e2e/screenshots/ai-assistant-after.png', fullPage: false });
    
    // Проверяем, что ответ от AI Assistant отображается
    await expect(page.locator('.message.ai')).toBeVisible();
  });

  test('Проверка логов консоли на всех страницах', async ({ page }) => {
    // Массив для сбора ошибок консоли
    const consoleErrors: string[] = [];
    
    // Слушаем события консоли
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Ошибка консоли на ${page.url()}: ${msg.text()}`);
      }
    });
    
    // Список страниц для проверки
    const pages = [
      '/auth/login',
      '/auth/register',
      '/dashboard',
      '/calendar',
      '/tasks',
      '/settings'
    ];
    
    // Проверяем каждую страницу
    for (const path of pages) {
      // Переходим на страницу
      await page.goto(path);
      
      // Если это защищенная страница и мы попали на логин, используем демо-аккаунт
      if (page.url().includes('/auth/login') && path !== '/auth/login') {
        await page.getByText('Демо-аккаунт').click();
        await page.waitForURL(`**${path}`, { timeout: 10000 });
      }
      
      // Ждем загрузки страницы
      await page.waitForLoadState('networkidle');
      
      // Делаем скриншот страницы
      await page.screenshot({ path: `tests/e2e/screenshots/${path.replace(/\//g, '-')}.png`, fullPage: true });
    }
    
    // Проверяем, что в консоли нет ошибок
    expect(consoleErrors.length).toBe(0, `Обнаружены ошибки в консоли: ${consoleErrors.join('\n')}`);
  });
});
