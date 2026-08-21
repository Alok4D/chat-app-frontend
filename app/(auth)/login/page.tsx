import React from "react";
import { LoginForm } from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F0EFFF] flex flex-col justify-center items-center px-4 selection:bg-[#6C63FF] selection:text-white">
      {/* Login Card */}
      <LoginForm />
    </div>
  );
}
