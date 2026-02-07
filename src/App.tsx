import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Rewards from "./pages/Rewards";
import Membership from "./pages/Membership";
import Profile from "./pages/Profile";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { AuthProvider, useAuth } from "./lib/AuthContext";

const queryClient = new QueryClient();

const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/home" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/auth-check" element={<RootRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
