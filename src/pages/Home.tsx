import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  GraduationCap,
  BookOpenCheck,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Cloud,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <GraduationCap className="w-4 h-4" />
              Academic Lab Management System
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Digital Lab Record & <br />
              <span className="text-blue-600 dark:text-blue-400">
                Internal Evaluation System
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              A secure, role-based platform for managing laboratory
              experiments, submissions, evaluations, and internal marks —
              all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/login">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl">
                <GraduationCap className="w-28 h-28" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Use This System?
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-14">
            Built for colleges to modernize lab record management
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <Feature
              icon={<Cloud />}
              title="Cloud Based"
              desc="Access lab records anytime from anywhere."
            />
            <Feature
              icon={<Lock />}
              title="Secure"
              desc="Supabase auth with role-based access control."
            />
            <Feature
              icon={<BarChart3 />}
              title="Track Progress"
              desc="Monitor submissions, marks & completion."
            />
            <Feature
              icon={<CheckCircle2 />}
              title="Paperless"
              desc="No physical records, fully digital workflow."
            />
          </div>
        </div>
      </section>

      {/* ================= PORTALS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Three Powerful Portals
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-14">
            Tailored experiences for every role
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {/* STUDENT */}
            <PortalCard
              icon={<BookOpenCheck />}
              title="Student Portal"
              color="text-blue-600"
              points={[
                "Type lab experiments digitally",
                "Submit records online",
                "View marks & validation",
                "Track experiment status",
              ]}
            />

            {/* FACULTY */}
            <PortalCard
              icon={<GraduationCap />}
              title="Faculty Portal"
              color="text-indigo-600"
              points={[
                "Create experiment templates",
                "Review submissions",
                "Validate experiments",
                "Assign internal marks",
              ]}
            />

            {/* ADMIN */}
            <PortalCard
              icon={<ShieldCheck />}
              title="Admin Portal"
              color="text-emerald-600"
              points={[
                "Manage users & roles",
                "Configure subjects",
                "Monitor lab completion",
                "Full system control",
              ]}
            />

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Go Digital?
          </motion.h2>

          <p className="text-blue-100 mb-8">
            Simplify lab records, evaluations, and administration with one
            unified system.
          </p>

          <Button asChild size="lg" variant="secondary">
            <Link to="/login">Start Using System</Link>
          </Button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © 2025 St. Peter’s College of Engineering and Technology · Lab Record System
      </footer>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl bg-white dark:bg-slate-950 border p-6 shadow-sm text-center"
    >
      <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </motion.div>
  )
}

function PortalCard({
  icon,
  title,
  color,
  points,
}: {
  icon: React.ReactNode
  title: string
  color: string
  points: string[]
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl bg-white dark:bg-slate-950 border p-6 shadow-sm"
    >
      <div className={`w-12 h-12 mx-auto mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        {points.map((p) => (
          <li key={p}>✔ {p}</li>
        ))}
      </ul>
    </motion.div>
  )
}