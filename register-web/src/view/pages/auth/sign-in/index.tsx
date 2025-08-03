import { ThemeSwitch } from "@components/theme-switch";
import { LoginForm } from "./components/login-form";
import logo from "@view/assets/logo.png";

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ThemeSwitch />

      <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <a>
          <img src={logo} alt="Register People" className="inline-block mr-2 align-middle w-12 h-12" />
          Register People
        </a>

        <LoginForm />
      </div>
    </div>
  )
}