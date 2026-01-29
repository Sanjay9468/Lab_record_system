import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Mark = {
  id: string;
  experiment_no: string;
  marks: number;
  status: string;
  remarks: string;
  evaluated_at: string;
};

export default function StudentMarks() {
  const navigate = useNavigate();
  const [marksData, setMarksData] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("marks")
        .select("*")
        .eq("student_id", user.id)
        .order("evaluated_at", { ascending: false });

      if (!error && data) setMarksData(data as Mark[]);
      setLoading(false);
    };

    loadMarks();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading marks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/student")}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-2xl font-bold">My Marks</h1>
        </div>
      </div>

      {/* MARKS LIST */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {marksData.length === 0 && (
          <div className="text-slate-400">No marks available yet.</div>
        )}

        {marksData.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">
                {m.experiment_no || "Experiment"}
              </h3>

              {m.status === "approved" ? (
                <span className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Approved
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400 text-sm">
                  <XCircle className="w-4 h-4" />
                  Rejected
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-lg font-bold text-blue-400 mb-2">
              <Award className="w-5 h-5" />
              {m.marks} / 100
            </div>

            <div className="text-sm text-slate-400 mb-2">
              Evaluated: {new Date(m.evaluated_at).toLocaleDateString()}
            </div>

            <div className="text-sm text-slate-300">
              Remarks: {m.remarks || "No remarks"}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
