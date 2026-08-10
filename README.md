# Vue Messenger

Тестовое SPA-приложение мессенджера.

## Стек технологий

- Vue 3.5
- TypeScript 5
- Vite 7
- Vue Router 4
- Pinia 3
- Tailwind CSS 4
- Vitest
- Vue Test Utils
- JSON Server

## Запуск приложения

Для локальной разработки необходимо запустить frontend и API server.

В первом терминале запустите API:

```bash
npm run server
```

API будет доступен по адресу:

```text
http://localhost:3001
```

Во втором терминале запустите приложение:

```bash
npm run dev
```

После запуска Vite выведет адрес приложения в терминале. По умолчанию:

```text
http://localhost:5173
```

## Авторизация

Для входа используйте тестовые данные:

```text
Логин: user
Пароль: password
```

При корректных данных API возвращает токен авторизации.
При использовании других данных сервер возвращает ошибку авторизации, которая отображается в интерфейсе.

## Архитектура

Проект организован с использованием подхода Feature-Sliced Design.
Основная структура:

```text
src/
├── app/
├── entities/
├── features/
├── pages/
├── shared/
├── widgets/
└── main.ts

server/
└── db.json

tests/
└── setup.ts
```

### Слои

`app` — инициализация приложения, router, Pinia и глобальные настройки.
`pages` — страницы приложения.
`widgets` — крупные самостоятельные части интерфейса, например список чатов и окно переписки.
`features` — пользовательские сценарии, например авторизация и отправка сообщения.
`entities` — бизнес-сущности приложения: чат, сообщение, сессия.
`shared` — переиспользуемый код, API-клиент, утилиты и общие типы.

## API

Для имитации backend используется JSON Server.
Данные находятся в:

```text
server/db.json
```

API содержит данные чатов и сообщений.

Основные endpoints:

```text
GET    /chats
GET    /messages
POST   /messages
PATCH  /chats/:id
```

## Тестирование

Для unit-тестирования используются:

- Vitest;
- Vue Test Utils;
- jsdom.

Запустить все тесты:

```bash
npm run test
```

Запустить тесты в watch-режиме:

```bash
npm run test:watch
```

Для отображения процентоного покрытия тестами, используется coverage:

```bash
npm run test:coverage
```

Тесты не требуют запущенного JSON Server: внешние API-зависимости мокируются.

## Сборка

Для production-сборки выполните:

```bash
npm run build
```

Команда выполняет проверку TypeScript через `vue-tsc` и production-сборку Vite.
Результат будет создан в директории:

```text
dist/
```

## Проверка production-сборки

После успешной сборки приложение можно локально запустить командой:

```bash
npm run preview
```

## Основные npm-команды

| Команда                 | Назначение                              |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Запуск frontend dev-сервера             |
| `npm run server`        | Запуск fake API server                  |
| `npm run test`          | Однократный запуск unit-тестов          |
| `npm run test:watch`    | Запуск тестов в watch-режиме            |
| `npm run test:coverage` | Запуск тестов с отчётом покрытия        |
| `npm run build`         | TypeScript-проверка и production-сборка |
| `npm run preview`       | Локальный просмотр production-сборки    |
