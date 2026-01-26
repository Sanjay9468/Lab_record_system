import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export function useUserRole() {
  const [role, setRole] = useState<"student" | "faculty" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role ?? null);
      setLoading(false);
    }

    fetchRole();
  }, []);

  return { role, loading };
}