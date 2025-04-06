// ***********************************************
// Этот файл определяет пользовательские команды Cypress
// ***********************************************

// Команда для входа в систему через API
Cypress.Commands.add('loginByApi', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('auth-token', response.body.token);
  });
});

// Команда для создания скриншота с меткой времени
Cypress.Commands.add('takeSnapshot', (name: string) => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  cy.screenshot(`${name}-${timestamp}`);
});

// Команда для проверки состояния после действия с возможностью отката
Cypress.Commands.add('verifyWithRollback', (action: () => void, assertion: () => void, rollback: () => void) => {
  try {
    action();
    assertion();
  } catch (error) {
    rollback();
    throw error;
  }
});

// Объявление типов для TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(email: string, password: string): Chainable<void>;
      takeSnapshot(name: string): Chainable<void>;
      verifyWithRollback(action: () => void, assertion: () => void, rollback: () => void): Chainable<void>;
    }
  }
}
