// app/api/ai/generate-plan/route.js
import { generateLearningPlan } from '@/app/lib/ai/deepseek'

export async function POST(req) {
  try {
    const { topic, level, days = 30 } = await req.json()
    
    if (!topic || !level) {
      return Response.json(
        { error: 'Тема и уровень обязательны' },
        { status: 400 }
      )
    }

    const plan = await generateLearningPlan(topic, level, days)
    
    return Response.json({ 
      success: true,
      plan,
      structure: {
        hasProgram: true,
        hasPlan: true,
        hasFinalProject: true,
        days: days
      }
    })
    
  } catch (error) {
    console.error('Error generating plan:', error)
    return Response.json(
      { error: 'Ошибка генерации плана' },
      { status: 500 }
    )
  }
}