import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Events from "./pages/Events";
import HelpRequest from "./pages/HelpRequest";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Layout><Events/></Layout></ProtectedRoute>} />
        <Route path="/help-request" element={<ProtectedRoute><Layout><HelpRequest/></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
