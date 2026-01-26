import { useState, FormEvent } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StudentExperiment() {
  const [experimentNo, setExperimentNo] = useState("");
  const [aim, setAim] = useState("");
  const [procedure, setProcedure] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Experiment saved successfully ✅");
      setExperimentNo("");
      setAim("");
      setProcedure("");
      setOutput("");
      setResult("");
    }

    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        New Experiment Entry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Experiment Number"
          value={experimentNo}
          onChange={(e) => setExperimentNo(e.target.value)}
          required
        />

        <Textarea
          placeholder="Aim"
          value={aim}
          onChange={(e) => setAim(e.target.value)}
          required
        />

        <Textarea
          placeholder="Procedure"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          required
        />

        <Textarea
          placeholder="Output"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          required
        />

        <Textarea
          placeholder="Result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Experiment"}
        </Button>
      </form>
    </motion.div>
  );
}