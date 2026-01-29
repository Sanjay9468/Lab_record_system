import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import AuthFlow from "./pages/AuthFlow";

// Role dashboards
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Central auth redirect */}
        <Route path="/authflow" element={<AuthFlow />} />

        {/* Role based dashboards */}
        <Route path="/student/*" element={<Student />} />
        <Route path="/faculty/*" element={<Faculty />} />
        <Route path="/admin/*" element={<Admin />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}