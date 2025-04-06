describe('Главная страница', () => {
  beforeEach(() => {
    // Посещаем главную страницу перед каждым тестом
    cy.visit('/');
  });

  it('отображает заголовок и основные элементы', () => {
    // Проверяем наличие заголовка
    cy.contains('h1', 'AiSync.me').should('be.visible');
    
    // Проверяем наличие описания
    cy.contains('p', 'Ваш AI-ассистент для управления задачами').should('be.visible');
    
    // Проверяем наличие кнопок входа и регистрации
    cy.contains('a', 'Войти').should('be.visible');
    cy.contains('a', 'Регистрация').should('be.visible');
  });

  it('переходит на страницу входа при клике на кнопку "Войти"', () => {
    cy.contains('a', 'Войти').click();
    cy.url().should('include', '/auth/login');
  });

  it('переходит на страницу регистрации при клике на кнопку "Регистрация"', () => {
    cy.contains('a', 'Регистрация').click();
    cy.url().should('include', '/auth/register');
  });

  it('отображает информационные блоки о функциональности', () => {
    cy.contains('h2', 'Управление задачами').should('be.visible');
    cy.contains('h2', 'Планирование встреч').should('be.visible');
    cy.contains('h2', 'Автоматизация').should('be.visible');
  });
});
