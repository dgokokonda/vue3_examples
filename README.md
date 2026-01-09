# Vue 3 TypeScript Tutorial Project

Vue 3 приложение для управления заявками с системой аутентификации, виртуализированным списком пользователей и другими функциями.

## 🚀 Технологии

- **Vue 3** - прогрессивный JavaScript фреймворк
- **TypeScript** - типизированный JavaScript
- **Vue Router** - маршрутизация
- **Vuex** - управление состоянием
- **Vite** - инструмент сборки
- **Vue Virtual Scroller** - виртуализация списков
- **VeeValidate** - валидация форм
- **Axios** - HTTP клиент
- **SCSS** - препроцессор CSS

## 📋 Функциональность

### Основные возможности:

- **Управление заявками** - создание, просмотр, редактирование и удаление заявок
- **Система аутентификации** - вход и регистрация пользователей
- **Виртуализированный список пользователей** - эффективное отображение больших списков
- **Todo список** - управление задачами
- **Фильтрация и поиск** - поиск и фильтрация заявок
- **Адаптивный дизайн** - поддержка различных размеров экранов

### Страницы:

- `/` - Главная страница (список заявок)
- `/about` - О проекте
- `/todolist` - Список задач
- `/auth` - Авторизация
- `/request/:id` - Детали заявки
- `/list` - Виртуализированный список пользователей
- `/help` - Справка
- `/debug` - Отладочная страница

## 🛠️ Установка и запуск

### Требования

- Node.js 18+ 
- npm или yarn

### Установка зависимостей

```sh
npm install
```

### Запуск в режиме разработки

```sh
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для продакшена

```sh
npm run build
```

### Предпросмотр продакшен сборки

```sh
npm run preview
```

## 🧪 Тестирование

### Запуск unit тестов

```sh
npm run test:unit
```

### Запуск тестов с UI

```sh
npm run test:ui
```

### Покрытие кода тестами

```sh
npm run test:coverage
```

## 🔧 Дополнительные команды

### Проверка типов TypeScript

```sh
npm run type-check
```

### Линтинг кода

```sh
npm run lint
```

### Форматирование кода

```sh
npm run format
```

## 📁 Структура проекта

```
src/
├── assets/          # Статические ресурсы
├── components/      # Vue компоненты
│   ├── layout/     # Компоненты макетов
│   └── ui/         # UI компоненты
├── composables/    # Композиционные функции
├── router/         # Конфигурация роутера
├── store/          # Vuex store модули
├── services/       # API сервисы
├── types/          # TypeScript типы
├── utils/          # Утилиты
└── views/          # Страницы приложения
```

## 🎨 Рекомендуемые инструменты разработки

### IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (отключите Vetur).

### Браузерные расширения

- **Chrome/Edge/Brave:**
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Включите Custom Object Formatter в Chrome DevTools](http://bit.ly/object-formatters)

- **Firefox:**
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Включите Custom Object Formatter в Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📚 Документация

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Configuration Reference](https://vite.dev/config/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vuex Documentation](https://vuex.vuejs.org/)

## 📝 Лицензия

MIT
