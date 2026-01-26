import { useEffect, useState } from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { supabase } from "@/supabaseClient"
import {
  ShieldCheck,
  Users,
  BookOpenCheck,
  UserPlus,
} from "lucide-react"

type Profile = {
  id: string
  email: string
  role: "student" | "faculty" | "admin"
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role")
      .order("email")

    if (!error && data) setUsers(data)
    setLoading(false)
  }

  async function updateRole(id: string, role: Profile["role"]) {
    await supabase.from("profiles").update({ role }).eq("id", id)
    fetchUsers()
  }

  return (
    <DashboardLayout
      title="Admin Dashboard"
      links={[
        { label: "Users", to: "/admin", icon: Users },
        { label: "Lab Records", to: "/admin", icon: BookOpenCheck },
        { label: "System", to: "/admin", icon: ShieldCheck },
      ]}
    >
      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value={users.length} />
        <StatCard
          title="Faculty"
          value={users.filter((u) => u.role === "faculty").length}
        />
        <StatCard
          title="Students"
          value={users.filter((u) => u.role === "student").length}
        />
      </div>

      {/* USER MANAGEMENT */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UserPlus /> User Management
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading users…</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-left">
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b dark:border-slate-700"
                >
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        updateRole(
                          u.id,
                          e.target.value as Profile["role"]
                        )
                      }
                      className="p-2 rounded border dark:bg-slate-800"
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

function StatCard({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}