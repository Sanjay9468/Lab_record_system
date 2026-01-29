import { Routes, Route } from "react-router-dom";

import StudentDashboard from "./Studentdashboard";
import StudentExperiments from "./StudentExperiments";
import StudentExperiment from "./StudentExperiment";
import StudentSubmissions from "./StudentSubmissions";
import StudentMarks from "./StudentMarks";
import StudentProfile from "./StudentProfile";

export default function Student() {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/experiments" element={<StudentExperiments />} />
      <Route path="/experiment/:id" element={<StudentExperiment />} />
      <Route path="/add-experiment" element={<StudentExperiment />} />
      <Route path="/submissions" element={<StudentSubmissions />} />
      <Route path="/marks" element={<StudentMarks />} />
      <Route path="/profile" element={<StudentProfile />} />
    </Routes>
  );
}