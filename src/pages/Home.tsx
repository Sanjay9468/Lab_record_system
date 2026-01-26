import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpenCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <GraduationCap className="w-4 h-4" />
            Academic Lab Management System
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Digital Lab Record & <br /> Internal Evaluation System
          </h1>

          <p className="text-slate-600 dark:text-slate-400 max-w-lg">
            A centralized platform where students submit lab records,
            faculty validate experiments, and administrators manage
            internal assessments digitally.
          </p>

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* RIGHT (ICON DISPLAY) */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl"
          >
            <GraduationCap className="w-24 h-24" />
          </motion.div>
        </div>
      </section>

      {/* ================= PORTALS ================= */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Three Powerful Portals
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
            Designed for students, faculty, and administrators
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {/* STUDENT */}
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white dark:bg-slate-950 border p-6 shadow-sm"
            >
              <BookOpenCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-3">
                Student Portal
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✔ Type lab experiments digitally</li>
                <li>✔ Structured experiment format</li>
                <li>✔ Submit records online</li>
                <li>✔ View marks & validation</li>
              </ul>
            </motion.div>

            {/* FACULTY */}
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white dark:bg-slate-950 border p-6 shadow-sm"
            >
              <GraduationCap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-3">
                Faculty Portal
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✔ Review lab submissions</li>
                <li>✔ Validate experiments</li>
                <li>✔ Assign marks</li>
                <li>✔ Track student progress</li>
              </ul>
            </motion.div>

            {/* ADMIN */}
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white dark:bg-slate-950 border p-6 shadow-sm"
            >
              <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-3">
                Admin Portal
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✔ Manage users & roles</li>
                <li>✔ Configure internal marks</li>
                <li>✔ Monitor lab completion</li>
                <li>✔ Full system control</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-3">
              Ready to Go Digital?
            </h2>
            <p className="text-blue-100 mb-6">
              Simplify lab records and internal evaluation with one system.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">Start Using System</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-slate-500">
        © 2025 St. Peter’s College of Engineering and Technology
      </footer>
    </div>
  );
}