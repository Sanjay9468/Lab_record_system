import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectByRole = async () => {
      // 1️⃣ get logged-in user
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        navigate("/login", { replace: true });
        return;
      }

      // 2️⃣ get role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      if (profileError || !profile?.role) {
        navigate("/login", { replace: true });
        return;
      }

      // 3️⃣ redirect based on role
      navigate(`/${profile.role}`, { replace: true });
    };

    redirectByRole();
  }, [navigate]);

  // 4️⃣ small loading screen
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
      Redirecting to dashboard...
    </div>
  );
}