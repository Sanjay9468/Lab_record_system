import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import {
  GraduationCap,
  UserCog,
  ShieldCheck,
  LogIn,
} from "lucide-react";

type Role = "student" | "faculty" | "admin";

const roles: {
  id: Role;
  label: string;
  icon: typeof GraduationCap;
  color: string;
}[] = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    color: "border-blue-500 text-blue-600",
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: UserCog,
    color: "border-indigo-500 text-indigo-600",
  },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    color: "border-emerald-500 text-emerald-600",
  },
];

export default function Login() {
  // UI-only state (actual role comes strictly from DB)
  const [selectedRole, setSelectedRole] = useState<Role>("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔐 EMAIL + PASSWORD LOGIN
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setError(error?.message ?? "Login failed");
      return;
    }

    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !profile?.role) {
      setError("Role not assigned. Contact admin.");
      return;
    }

    // ✅ DB role is final authority
    navigate(`/${profile.role}`, { replace: true });
  }

  // 🔐 GOOGLE LOGIN
  async function googleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <motion.form
        onSubmit={login}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-96 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl border border-white/20"
      >
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <LogIn className="w-10 h-10 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">
          Login to Portal
        </h2>
        <p className="text-sm text-center text-slate-500 mb-6">
          Choose role & continue
        </p>

        {/* ROLE SELECTOR (UI ONLY) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const active = selectedRole === role.id;

            return (
              <motion.button
                key={role.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-xl border p-3 text-sm flex flex-col items-center gap-1 transition
                  ${
                    active
                      ? `${role.color} bg-white dark:bg-slate-800`
                      : "border-slate-300 dark:border-slate-700 text-slate-500"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {role.label}
              </motion.button>
            );
          })}
        </div>

        {/* INPUTS */}
        <Input
          placeholder="Email"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ACTIONS */}
        <Button type="submit" className="w-full mb-3">
          Login
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={googleLogin}
        >
          Continue with Google
        </Button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}
      </motion.form>
    </div>
  );
}