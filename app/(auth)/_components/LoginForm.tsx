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
    <div className="w-full max-w-[480px] bg-white rounded-[28px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#F1F5F9]">
      {/* Title Header */}
      <div className="mb-8">
        <h2 className="text-[26px] font-bold text-[#0F172A] tracking-tight">
          Sign in to Chatter
        </h2>
        <p className="text-[13px] text-[#64748B] mt-1 font-normal">
          Enter your details to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Phone Number */}
        <div>
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-2">
            Phone Number
          </label>
          <div className="flex items-center h-[48px] border border-[#E2E8F0] rounded-xl bg-white focus-within:border-[#5B4FE1] focus-within:ring-2 focus-within:ring-[#5B4FE1]/10 transition-all overflow-hidden">
            {/* Country Selector */}
            <div className="flex items-center gap-1.5 px-3.5 h-full bg-white border-r border-[#E2E8F0] text-[13px] font-medium text-[#0F172A] shrink-0 select-none">
              <span className="text-base leading-none">🇧🇩</span>
              <span>+880</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 h-full px-3.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone.message}</p>
          ) : (
            <p className="mt-1.5 text-[11.5px] text-[#94A3B8]">We'll send you a verification code</p>
          )}
        </div>

        {/* Your Name */}
        <div className="mt-5">
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-2">
            Your Name
          </label>
          <div className="flex items-center h-[48px] px-3.5 border border-[#E2E8F0] rounded-xl bg-white focus-within:border-[#5B4FE1] focus-within:ring-2 focus-within:ring-[#5B4FE1]/10 transition-all gap-2.5">
            <UserIcon className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input
              type="text"
              placeholder="Enter your name"
              className="flex-1 h-full text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none bg-transparent"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Send OTP Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[48px] mt-6 rounded-xl bg-[#5B4FE1] hover:bg-[#4E42D4] text-white text-[14px] font-semibold shadow-md shadow-[#5B4FE1]/25 transition-all hover:scale-[1.005] active:scale-[0.995] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
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
      <div className="relative my-7 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E2E8F0]" />
        </div>
        <span className="relative px-3 bg-white text-[12px] text-[#94A3B8]">
          or continue with
        </span>
      </div>

      {/* Continue as Guest Button */}
      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={isLoading}
        className="w-full h-[48px] flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13.5px] font-medium text-[#0F172A] transition-all hover:border-[#CBD5E1]"
      >
        <UserIcon className="w-4 h-4 text-[#64748B]" />
        <span>Continue as Guest</span>
      </button>

      {/* Footer Terms */}
      <p className="text-center text-[11.5px] text-[#64748B] mt-8 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="text-[#5B4FE1] font-semibold hover:underline">
          Terms of Service
        </a>{" "}
        <br />
        and{" "}
        <a href="#" className="text-[#5B4FE1] font-semibold hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
