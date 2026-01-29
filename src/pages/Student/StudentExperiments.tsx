import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FlaskConical,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

type Experiment = {
  id: string;
  experiment_no: string;
  status: string;
  created_at: string;
};

export default function StudentExperiments() {
  const navigate = useNavigate();
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiments = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("experiments")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setExperiments(data as Experiment[]);
      setLoading(false);
    };

    loadExperiments();
  }, [navigate]);

  const statusColor = (status: string) => {
    if (status === "submitted") return "text-yellow-400";
    if (status === "approved") return "text-green-400";
    if (status === "rejected") return "text-red-400";
    if (status === "draft") return "text-blue-400";
    return "text-slate-400";
  };

  const statusIcon = (status: string) => {
    if (status === "submitted") return <Clock className="w-4 h-4" />;
    if (status === "approved") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "rejected") return <XCircle className="w-4 h-4" />;
    return <FlaskConical className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading experiments...
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
          <h1 className="text-2xl font-bold">My Experiments</h1>
        </div>

        <button
          onClick={() => navigate("/student/add-experiment")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-4 h-4" />
          New Experiment
        </button>
      </div>

      {/* LIST */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {experiments.length === 0 && (
          <div className="text-slate-400">No experiments yet.</div>
        )}

        {experiments.map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg cursor-pointer"
            onClick={() => navigate(`/student/add-experiment?id=${exp.id}`)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                {exp.experiment_no || "Experiment"}
              </h3>
              <span
                className={`flex items-center gap-1 text-sm ${statusColor(
                  exp.status
                )}`}
              >
                {statusIcon(exp.status)}
                {exp.status}
              </span>
            </div>

            <div className="text-sm text-slate-400">
              Created: {new Date(exp.created_at).toLocaleDateString()}
            </div>

            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  exp.status === "approved"
                    ? "bg-green-500 w-full"
                    : exp.status === "submitted"
                    ? "bg-yellow-500 w-2/3"
                    : exp.status === "draft"
                    ? "bg-blue-500 w-1/3"
                    : "bg-red-500 w-1/4"
                }`}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
