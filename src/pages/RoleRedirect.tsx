import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function RoleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectByRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !profile?.role) {
        navigate("/login", { replace: true });
        return;
      }

      navigate(`/${profile.role}`, { replace: true });
    };

    redirectByRole();
  }, [navigate]);

  return <div>Redirecting…</div>;
}