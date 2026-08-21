"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserIcon, ChevronDown, Sparkles } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";

const DEMO_USERS = [
  { label: "Alex Morgan", phone: "+15551234567", name: "Alex Morgan" },
  { label: "Sarah Chen", phone: "+15551234568", name: "Sarah Chen" },
  { label: "Alok Demo", phone: "+8801719277951", name: "Alok" },
];

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [showDemoList, setShowDemoList] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { phone: "", name: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login({ phone: data.phone, name: data.name });
  };

  const handleGuestLogin = async () => {
    const guestUser = DEMO_USERS[0];
    setValue("phone", guestUser.phone);
    setValue("name", guestUser.name);
    await login({ phone: guestUser.phone, name: guestUser.name });
  };

  const handleSelectDemo = async (user: { phone: string; name: string }) => {
    setValue("phone", user.phone);
    setValue("name", user.name);
    setShowDemoList(false);
    await login({ phone: user.phone, name: user.name });
  };

  return (
    <div className="w-full max-w-[460px] bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#6C63FF]/5 border border-[#EDE9FE]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[26px] font-extrabold text-[#0F172A] tracking-tight">
          Sign in to Chatter
        </h2>
        <p className="text-[13.5px] text-[#64748B] mt-1 font-medium">
          Enter your details to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone Number */}
        <div>
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
            Phone Number
          </label>
          <div className="flex items-center border border-[#E2E8F0] rounded-xl bg-white focus-within:border-[#6C63FF] focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all overflow-hidden">
            {/* Country Selector */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-3 bg-[#F8FAFC] border-r border-[#E2E8F0] text-[13px] font-medium text-[#0F172A] shrink-0 hover:bg-[#F1F5F9] transition-colors"
            >
              <span className="text-base leading-none">🇧🇩</span>
              <span>+880</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 px-3 py-3 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</p>
          ) : (
            <p className="mt-1 text-[11.5px] text-[#94A3B8]">We'll send you a verification code</p>
          )}
        </div>

        {/* Your Name */}
        <div>
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
            Your Name
          </label>
          <div className="flex items-center gap-2.5 px-3.5 py-3 border border-[#E2E8F0] rounded-xl bg-white focus-within:border-[#6C63FF] focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all">
            <UserIcon className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input
              type="text"
              placeholder="Enter your name"
              className="flex-1 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Send OTP / Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-[#5B4FE1] hover:bg-[#4E42D4] text-white text-[14px] font-bold shadow-md shadow-[#5B4FE1]/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
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

      {/* Or continue with */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E2E8F0]" />
        </div>
        <span className="relative px-3 bg-white text-[12px] text-[#94A3B8] font-medium">
          or continue with
        </span>
      </div>

      {/* Continue as Guest Button */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13.5px] font-semibold text-[#0F172A] transition-all hover:border-[#CBD5E1]"
        >
          <UserIcon className="w-4 h-4 text-[#64748B]" />
          <span>Continue as Guest</span>
        </button>

        {/* Demo Users Switcher */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowDemoList(!showDemoList)}
            className="w-full flex items-center justify-center gap-1.5 text-[12px] font-medium text-[#6C63FF] hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showDemoList ? "Hide Quick Demo Accounts" : "View Quick Demo Accounts"}</span>
          </button>

          {showDemoList && (
            <div className="mt-3 space-y-1.5 p-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-fadeIn">
              {DEMO_USERS.map((u, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectDemo(u)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white hover:shadow-2xs text-left transition-all border border-transparent hover:border-[#E2E8F0]"
                >
                  <span className="text-[12.5px] font-semibold text-[#0F172A]">{u.name}</span>
                  <span className="text-[11.5px] text-[#64748B] font-mono">{u.phone}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Terms & Privacy */}
      <p className="text-center text-[11.5px] text-[#94A3B8] mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#6C63FF] hover:underline font-semibold">
          Terms of Service
        </a>{" "}
        <br className="hidden sm:inline" />
        and{" "}
        <a href="#" className="text-[#6C63FF] hover:underline font-semibold">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
