import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function StudentExperiment() {
  const [experimentNo, setExperimentNo] = useState("");
  const [aim, setAim] = useState("");
  const [procedure, setProcedure] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login again");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("experiments").insert([
      {
        student_id: user.id,
        experiment_no: experimentNo,
        aim,
        procedure,
        output,
        result,
      },
    ]);

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
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Experiment Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Experiment No"
          value={experimentNo}
          onChange={(e) => setExperimentNo(e.target.value)}
          required
        />

        <textarea
          placeholder="Aim"
          value={aim}
          onChange={(e) => setAim(e.target.value)}
          required
        />

        <textarea
          placeholder="Procedure"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          required
        />

        <textarea
          placeholder="Output"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          required
        />

        <textarea
          placeholder="Result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          required
        />

        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Experiment"}
        </button>
      </form>
    </div>
  );
}