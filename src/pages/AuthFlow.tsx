import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function AuthFlow() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔁 AuthFlow mounted");

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          console.log("❌ No session → back to login");
          navigate("/login", { replace: true });
          return;
        }

        const role = session.user?.user_metadata?.role;
        console.log("✅ Role detected:", role);

        // Role routing + fallback
        if (role === "student") navigate("/student", { replace: true });
        else if (role === "faculty") navigate("/faculty", { replace: true });
        else if (role === "admin") navigate("/admin", { replace: true });
        else {
          console.warn("⚠️ Role missing → defaulting to student");
          navigate("/student", { replace: true });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-950">
      <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        Authenticating...
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Redirecting to your dashboard
      </p>
    </div>
  );
}