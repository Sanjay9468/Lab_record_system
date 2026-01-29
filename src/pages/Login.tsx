import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import {
  GraduationCap,
  UserCog,
  ShieldCheck,
  LogIn,
  Mail,
  Lock,
} from "lucide-react";

// Role values
const roles = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    color: "border-blue-500 text-blue-600 bg-blue-50",
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: UserCog,
    color: "border-indigo-500 text-indigo-600 bg-indigo-50",
  },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    color: "border-emerald-500 text-emerald-600 bg-emerald-50",
  },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      await supabase.auth.updateUser({
        data: { role: selectedRole },
      });

      localStorage.setItem("pendingRole", selectedRole);
    }

    navigate("/redirect", { replace: true });
    setLoading(false);
  }

  async function googleLogin() {
    localStorage.setItem("pendingRole", selectedRole);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      
      {/* glow background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <motion.form
        onSubmit={login}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[420px] rounded-2xl bg-white/95 backdrop-blur-xl p-8 shadow-2xl border"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full bg-blue-100 mb-3">
            <LogIn className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold">Portal Login</h2>
          <p className="text-sm text-slate-500">
            Digital Lab Record System
          </p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const active = selectedRole === role.id;

            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-xl border p-3 text-xs flex flex-col items-center gap-1 transition-all ${
                  active
                    ? `${role.color} shadow-md`
                    : "border-slate-300 text-slate-500 hover:border-slate-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                {role.label}
              </motion.button>
            );
          })}
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="password"
            placeholder="Password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login */}
        <Button type="submit" className="w-full mb-3" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={googleLogin}
          disabled={loading}
        >
          Continue with Google
        </Button>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2025 Lab Record System · Secure Academic Platform
        </p>
      </motion.form>
    </div>
  );
}