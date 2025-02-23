import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HomePage from "./Pages/HomePage";
import Community from "./components/CommunityPage";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
