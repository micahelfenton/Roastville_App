// src/lib/supabase.ts
// Supabase client configuration

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database type definitions (TypeScript)
export type Tenant = {
  id: string;
  shop_name: string;
  slug: string;
  shop_code: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  is_active: boolean;
};

export type Profile = {
  id: string;
  tenant_id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  tier: 'free' | 'seed' | 'sprout' | 'bloom';
  member_since: string;
  points: number;
  streak_days: number;
  order_count: number;
  lifetime_spend: number;
  default_order?: any;
  dietary_restrictions?: string[];
  favorite_items?: string[];
  is_staff: boolean;
  is_admin: boolean;
};

export type MenuItem = {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  category: 'coffee' | 'food' | 'merch' | 'beans';
  price: number;
  sale_price?: number;
  available: boolean;
  image_url?: string;
  dietary_tags?: string[];
  allergens?: string[];
  calories?: number;
  caffeine_mg?: number;
  customizations?: any;
};

export type Order = {
  id: string;
  tenant_id: string;
  user_id: string;
  order_number: string;
  items: any[];
  subtotal: number;
  tax: number;
  discount: number;
  tip: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  order_type: 'pickup' | 'delivery' | 'dine-in';
  pickup_time?: string;
  special_instructions?: string;
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  created_at: string;
};

export type Post = {
  id: string;
  tenant_id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
};

// Helper function to get current user's tenant ID
export async function getCurrentTenantId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single();

  return profile?.tenant_id || null;
}

// Helper function to get tenant by shop code
export async function getTenantByShopCode(shopCode: string) {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('shop_code', shopCode.toUpperCase())
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data as Tenant;
}