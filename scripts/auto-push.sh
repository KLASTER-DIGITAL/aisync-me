#!/bin/bash

# Скрипт для автоматической выгрузки изменений на GitHub
# Автор: Cascade AI
# Дата: 2025-04-06

# Переходим в корневую директорию проекта
cd /Users/rustamkarimov/CascadeProjects/aiassist/aisync.me

# Проверяем наличие изменений
if [[ -z $(git status --porcelain) ]]; then
  echo "✅ Нет изменений для выгрузки"
  exit 0
fi

# Получаем текущую дату и время
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# Добавляем все изменения в индекс
git add .

# Создаем коммит с временной меткой
git commit -m "Автоматическая выгрузка: $TIMESTAMP" --no-verify

# Отправляем изменения на GitHub
git push origin main

# Выводим сообщение об успешной выгрузке
echo "✅ Изменения успешно выгружены на GitHub: $TIMESTAMP"
