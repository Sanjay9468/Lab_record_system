import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

interface ProtectedRouteProps {
  allowedRole: "student" | "faculty" | "admin";
  children: React.ReactNode; // ✅ NO JSX.Element
}

export default function ProtectedRoute({
  allowedRole,
  children,
}: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      setAuthorized(profile?.role === allowedRole);
      setLoading(false);
    };

    checkRole();
  }, [allowedRole]);

  if (loading) return null;

  return authorized ? <>{children}</> : <Navigate to="/login" replace />;
}