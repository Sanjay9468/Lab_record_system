import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      // ✅ Get session after Google OAuth redirect
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        navigate("/login", { replace: true });
        return;
      }

      const user = session.user;

      // ✅ Fetch role from DB
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      // 🆕 First-time Google login → auto create student
      if (profileError || !profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          role: "student",
        });

        navigate("/student", { replace: true });
        return;
      }

      // 🔁 Role-based redirect
      navigate(`/${profile.role}`, { replace: true });
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in…</p>
    </div>
  );
}