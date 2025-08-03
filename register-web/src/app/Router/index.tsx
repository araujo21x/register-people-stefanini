
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { SignIn } from "@pages/auth/sign-in";
import { RegisterUser } from "@pages/auth/register-user";
import { People } from "@pages/private/people";
import { ProtectedRoute } from "../components/auth/protected-route";
import { PublicRoute } from "../components/auth/public-route";

export function Router() {
  return (
    <Routes>
      <Route 
        path={routes.auth.signIn} 
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } 
      />
      <Route 
        path={routes.auth.registerUser} 
        element={
          <PublicRoute>
            <RegisterUser />
          </PublicRoute>
        } 
      />
      <Route 
        path={routes.private.people} 
        element={
          <ProtectedRoute>
            <People />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}