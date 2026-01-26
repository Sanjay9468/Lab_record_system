import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishAuth = async () => {
      // 1️⃣ Ensure session exists (handles OAuth redirect + refresh)
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error("No session after OAuth:", sessionError);
        navigate("/login", { replace: true });
        return;
      }

      // 2️⃣ Fetch role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.role) {
        console.error("Role fetch failed:", profileError);
        navigate("/login", { replace: true });
        return;
      }

      // 3️⃣ Role-based redirect (NO intermediate blank page)
      switch (profile.role) {
        case "student":
          navigate("/student", { replace: true });
          break;
        case "faculty":
          navigate("/faculty", { replace: true });
          break;
        case "admin":
          navigate("/admin", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    };

    finishAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in…</p>
    </div>
  );
}