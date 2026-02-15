// src/lib/AuthContext.tsx
// Updated with REAL Supabase authentication

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Profile } from "./supabase";
import { Session } from "@supabase/supabase-js";

type User = Profile & {
  email?: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  signup: (email: string, password: string, fullName: string, shopCode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user profile from database
  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Get user email from auth
      const { data: { user: authUser } } = await supabase.auth.getUser();

      setUser({
        ...profile,
        email: authUser?.email,
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN function
  const login = async (email: string, password: string, remember = false) => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      // Profile will be loaded automatically by onAuthStateChange listener
      return true;
    } catch (err) {
      console.error('Login exception:', err);
      return false;
    }
  };

  // SIGNUP function
  const signup = async (
    email: string, 
    password: string, 
    fullName: string, 
    shopCode: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Verify shop code exists
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .select('id')
        .eq('shop_code', shopCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (tenantError || !tenant) {
        return { 
          success: false, 
          error: 'Invalid shop code. Please check with your coffee shop.' 
        };
      }

      // 2. Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        return { success: false, error: signUpError.message };
      }

      if (!authData.user) {
        return { success: false, error: 'Failed to create account' };
      }

      // 3. Create profile (this should happen automatically via trigger, but we'll ensure it)
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          tenant_id: tenant.id,
          full_name: fullName,
          tier: 'free',
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Continue anyway - profile might already exist from trigger
      }

      // 4. Generate referral code for new user
      const referralCode = `${fullName.substring(0, 3).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      await supabase
        .from('referrals')
        .insert({
          tenant_id: tenant.id,
          referrer_id: authData.user.id,
          referral_code: referralCode,
          status: 'pending',
        });

      return { success: true };
    } catch (err: any) {
      console.error('Signup exception:', err);
      return { success: false, error: err.message || 'An error occurred during signup' };
    }
  };

  // LOGOUT function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      login, 
      signup, 
      logout, 
      setUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
