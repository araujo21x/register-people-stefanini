
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { SignIn } from "@pages/auth/sign-in";
import { RegisterUser } from "@pages/auth/register-user";
import { People } from "@pages/private/people";

export function Router() {
  return (
    <Routes>
      <Route path={routes.auth.signIn} element={<SignIn />} />
      <Route path={routes.auth.registerUser} element={<RegisterUser />} />
      <Route path={routes.private.people} element={<People />} />
    </Routes>
  )
}