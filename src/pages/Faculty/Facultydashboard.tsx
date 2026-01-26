import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  PlusCircle,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

type Submission = {
  id: number;
  student_email: string;
  experiment_title: string;
  submitted_at: string;
  marks: number | null;
};

type ExperimentTemplate = {
  id: number;
  subject: string;
  experiment_no: number;
  title: string;
  description: string;
};

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [templates, setTemplates] = useState<ExperimentTemplate[]>([]);
  const [marks, setMarks] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);

  const [subject, setSubject] = useState("");
  const [expNo, setExpNo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* 🔐 LOGOUT */
  async function logout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  /* 📥 FETCH DATA */
  useEffect(() => {
    fetchSubmissions();
    fetchTemplates();
  }, []);

  async function fetchSubmissions() {
    const { data } = await supabase
      .from("experiment_submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (data) setSubmissions(data);
  }

  async function fetchTemplates() {
    const { data } = await supabase
      .from("experiments")
      .select("*")
      .order("experiment_no");

    if (data) setTemplates(data);
  }

  /* 🧪 ADD EXPERIMENT */
  async function addExperiment() {
    if (!subject || !expNo || !title) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("experiments").insert({
      subject,
      experiment_no: Number(expNo),
      title,
      description,
      created_by: user?.id,
    });

    setSubject("");
    setExpNo("");
    setTitle("");
    setDescription("");
    fetchTemplates();
  }

  /* 📝 ASSIGN MARKS */
  async function assignMarks() {
    if (!activeId || !marks) return;

    await supabase
      .from("experiment_submissions")
      .update({
        marks: Number(marks),
        evaluated_at: new Date().toISOString(),
      })
      .eq("id", activeId);

    setActiveId(null);
    setMarks("");
    fetchSubmissions();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-800 p-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
          <ClipboardCheck /> Faculty Dashboard
        </h1>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all hover:scale-105"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* ADD EXPERIMENT */}
      <div className="bg-white rounded-2xl p-6 mb-10 shadow-lg border border-blue-100 transition hover:shadow-xl">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-700">
          <PlusCircle /> Add Experiment Template
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            placeholder="Experiment No"
            value={expNo}
            onChange={(e) => setExpNo(e.target.value)}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            placeholder="Experiment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none col-span-2"
          />

          <textarea
            placeholder="Description / Aim"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none col-span-2"
          />
        </div>

        <button
          onClick={addExperiment}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition hover:scale-105"
        >
          Save Experiment
        </button>
      </div>

      {/* EXPERIMENT LIST */}
      <div className="bg-white rounded-2xl p-6 mb-10 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-700">
          <BookOpen /> Experiment Templates
        </h2>

        <ul className="space-y-3">
          {templates.map((exp) => (
            <li
              key={exp.id}
              className="p-4 rounded-lg border border-slate-200 hover:bg-blue-50 transition"
            >
              <b>Exp {exp.experiment_no}:</b> {exp.title}
              <div className="text-sm text-slate-500">{exp.subject}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* STUDENT SUBMISSIONS */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          🧪 Student Submissions
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-700 text-left">
              <th className="p-2">Email</th>
              <th className="p-2">Experiment</th>
              <th className="p-2">Marks</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-blue-50 transition"
              >
                <td className="p-2">{s.student_email}</td>
                <td className="p-2">{s.experiment_title}</td>
                <td className="p-2">{s.marks ?? "—"}</td>
                <td className="p-2">
                  <button
                    onClick={() => setActiveId(s.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition hover:scale-105"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MARKS MODAL */}
      {activeId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl animate-scale-in">
            <h3 className="font-bold mb-3 text-blue-700">Assign Marks</h3>

            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setActiveId(null)}
                className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={assignMarks}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}