import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";

import "./index.css";
import LoginComponent from "./components/login/LoginComponent";
import LogoutComponent from "./components/login/LogoutComponent";
import DashboardComponent from "./components/utils/DashboardComponent";
import ListTodoComponent from "./components/todo/ListTodoComponent";
import ErrorComponent from "./components/utils/ErrorComponent";
import TodoComponent from "./components/todo/TodoComponent";
import NavbarComponent from "./components/utils/NavbarComponent";
import FooterComponent from "./components/utils/FooterComponent";
import RegisterComponent from "./components/register/RegisterComponent";
import ResendVerificationTokenComponent from "./components/register/ResendVerificationTokenComponent";
import ForgotPasswordComponent from "./components/login/ForgotPasswordComponent";
import ResetPasswordComponent from "./components/login/ResetPasswordComponent";
import SettingsComponent from "./components/settings/SettingsComponent";
import ChangeEmailComponent from "./components/settings/ChangeEmailComponent";
import ChangePasswordComponent from "./components/settings/ChangePasswordComponent";
import DeleteAccountComponent from "./components/settings/DeleteAccountComponent";
import VerificationErrorComponent from "./components/register/VerificationErrorComponent";
import AdminDashboardComponent from "./components/admin/AdminDashboardComponent";
import ListUsersComponent from "./components/admin/ListUsersComponent";
import CreateUserComponent from "./components/admin/CreateUserComponent";
import UpdateCredentialsComponent from "./components/login/UpdateCredentialsComponent";

function AuthenticatedRoute({ children, requiredRoles }) {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      navigate("/login");
    } else if (
      requiredRoles &&
      !requiredRoles.some((role) => authContext.roles.includes(role))
    ) {
      navigate("/error");
    }
  }, [authContext.isAuthenticated, navigate, authContext.roles, requiredRoles]);

  return authContext.isAuthenticated ? children : null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
            path="/verification-error"
            element={<VerificationErrorComponent />}
          />
          <Route
            path="/send-new-verification-token"
            element={<ResendVerificationTokenComponent />}
          />
          <Route path="/admin/*">
            <Route
              path="panel"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN"]}>
                  <AdminDashboardComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="manage-users"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN"]}>
                  <ListUsersComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="create-new-user"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN"]}>
                  <CreateUserComponent />
                </AuthenticatedRoute>
              }
            />
          </Route>
          <Route path="/user/*">
            <Route
              path="login/reset-password"
              element={<ResetPasswordComponent />}
            />
            <Route
              path="login/forgot-password"
              element={<ForgotPasswordComponent />}
            />
            <Route
              path="login/update-credentials"
              element={<UpdateCredentialsComponent />}
            />

            <Route
              path="todos"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <ListTodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="settings/delete-account"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <DeleteAccountComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <DashboardComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="todo/:id"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <SettingsComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="settings/change-email"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <ChangeEmailComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="settings/change-password"
              element={
                <AuthenticatedRoute requiredRoles={["ADMIN", "USER"]}>
                  <ChangePasswordComponent />
                </AuthenticatedRoute>
              }
            />

            <Route path="*" element={<ErrorComponent />} />
          </Route>

          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
