import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/supabaseClient"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const finishLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session?.user) {
        console.error("Session error:", error)
        navigate("/login", { replace: true })
        return
      }

      const user = session.user

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()

      if (!profile || profileError) {
        await supabase.from("profiles").insert({
          id: user.id,
          role: "student",
        })

        navigate("/student", { replace: true })
        return
      }

      navigate(`/${profile.role}`, { replace: true })
    }

    finishLogin()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Signing you in…</p>
    </div>
  )
}