import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

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

      setEmail(data.session.user.email);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/login");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  if (loading) return null;

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Logout
        </button>
      </div>

      <p className="mb-6 text-slate-600">
        Logged in as: <strong>{email}</strong>
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Manage Users</h3>
          <p className="text-sm text-slate-500">
            Add students, faculty and admins
          </p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Lab Records</h3>
          <p className="text-sm text-slate-500">
            View all lab experiments
          </p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Internal Marks</h3>
          <p className="text-sm text-slate-500">
            Auto calculate lab internals
          </p>
        </div>
      </div>
    </div>
  );
}