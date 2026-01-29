import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";
import { X, Award } from "lucide-react";

export default function MarksModal({ record, onClose, onSaved }: any) {
  const [marks, setMarks] = useState("");

  async function submitMarks() {
    await supabase
      .from("lab_records")
      .update({
        marks: Number(marks),
        evaluated_at: new Date(),
      })
      .eq("id", record.id);

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-96 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-indigo-400">
              Evaluate Experiment
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 transition"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
            Experiment
          </p>
          <p className="text-sm text-slate-200 font-medium">
            {record.experiment_title}
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="text-xs text-slate-400">Marks</label>
          <input
            type="number"
            placeholder="Enter marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-indigo-500/50 transition"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={submitMarks}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg text-white font-medium shadow-md transition"
          >
            Save Marks
          </button>
        </div>
      </motion.div>
    </div>
  );
}