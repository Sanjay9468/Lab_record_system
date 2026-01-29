import type React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  User,
  BarChart3,
  LogOut,
  GraduationCap,
  Activity,
  FileText,
} from "lucide-react";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStudent = async () => {
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

      setLoading(false);
    };

    checkStudent();
  }, [navigate]);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading student dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className={`${
        sidebarOpen ? "w-72" : "w-20"
      } bg-slate-900 border-r border-slate-800 p-4 flex flex-col transition-all duration-300`}>
        <div className="flex items-center justify-between gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Student Panel</h2>
              <p className="text-xs text-slate-400">Learning Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white md:hidden"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<BarChart3 />} label="Dashboard" onClick={() => navigate("/student")} />
          <NavItem icon={<BookOpen />} label="Experiments" onClick={() => navigate("/student/experiments")} />
          <NavItem icon={<FileText />} label="Submissions" onClick={() => navigate("/student/submissions")} />
          <NavItem icon={<ClipboardCheck />} label="Results" onClick={() => navigate("/student/marks")} />
          <NavItem icon={<User />} label="Profile" onClick={() => navigate("/student/profile")} />
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
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-sm text-slate-400">
              Logged in as {email}
            </p>
          </div>

          <div className="px-4 py-2 rounded-lg bg-slate-800 text-sm">
            Status: <span className="text-green-400">Active</span>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate("/student/add-experiment")}
            className="px-5 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            + Add Experiment
          </button>

          <button
            onClick={() => navigate("/student/experiments")}
            className="px-5 py-2 bg-slate-800 rounded-lg text-sm hover:bg-slate-700 transition"
          >
            My Experiments
          </button>

          <button
            onClick={() => navigate("/student/marks")}
            className="px-5 py-2 bg-slate-800 rounded-lg text-sm hover:bg-slate-700 transition"
          >
            View Marks
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<BookOpen />} title="Total Experiments" value="24" />
          <StatCard icon={<ClipboardCheck />} title="Completed" value="12" />
          <StatCard icon={<Activity />} title="Pending" value="6" />
          <StatCard icon={<BarChart3 />} title="Progress" value="50%" />
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-6">

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow"
          >
            <h3 className="font-semibold mb-2">Upcoming Experiments</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>✔ Digital Logic Design Lab</li>
              <li>✔ Data Structures Lab</li>
              <li>✔ Operating Systems Lab</li>
              <li>✔ Database Management Lab</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow"
          >
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📄 Submitted Experiment 5</li>
              <li>🧪 Started Experiment 6</li>
              <li>✅ Experiment 3 validated</li>
              <li>📝 Marks updated</li>
            </ul>
          </motion.div>

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition text-slate-200"
    >
      <span className="text-blue-400">{icon}</span>
      <span className="text-sm whitespace-nowrap">{label}</span>
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