import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./Pages/auth/LoginPage";
import { CreateUserPage } from "./Pages/dashboard/CreateUserPage";
import { Dashboard } from "./Pages/dashboard/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-user" element={<CreateUserPage />} />
        </Route>
        <Route path="auth" element={<Outlet />}>
          <Route path="sign-in" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
