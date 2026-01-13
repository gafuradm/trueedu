// app/api/ai/generate-plan/route.js
import { deepseek } from '../../../lib/ai/deepseek'

export async function POST(req) {
  const { topic, level, days = 30 } = await req.json()
  
  const prompt = `Создай учебный план на ${days} дней по теме: "${topic}"
Уровень ученика: ${level}

Формат:
ДЕНЬ 1: [Тема дня]
• Теория: [Краткое объяснение]
• Практика: [Конкретное задание]
• Проверка: [Как проверить понимание]

ДЕНЬ 2: ...
...

В конце добавь финальный проект, который объединит все знания.`

  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'Ты эксперт по созданию учебных планов' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  })

  return Response.json({ plan: response.choices[0].message.content })
}