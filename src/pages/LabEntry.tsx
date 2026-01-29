import LabForm from "../components/labform";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

export default function LabEntry() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Lab Record Entry
            </h1>
            <p className="text-sm text-slate-400">
              Submit and manage your lab experiments
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <LabForm />
        </div>
      </motion.div>
    </div>
  );
}