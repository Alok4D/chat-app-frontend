"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareMore, Phone, User as UserIcon } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants/routes";

const DEMO_USERS = [
  { label: "User 1", phone: "+15551234567", name: "Alex Morgan" },
  { label: "User 2", phone: "+15551234568", name: "Sarah Chen" },
];

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { phone: "", name: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login({ phone: data.phone, name: data.name });
  };

  const handleFillDemo = (user: { phone: string; name: string }) => {
    setValue("phone", user.phone);
    setValue("name", user.name);
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl shadow-[#6C63FF]/10 p-8 relative overflow-hidden border border-[#F0EDFF]">
      {/* Light purple bg blob */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#EEF0FF] rounded-full blur-2xl pointer-events-none opacity-80" />

      {/* Brand Header */}
      <div className="text-center mb-7 relative z-10">
        <a href={ROUTES.LANDING} className="inline-flex items-center gap-2 mb-5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/25 group-hover:scale-105 transition-transform">
            <MessageSquareMore className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#1A1A2E] tracking-tight">Chatter</span>
        </a>
        <h1 className="text-[24px] font-extrabold text-[#1A1A2E] mb-1.5">Welcome back!</h1>
        <p className="text-[13.5px] text-[#6B6B80]">Sign in to continue to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        {/* Phone Field */}
        <div>
          <label className="block text-[13px] font-semibold text-[#1A1A2E] mb-1.5">Phone Number</label>
          <div className="flex items-center gap-2 border border-[#E0DFFE] rounded-xl bg-white px-3 py-3 focus-within:ring-2 focus-within:ring-[#6C63FF]/30 focus-within:border-[#6C63FF] transition-all">
            <div className="flex items-center gap-1.5 border-r border-[#E0DFFE] pr-2.5 mr-1 shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span className="text-[13px] font-medium text-[#444466]">+880</span>
              <span className="text-[#C0C0D8] text-xs">▾</span>
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 bg-transparent text-[13.5px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
              {...register("phone")}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          <p className="mt-1 text-[11.5px] text-[#9CA3AF]">We'll send you a verification code</p>
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-[13px] font-semibold text-[#1A1A2E] mb-1.5">Display Name</label>
          <div className="flex items-center gap-2 border border-[#E0DFFE] rounded-xl bg-white px-3 py-3 focus-within:ring-2 focus-within:ring-[#6C63FF]/30 focus-within:border-[#6C63FF] transition-all">
            <UserIcon className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Enter your display name"
              className="flex-1 bg-transparent text-[13.5px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-[#6C63FF] text-white text-[14px] font-bold hover:bg-[#5a52e8] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#6C63FF]/30 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>

      {/* Demo Accounts */}
      <div className="mt-6 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#F0EDFF]" />
          <span className="text-[12px] text-[#9CA3AF] font-medium whitespace-nowrap">Demo Accounts (for testing)</span>
          <div className="h-px flex-1 bg-[#F0EDFF]" />
        </div>
        <div className="space-y-2">
          {DEMO_USERS.map((u, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleFillDemo(u)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E0DFFE] bg-white hover:bg-[#F4F3FF] hover:border-[#C4BFFF] transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4F3FF] flex items-center justify-center text-[#6C63FF] shrink-0 group-hover:bg-[#6C63FF] group-hover:text-white transition-all">
                <UserIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#1A1A2E]">{u.label}</p>
                <p className="text-[11.5px] text-[#9CA3AF]">{u.phone}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <p className="text-center text-[11.5px] text-[#9CA3AF] mt-5 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#6C63FF] hover:underline font-medium">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="text-[#6C63FF] hover:underline font-medium">Privacy Policy</a>
      </p>
    </div>
  );
};
