// app/lib/progress/tracker.js
import { supabase } from '../supabase'

export const trackSession = async (userId, topic, duration) => {
  const { data, error } = await supabase
    .from('learning_sessions')
    .insert({
      user_id: userId,
      topic,
      duration_minutes: duration,
      completed: true
    })
  
  if (error) throw error
  return data
}

export const updateSkillProgress = async (userId, skillName, progress) => {
  // Найти или создать навык
  const { data: existing } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId)
    .eq('name', skillName)
    .single()
  
  if (existing) {
    // Обновить существующий
    const newProgress = Math.min(100, existing.progress_percent + progress)
    await supabase
      .from('skills')
      .update({
        progress_percent: newProgress,
        last_practiced: new Date().toISOString(),
        level: Math.floor(newProgress / 20) + 1
      })
      .eq('id', existing.id)
  } else {
    // Создать новый
    await supabase
      .from('skills')
      .insert({
        user_id: userId,
        name: skillName,
        progress_percent: progress,
        level: 1
      })
  }
}