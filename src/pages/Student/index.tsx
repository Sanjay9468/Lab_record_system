import DashboardLayout from "@/layouts/DashboardLayout"
import { BookOpen, PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function StudentDashboard() {
  return (
    <DashboardLayout
      title="Student Dashboard"
      links={[
        {
          label: "My Experiments",
          to: "/student",
          icon: BookOpen,
        },
        {
          label: "New Experiment",
          to: "/student/experiment",
          icon: PlusCircle,
        },
      ]}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Submit Lab Records</h3>
          <p className="text-sm text-slate-500 mb-4">
            Enter experiments digitally and submit for evaluation.
          </p>

          <Link
            to="/student/experiment"
            className="text-blue-600 font-medium"
          >
            Add Experiment →
          </Link>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h3 className="font-semibold mb-2">View Marks</h3>
          <p className="text-sm text-slate-500">
            Check validation status and internal marks.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}