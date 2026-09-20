/**
 * AI Vacancy Analyzer - Code Node
 * Обрабатывает ответ от YandexGPT API
 */

// Получаем сырой текст ответа от YandexGPT
const rawText = $input.first().json.result.alternatives[0].message.text;

// Очищаем от markdown-символов
const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

// Парсим JSON-строку в объект
const parsed = JSON.parse(cleanJson);

// Возвращаем структурированные данные
return {
    json: {
        должность: parsed.должность || "Не указано",
        зарплата: parsed.зарплата || "Не указано",
        навыки: Array.isArray(parsed.ключевые_навыки)
            ? parsed.ключевые_навыки.join(", ")
            : parsed.ключевые_навыки,
        оценка: parsed.соответствие_профилю_1_10 || 0
    }
};