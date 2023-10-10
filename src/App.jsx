import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import PrivateRoute from "./layout/PrivateRoute";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyAccount from "./pages/VerifyAccount";
import PasswordReset from "./pages/PasswordReset";
import NewPassword from "./pages/NewPassword";
import ManagePatients from "./pages/ManagePatients";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";


function App() {  

  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="verifyaccount/:id" element={<VerifyAccount />} />
              <Route path="passwordreset" element={<PasswordReset />} />
              <Route path="passwordreset/:token" element={<NewPassword />} />
            </Route>

            {/* Private routes */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route index element={<ManagePatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
