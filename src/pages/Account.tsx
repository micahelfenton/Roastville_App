import React from "react";
import { useAuth } from "@/lib/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const Account: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pb-24 pt-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl text-foreground">Account</h2>
          <p className="text-sm text-muted-foreground mb-6">Manage your profile and membership</p>

          <div className="p-4 rounded-xl bg-card card-inner-shadow mb-4">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium text-foreground">{user?.name ?? '—'}</p>

            <p className="text-sm text-muted-foreground mt-3">Member since</p>
            <p className="font-medium text-foreground">{user?.memberSince ?? '—'}</p>

            <p className="text-sm text-muted-foreground mt-3">Tier</p>
            <p className="font-medium text-foreground">{user?.tier ?? 'Seed'}</p>

            <div className="mt-4">
              <button onClick={() => logout()} className="py-2 px-3 rounded-lg bg-destructive text-destructive-foreground">Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Account;
