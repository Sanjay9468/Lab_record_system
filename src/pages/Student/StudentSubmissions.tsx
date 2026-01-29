import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

type Submission = {
  id: string;
  experiment_no: string;
  status: string;
  submitted_at: string;
};

export default function StudentSubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false });

      if (!error && data) setSubmissions(data as Submission[]);
      setLoading(false);
    };

    loadSubmissions();
  }, [navigate]);

  const statusColor = (status: string) => {
    if (status === "pending") return "text-yellow-400";
    if (status === "approved") return "text-green-400";
    if (status === "rejected") return "text-red-400";
    return "text-slate-400";
  };

  const statusIcon = (status: string) => {
    if (status === "pending") return <Clock className="w-4 h-4" />;
    if (status === "approved") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "rejected") return <XCircle className="w-4 h-4" />;
    return <FileCheck2 className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading submissions...
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
          <h1 className="text-2xl font-bold">My Submissions</h1>
        </div>
      </div>

      {/* LIST */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {submissions.length === 0 && (
          <div className="text-slate-400">No submissions yet.</div>
        )}

        {submissions.map((sub) => (
          <motion.div
            key={sub.id}
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                {sub.experiment_no || "Experiment"}
              </h3>
              <span
                className={`flex items-center gap-1 text-sm ${statusColor(
                  sub.status
                )}`}
              >
                {statusIcon(sub.status)}
                {sub.status}
              </span>
            </div>

            <div className="text-sm text-slate-400">
              Submitted: {new Date(sub.submitted_at).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
