import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-96 shadow-2xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">
          Evaluate Experiment
        </h2>

        <p className="text-sm mb-3 text-slate-300">
          {record.experiment_title}
        </p>

        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">Cancel</button>
          <button
            onClick={submitMarks}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}