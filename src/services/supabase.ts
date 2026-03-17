import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Adicione suas variáveis de ambiente do Supabase aqui ou no seu .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://sua-url-aqui.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sua-anon-key-aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
