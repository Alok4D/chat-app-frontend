"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserIcon, ChevronDown } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";

const DEMO_USERS = [
  { label: "Alex Morgan", phone: "+15551234567", name: "Alex Morgan" },
  { label: "Sarah Chen", phone: "+15551234568", name: "Sarah Chen" },
  { label: "Alok Demo", phone: "+8801719277951", name: "Alok" },
];

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

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

  return (
    <div className="w-full max-w-[460px] bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-[#ECEEF2]">
      {/* Title Header */}
      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-[#0F172A] tracking-tight">
          Sign in to Chatter
        </h2>
        <p className="text-[13px] text-[#64748B] mt-1">
          Enter your details to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Phone Number Field */}
        <div>
          <label className="block text-[12.5px] font-semibold text-[#0F172A] mb-1.5">
            Phone Number
          </label>
          <div className="flex items-center h-[46px] border border-[#E2E8F0] rounded-lg bg-white focus-within:border-[#5844ED] transition-colors overflow-hidden">
           
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 h-full px-3 text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Your Name Field */}
        <div className="mt-4">
          <label className="block text-[12.5px] font-semibold text-[#0F172A] mb-1.5">
            Your Name
          </label>
          <div className="flex items-center h-[46px] px-3 border border-[#E2E8F0] rounded-lg bg-white focus-within:border-[#5844ED] transition-colors gap-2">
            <UserIcon className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input
              type="text"
              placeholder="Enter your name"
              className="flex-1 h-full text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Send OTP Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[46px] mt-5 rounded-lg bg-[#5844ED] hover:bg-[#4E39E0] text-white text-[13.5px] font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E2E8F0]" />
        </div>
        <span className="relative px-3 bg-white text-[11.5px] text-[#94A3B8]">
          or continue with
        </span>
      </div>

      {/* Continue as Guest Button */}
      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={isLoading}
        className="w-full h-[46px] flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13px] font-medium text-[#0F172A] transition-colors"
      >
        <UserIcon className="w-4 h-4 text-[#64748B]" />
        <span>Continue as Guest</span>
      </button>

      {/* Footer Terms */}
      <p className="text-center text-[11px] text-[#64748B] mt-7 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#5844ED] font-medium hover:underline">
          Terms of Service
        </a>{" "}
        <br />
        and{" "}
        <a href="#" className="text-[#5844ED] font-medium hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
