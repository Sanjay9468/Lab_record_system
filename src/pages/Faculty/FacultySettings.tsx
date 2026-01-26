import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function FacultySettings() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout title="Faculty Settings" links={[]}>
      <div className="max-w-xl space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800">
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <p className="text-slate-500 text-sm">Email</p>
          <div className="mt-1 font-medium">{email}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800">
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          <p className="text-sm text-slate-500">
            Password changes handled via Supabase Auth
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}