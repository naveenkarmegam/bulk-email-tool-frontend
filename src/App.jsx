import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AddRecipient from "./components/core/helpers/AddRecipient";
import EditRecipient from "./components/core/helpers/EditRecipient";
import AddTemplate from "./components/core/helpers/AddTemplate";
import PrivateRoutes from "./components/client/auth/PrivateRoutes";
import ProfileEdit from "./components/core/vendors/others/ProfileEdit";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/list" element={<Listing />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/template" element={<Template />} />
          <Route path="/service" element={<Service />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-recipient" element={<AddRecipient />} />
          <Route path="/update-recipient/:id" element={<EditRecipient />} />
          <Route path="/add-template" element={<AddTemplate />} />
          <Route path="/edit-profile/:id" element={<ProfileEdit/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
