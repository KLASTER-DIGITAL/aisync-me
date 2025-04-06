module.exports = {
  // Запускаем ESLint для JS/TS/TSX файлов
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  
  // Запускаем Prettier для других файлов
  '**/*.{json,css,scss,md}': ['prettier --write'],
  
  // Запускаем тесты только для измененных компонентов
  'apps/web/components/**/*.{ts,tsx}': [
    (files) => {
      const tests = files
        .map(file => {
          const component = file.split('/').pop().replace(/\.(ts|tsx)$/, '');
          return `npm run test -- -t "${component}"`;
        })
        .join(' && ');
      return tests.length ? tests : 'echo "No component tests to run"';
    },
  ],
};
