"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { PhoneInput } from "./PhoneInput";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const LoginForm: React.FC = () => {
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "+1 555-0199",
      password: "password123",
      otp: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login({
      phone: data.phone,
      password: data.password,
      otp: data.otp,
    });
  };

  const handleFillDemo = (type: "alex" | "sarah" | "marcus") => {
    if (type === "alex") {
      setValue("phone", "+1 555-0199");
      setValue("password", "password123");
    } else if (type === "sarah") {
      setValue("phone", "+1 555-0102");
      setValue("password", "password123");
    } else {
      setValue("phone", "+1 555-0103");
      setValue("password", "password123");
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div className="absolute -top-24 -right-24 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
        <p className="text-sm text-slate-400 mt-1.5">
          Enter your credentials to access your real-time workspace
        </p>
      </div>

      {/* Quick Demo Fill Buttons */}
      <div className="mb-6 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
        <div className="text-[11px] font-medium text-slate-400 mb-2 flex items-center justify-between">
          <span>⚡ Instant Demo Profiles:</span>
          <span className="text-blue-400">Click to fill</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleFillDemo("alex")}
            className="text-xs py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-center truncate"
          >
            Alex (Lead)
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("sarah")}
            className="text-xs py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-center truncate"
          >
            Sarah (Design)
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("marcus")}
            className="text-xs py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-center truncate"
          >
            Marcus (Dev)
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-950/80 p-1 rounded-xl mb-6 border border-slate-800/80">
        <button
          type="button"
          onClick={() => setAuthMode("password")}
          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
            authMode === "password"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Password Login
        </button>
        <button
          type="button"
          onClick={() => setAuthMode("otp")}
          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
            authMode === "otp"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          OTP Verification
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <PhoneInput
          label="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        {authMode === "password" ? (
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            {...register("password")}
            error={errors.password?.message}
          />
        ) : (
          <Input
            label="6-Digit Verification Code"
            type="text"
            placeholder="123456"
            maxLength={6}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
            {...register("otp")}
            error={errors.otp?.message}
          />
        )}

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2 font-semibold shadow-lg shadow-blue-600/30"
        >
          <span>Sign In to Workspace</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
};
