import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔁 Auth callback mounted");

    // Listen for auth state change (reliable redirect trigger)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          console.log("✅ Session ready → redirecting to authflow");
          navigate("/authflow", { replace: true });
        } else {
          console.log("❌ No session → back to login");
          navigate("/login", { replace: true });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p>Completing login...</p>
    </div>
  );
}