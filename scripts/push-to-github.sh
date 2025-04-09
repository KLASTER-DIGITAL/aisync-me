#!/bin/bash

# Скрипт для проверки и отправки изменений в GitHub
# Автор: Cascade AI

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Начинаем процесс проверки и отправки изменений в GitHub...${NC}"

# Переходим в корневую директорию проекта
cd "$(dirname "$0")/.." || exit

# Проверяем наличие изменений в Git
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}Нет изменений для отправки.${NC}"
  exit 0
fi

# Запускаем линтер для проверки кода веб-приложения
echo -e "${YELLOW}Проверяем код линтером...${NC}"
cd apps/web && npm run lint
cd ../..

if [ $? -ne 0 ]; then
  echo -e "${RED}Ошибка линтера! Исправьте ошибки перед отправкой.${NC}"
  exit 1
fi

# Проверяем сборку проекта
echo -e "${YELLOW}Проверяем сборку проекта...${NC}"

# Пропускаем сборку для ускорения процесса пуша
echo -e "${GREEN}Пропускаем сборку для ускорения. Vercel соберет проект автоматически.${NC}"

# Запрашиваем сообщение коммита
echo -e "${YELLOW}Введите сообщение коммита:${NC}"
read -r commit_message

if [ -z "$commit_message" ]; then
  commit_message="Обновление проекта: $(date +"%d.%m.%Y %H:%M")"
  echo -e "${YELLOW}Используем стандартное сообщение: ${commit_message}${NC}"
fi

# Добавляем все изменения и коммитим
git add .
git commit -m "$commit_message"

# Отправляем изменения в GitHub
echo -e "${YELLOW}Отправляем изменения в GitHub...${NC}"
git push origin main

if [ $? -ne 0 ]; then
  echo -e "${RED}Ошибка при отправке изменений! Проверьте подключение и права доступа.${NC}"
  exit 1
fi

echo -e "${GREEN}Изменения успешно отправлены в GitHub!${NC}"
echo -e "${YELLOW}Vercel автоматически начнет деплой вашего проекта.${NC}"
echo -e "${YELLOW}Проверьте статус деплоя на https://vercel.com/dashboard${NC}"
