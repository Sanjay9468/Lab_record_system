import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  FlaskConical,
  LogOut,
  GraduationCap,
  ArrowLeft,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StudentExperiment() {
  const navigate = useNavigate();

  const [experimentNo, setExperimentNo] = useState("");
  const [aim, setAim] = useState("");
  const [procedure, setProcedure] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [outputImages, setOutputImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const checkStudent = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      if (error || profile?.role !== "student") {
        navigate("/login");
        return;
      }

      if (data.session.user.email) {
        setEmail(data.session.user.email);
      }

      setPageLoading(false);
    };

    checkStudent();
  }, [navigate]);

  const blockCopyPaste = (e: React.ClipboardEvent | React.MouseEvent) => {
    e.preventDefault();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setOutputImages(fileArray);

    const previews = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const downloadPDF = () => {
    alert("Auto PDF generation will follow college lab manual format (integration pending)");
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("experiments").insert({
      student_id: user.id,
      experiment_no: experimentNo,
      aim,
      procedure,
      output,
      result,
      status: "submitted",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Experiment submitted successfully ✅");
      setExperimentNo("");
      setAim("");
      setProcedure("");
      setOutput("");
      setResult("");
      setOutputImages([]);
      setImagePreviews([]);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading experiment page...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Student Panel</h2>
            <p className="text-xs text-slate-400">Experiment Entry</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<ArrowLeft />} label="Back to Dashboard" onClick={() => navigate("/student")} />
          <NavItem icon={<BookOpen />} label="My Experiments" />
          <NavItem icon={<ClipboardCheck />} label="Results" />
          <NavItem icon={<FileText />} label="Submissions" />
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Experiment Submission</h1>
            <p className="text-sm text-slate-400">
              Logged in as {email}
            </p>
          </div>

          <div className="px-4 py-2 rounded-lg bg-slate-800 text-sm">
            Mode: <span className="text-blue-400">Student</span>
          </div>
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">New Experiment Record</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              placeholder="Experiment Number (e.g. Exp-05)"
              value={experimentNo}
              onChange={(e) => setExperimentNo(e.target.value)}
              required
            />

            <Textarea
              placeholder="Aim of the Experiment"
              value={aim}
              onChange={(e) => setAim(e.target.value)}
              required
              onCopy={blockCopyPaste}
              onPaste={blockCopyPaste}
              onCut={blockCopyPaste}
              onContextMenu={blockCopyPaste}
            />

            <Textarea
              placeholder="Procedure"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              required
              rows={4}
              onCopy={blockCopyPaste}
              onPaste={blockCopyPaste}
              onCut={blockCopyPaste}
              onContextMenu={blockCopyPaste}
            />

            <Textarea
              placeholder="Output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              required
              rows={3}
              onCopy={blockCopyPaste}
              onPaste={blockCopyPaste}
              onCut={blockCopyPaste}
              onContextMenu={blockCopyPaste}
            />

            <div className="mt-3">
              <label className="text-sm text-slate-400">Upload Output Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-2 block text-sm"
              />

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {imagePreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="rounded-lg border border-slate-700"
                    />
                  ))}
                </div>
              )}
            </div>

            <Textarea
              placeholder="Result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              required
              rows={3}
              onCopy={blockCopyPaste}
              onPaste={blockCopyPaste}
              onCut={blockCopyPaste}
              onContextMenu={blockCopyPaste}
            />

            <Button type="submit" disabled={loading} className="w-full flex gap-2">
              <Save className="w-4 h-4" />
              {loading ? "Submitting..." : "Submit Experiment"}
            </Button>

            <button
              type="button"
              onClick={downloadPDF}
              className="w-full mt-4 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            >
              📄 Download Lab Manual PDF
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition"
    >
      <span className="text-blue-400">{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.div>
  );
}