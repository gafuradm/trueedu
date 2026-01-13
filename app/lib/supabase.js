import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://geuduonplouvdkfvfila.supabase.co'
const supabaseKey = 'sb_publishable_koPHNIceiXOLXe2S9fyRJQ_GUrmQ-PH'

export const supabase = createClient(supabaseUrl, supabaseKey)