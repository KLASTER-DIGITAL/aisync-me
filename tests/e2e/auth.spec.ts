import { test, expect } from '@playwright/test';

/**
 * Тесты для страницы авторизации
 */
test.describe('Страница авторизации', () => {
  test('должна загружаться без ошибок в консоли', async ({ page }) => {
    // Массив для сбора ошибок консоли
    const consoleErrors: string[] = [];
    
    // Слушаем события консоли
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Ошибка консоли: ${msg.text()}`);
      }
    });

    // Переходим на страницу авторизации
    await page.goto('/auth/login');
    
    // Делаем скриншот страницы
    await page.screenshot({ path: 'tests/e2e/screenshots/login-page.png', fullPage: true });
    
    // Проверяем, что страница загрузилась
    await expect(page).toHaveTitle(/AiSync/);
    
    // Проверяем наличие основных элементов UI
    await expect(page.getByRole('heading', { name: /Вход/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Пароль/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Войти/i })).toBeVisible();
    
    // Проверяем, что в консоли нет ошибок
    expect(consoleErrors.length).toBe(0, `Обнаружены ошибки в консоли: ${consoleErrors.join('\n')}`);
  });

  test('должна отображать ошибку при неверных учетных данных', async ({ page }) => {
    // Переходим на страницу авторизации
    await page.goto('/auth/login');
    
    // Вводим неверные учетные данные
    await page.getByPlaceholder(/Email/i).fill('invalid@example.com');
    await page.getByPlaceholder(/Пароль/i).fill('wrongpassword');
    
    // Нажимаем кнопку входа
    await page.getByRole('button', { name: /Войти/i }).click();
    
    // Ждем появления сообщения об ошибке
    const errorMessage = await page.waitForSelector('.text-red-500', { timeout: 5000 });
    
    // Делаем скриншот с ошибкой
    await page.screenshot({ path: 'tests/e2e/screenshots/login-error.png', fullPage: true });
    
    // Проверяем, что сообщение об ошибке отображается
    expect(await errorMessage.isVisible()).toBeTruthy();
  });

  test('должна перенаправлять на дашборд при успешной авторизации', async ({ page }) => {
    // Переходим на страницу авторизации
    await page.goto('/auth/login');
    
    // Используем демо-аккаунт
    await page.getByText('Демо-аккаунт').click();
    
    // Ждем перенаправления на дашборд
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    // Делаем скриншот дашборда
    await page.screenshot({ path: 'tests/e2e/screenshots/dashboard.png', fullPage: true });
    
    // Проверяем, что мы на странице дашборда
    expect(page.url()).toContain('/dashboard');
    
    // Проверяем наличие основных элементов дашборда
    await expect(page.getByRole('heading', { name: /Дашборд/i })).toBeVisible();
  });
});
