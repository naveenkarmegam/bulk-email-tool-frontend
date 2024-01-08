import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/landing/Layout/Layout";
import Login from "./components/client/login";
import Register from "./components/client/register";
import ForgotPassword from "./components/client/Forgotpassword";
import ResetPassword from "./components/client/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
