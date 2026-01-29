

import type React from "react";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  GraduationCap,
  LogOut,
  Settings,
  Key,
} from "lucide-react";

export default function StudentProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      if (error || profile?.role !== "student") {
        navigate("/login");
        return;
      }

      if (data.session.user.email) {
        setEmail(data.session.user.email);
      }

      if (profile?.role) {
        setRole(profile.role);
      }

      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Student Profile</h1>
            <p className="text-sm text-slate-400">Account Information</p>
          </div>
        </div>

        {/* PROFILE INFO */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <InfoCard icon={<User />} label="Name" value="Student User" />
          <InfoCard icon={<Mail />} label="Email" value={email} />
          <InfoCard icon={<Shield />} label="Role" value={role.toUpperCase()} />
          <InfoCard icon={<Key />} label="Account Status" value="Active" />

        </div>

        {/* ACTIONS */}
        <div className="grid md:grid-cols-3 gap-4">

          <ActionCard
            icon={<Settings />}
            title="Account Settings"
            desc="Manage account preferences"
          />

          <ActionCard
            icon={<Key />}
            title="Change Password"
            desc="Update your login password"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={logout}
            className="bg-red-600/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-left hover:bg-red-600/20 transition"
          >
            <div className="flex items-center gap-3 mb-1">
              <LogOut className="w-5 h-5" />
              <h3 className="font-semibold">Logout</h3>
            </div>
            <p className="text-sm text-red-300/80">Sign out from your account</p>
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex items-center gap-4"
    >
      <div className="text-blue-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-slate-950 border border-slate-800 rounded-xl p-4 cursor-pointer hover:bg-slate-900 transition"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="text-blue-400">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-slate-400">{desc}</p>
    </motion.div>
  );
}