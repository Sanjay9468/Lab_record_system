import DashboardLayout from "@/layouts/DashboardLayout"
import {
  ClipboardCheck,
  PlusCircle,
  BookOpen,
} from "lucide-react"

export default function FacultyDashboard() {
  return (
    <DashboardLayout
      title="Faculty Dashboard"
      links={[
        {
          label: "Templates",
          to: "/faculty",
          icon: BookOpen,
        },
        {
          label: "Add Experiment",
          to: "/faculty",
          icon: PlusCircle,
        },
        {
          label: "Submissions",
          to: "/faculty",
          icon: ClipboardCheck,
        },
      ]}
    >
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">
            Experiment Templates
          </h3>
          <p className="text-sm text-slate-500">
            Create and manage lab experiment templates.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">
            Student Submissions
          </h3>
          <p className="text-sm text-slate-500">
            Review experiments and assign marks.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}