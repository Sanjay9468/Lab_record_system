import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "../supabaseClient"

type Role = "admin" | "faculty" | "student" | null

interface AuthContextType {
  user: User | null
  role: Role
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1️⃣ Get existing session (page refresh support)
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null
      setUser(sessionUser)

      if (sessionUser) {
        fetchUserRole(sessionUser.id)
      } else {
        setLoading(false)
      }
    })

    // 2️⃣ Listen to auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null
        setUser(sessionUser)

        if (sessionUser) {
          fetchUserRole(sessionUser.id)
        } else {
          setRole(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 🔐 Fetch role from DB
  async function fetchUserRole(userId: string) {
    setLoading(true)

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Role fetch error:", error.message)
      setRole(null)
    } else {
      setRole(data.role)
    }

    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}