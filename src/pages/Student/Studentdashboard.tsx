import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return navigate("/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      if (profile.role !== "student") navigate("/login");
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return null;

  return <h1>Student Dashboard</h1>;
}