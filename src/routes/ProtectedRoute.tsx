import { Navigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole: "student" | "faculty" | "admin";
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setAuthorized(data?.role === allowedRole);
      setLoading(false);
    }

    checkRole();
  }, [allowedRole]);

  if (loading) return null;

  if (!authorized) return <Navigate to="/login" replace />;

  return children;
}