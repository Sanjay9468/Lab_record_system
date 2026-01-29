import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Database,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
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

      if (error || profile?.role !== "admin") {
        navigate("/login");
        return;
      }

      if (data.session.user.email) {
        setEmail(data.session.user.email);
      }

      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-slate-400">System Control</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<Users />} label="Users" />
          <NavItem icon={<BookOpen />} label="Lab Records" />
          <NavItem icon={<Database />} label="Subjects" />
          <NavItem icon={<BarChart3 />} label="Analytics" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
            <p className="text-sm text-slate-400">
              Logged in as {email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-slate-800 text-sm">
              System Status: <span className="text-green-400">Online</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Users />} title="Total Users" value="1,248" />
          <StatCard icon={<BookOpen />} title="Experiments" value="342" />
          <StatCard icon={<Activity />} title="Active Sessions" value="89" />
          <StatCard icon={<BarChart3 />} title="Submissions" value="5,920" />
        </div>

        {/* MODULES */}
        <div className="grid md:grid-cols-3 gap-6">
          <ModuleCard
            title="User Management"
            desc="Create, update and manage all users and roles."
          />
          <ModuleCard
            title="Lab Management"
            desc="Manage experiments, subjects and lab structure."
          />
          <ModuleCard
            title="Internal Evaluation"
            desc="Configure marks, evaluation rules and automation."
          />
          <ModuleCard
            title="System Monitoring"
            desc="View logs, activity and platform performance."
          />
          <ModuleCard
            title="Access Control"
            desc="Permissions, roles and security policies."
          />
          <ModuleCard
            title="Reports"
            desc="Generate academic and performance reports."
          />
        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition"
    >
      <span className="text-blue-400">{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-blue-400">{icon}</div>
        <span className="text-xs text-slate-500">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </motion.div>
  );
}

function ModuleCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow"
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </motion.div>
  );
}