# Пошаговая инструкция по созданию AI-анализатора вакансий

## Предварительные требования

- Аккаунт на [n8n.cloud](https://app.n8n.cloud) (14 дней бесплатно)
- Аккаунт в Яндекс.Облаке
- Аккаунт Google

## Шаг 1: Настройка Яндекс.Облака

### 1.1 Создание каталога

1. Зайди в [Yandex Cloud Console](https://console.cloud.yandex.ru)
2. Нажми **"+ Создать ресурс"** → **"Каталог"**
3. Назови его `ai-workflows`
4. Скопируй **Folder ID** (выглядит как `b1g...`)

### 1.2 Создание сервисного аккаунта

1. В меню выбери **IAM** → **Сервисные аккаунты**
2. Нажми **"Создать сервисный аккаунт"**
3. Имя: `gpt-analyst`
4. Назначь роль: **`ai.languageModels.user`**

### 1.3 Создание API-ключа

1. В списке аккаунтов нажми на `gpt-analyst`
2. Перейди во вкладку **"API-ключи"**
3. Нажми **"Создать API-ключ"**
4. Область действия: выбери свой каталог
5. **Скопируй ключ** (начинается с `AQVN...`) — он покажется один раз!

## Шаг 2: Создание воркфлоу в n8n

### 2.1 Создание workflow

1. Зайди в [app.n8n.cloud](https://app.n8n.cloud)
2. Нажми **"Workflows"** → **"Add workflow"**

### 2.2 Добавление узлов

#### Узел 1: Manual Trigger

1. Нажми **"+"** → найди **"Manual Trigger"**
2. Это кнопка запуска воркфлоу

#### Узел 2: Edit Fields

1. Нажми **"+"** после Manual Trigger
2. Найди **"Edit Fields"** (или "Set")
3. Добавь поле:
   - **Name:** `vacancy_text`
   - **Value:** текст вакансии

#### Узел 3: HTTP Request

1. Нажми **"+"** → найди **"HTTP Request"**
2. Настройки:
   - **Method:** `POST`
   - **URL:** `https://llm.api.cloud.yandex.net/foundationModels/v1/completion`
   - **Send Headers:** включи (зелёный)
     - Header 1: `Authorization` = `Api-Key ТВОЙ_API_КЛЮЧ`
     - Header 2: `Content-Type` = `application/json`
   - **Send Body:** включи
   - **Body Content Type:** `JSON`
   - **JSON:** (см. README.md)

#### Узел 4: Code (JavaScript)

1. Нажми **"+"** → найди **"Code"**
2. Выбери **"Code in JavaScript"**
3. **Mode:** `Run Once for All Items`
4. Вставь код из README.md

#### Узел 5: Google Sheets

1. Нажми **"+"** → найди **"Google Sheets"**
2. Настройки:
   - **Credential:** нажми "Sign in with Google"
   - **Operation:** `Append Row`
   - **Document:** выбери свою таблицу
   - **Sheet:** `Sheet1`

### 2.3 Тестирование

1. Нажми **"Test workflow"**
2. Проверь зелёные галочки
3. Открой Google Таблицу

## Готово!