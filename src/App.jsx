import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandLayout from "./components/landing/Layout/LandLayout";
import Login from "./components/client/Login";
import Register from "./components/client/Register";
import ForgotPassword from "./components/client/ForgotPassword";
import ResetPassword from "./components/client/ResetPassword";
import DashBoard from "./components/core/DashBoard";
import Campaign from "./components/core/Campaign";
import Template from "./components/core/Template";
import Service from "./components/core/Service";
import Settings from "./components/core/Settings";
import Listing from "./components/core/Listing";
import AddUser from "./components/core/helpers/AddUser";
import AddTemplate from "./components/core/helpers/AddTemplate";
function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LandLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/list" element={<Listing />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/template" element={<Template />} />
        <Route path="/service" element={<Service />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-template" element={<AddTemplate />} />
        
      </Routes>
    </Router> 
  );
}

export default App;
