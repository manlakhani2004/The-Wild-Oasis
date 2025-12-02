import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://fwpgzkvwrrvsppfidkcu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGd6a3Z3cnJ2c3BwZmlka2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2MTY1NCwiZXhwIjoyMDc4NDM3NjU0fQ.mnjefZlCcMUNLvZh3E32_tp8LnHN9rYZhii6vSrWtSI"
//  process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)