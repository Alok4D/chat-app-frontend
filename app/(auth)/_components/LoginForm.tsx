"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { phone: "", name: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login({ phone: data.phone, name: data.name });
  };

  return (
    <div className="w-full max-w-[520px] px-0 py-8 sm:p-10 md:p-12">
      
      {/* Centered Brand Logo (Enlarged) */}
      <div className="flex justify-center mb-5">
        {/* Mobile Logo */}
       <Link href={ROUTES.HOME}>
        <Image
          src="/logo/nav-logo.png"
          alt="Chatter Logo"
          width={190}
          height={54}
          className="block md:hidden h-11 w-auto object-contain"
          priority
        />
       </Link>
        {/* Tablet & Desktop Logo */}
       <Link href={ROUTES.HOME}>
        <Image
          src="/icons/favlogo.png"
          alt="Chatter Logo"
          width={190}
          height={154}
          className="hidden md:block h-24 w-auto object-contain"
          priority
        />
       </Link>
      </div>

      {/* Centered Subtitle */}
      <p className="text-center text-[15.5px] text-[#64748B] mb-9 font-medium">
        Sign in to your Chatter account.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
       

        {/* Your Name Field */}
        <div className="space-y-2 text-left">
          <label className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-[54px] px-5 rounded-xs bg-white text-[14.5px] text-[#0F172A] placeholder-[#94A3B8] border border-[#CBD5E1] focus:border-[#5B4FE1] focus:ring-4 focus:ring-[#5B4FE1]/10 shadow-2xs outline-none transition-all"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

         {/* Phone Number Field */}
        <div className="space-y-2 text-left">
          <label className="block text-[12.5px] font-bold text-[#64748B] uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full h-[54px] px-5 rounded-xs bg-white text-[14.5px] text-[#0F172A] placeholder-[#94A3B8] border border-[#CBD5E1] focus:border-[#5B4FE1] focus:ring-4 focus:ring-[#5B4FE1]/10 shadow-2xs outline-none transition-all"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[54px] mt-8 rounded-xs bg-[#5B4FE1] hover:bg-[#4E39E0] text-white text-[15.5px] font-bold shadow-lg shadow-[#5B4FE1]/15 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        
      </form>
      
    </div>
  );
};
