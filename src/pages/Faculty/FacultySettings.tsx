import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import DashboardLayout from "@/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { Mail, Shield, Settings } from "lucide-react";

export default function FacultySettings() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading settings...
      </div>
    );

  return (
    <DashboardLayout title="Faculty Settings" links={[]}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl space-y-6"
      >
        {/* Header Card */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
          <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Faculty Settings</h1>
            <p className="text-sm text-slate-500">
              Manage your account and security preferences
            </p>
          </div>
        </div>

        {/* Account Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Account</h2>
          </div>

          <p className="text-slate-500 text-sm">Registered Email</p>
          <div className="mt-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">
            {email}
          </div>
        </motion.div>

        {/* Security Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-500">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            Password changes and authentication security are managed securely
            via Supabase Authentication services.
          </p>

          <div className="mt-3 text-xs text-slate-400">
            For password reset, use the "Forgot Password" option on login screen.
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}