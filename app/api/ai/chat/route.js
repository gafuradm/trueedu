// app/api/ai/chat/route.js
import { deepseek, TUTOR_SYSTEM_PROMPT } from '../../../lib/ai/deepseek' // ← ИЗМЕНИТЬ
import { supabase } from '../../../lib/supabase' // ← ИЗМЕНИТЬ

export async function POST(req) {
  const { messages, userId } = await req.json()
  
  // Сохраняем историю в Supabase (бесплатно)
  if (userId) {
    await supabase
      .from('ai_conversations')
      .insert({
        user_id: userId,
        messages: JSON.stringify(messages.slice(-10)) // Последние 10 сообщений
      })
  }
  
  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: TUTOR_SYSTEM_PROMPT },
      ...messages
    ],
    stream: true,
    temperature: 0.7
  })
  
  // Возвращаем stream
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || ''
        controller.enqueue(encoder.encode(content))
      }
      controller.close()
    }
  })
  
  return new Response(stream)
}