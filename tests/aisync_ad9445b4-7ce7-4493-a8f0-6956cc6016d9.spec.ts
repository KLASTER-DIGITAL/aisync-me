
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('AiSync_2025-04-05', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:3005/auth/login');

    // Take screenshot
    await page.screenshot({ path: 'login-page.png', { fullPage: true } });

    // Click element
    await page.click('button:has-text("Показать демо-аккаунты")');

    // Navigate to URL
    await page.goto('http://localhost:3006/auth/login');

    // Take screenshot
    await page.screenshot({ path: 'login-page-updated.png', { fullPage: true } });

    // Click element
    await page.click('button:has-text("Показать демо-аккаунты")');

    // Take screenshot
    await page.screenshot({ path: 'demo-accounts.png', { fullPage: true } });

    // Click element
    await page.click('button:has-text("Супер-админ")');

    // Take screenshot
    await page.screenshot({ path: 'dashboard-overview.png', { fullPage: true } });

    // Fill input field
    await page.fill('input[placeholder="Напишите сообщение..."]', 'Покажи мои задачи на сегодня');

    // Fill input field
    await page.fill('input[placeholder="Введите команду..."]', 'Покажи мои задачи на сегодня');

    // Click element
    await page.click('button:has-text("Отправить")');

    // Take screenshot
    await page.screenshot({ path: 'ai-assistant-response.png' });

    // Click element
    await page.click('button:has-text("Добавить задачу")');

    // Take screenshot
    await page.screenshot({ path: 'add-task-form.png' });
});