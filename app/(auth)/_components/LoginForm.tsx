"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Sparkles, User as UserIcon } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { PhoneInput } from "./PhoneInput";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "+15551234567",
      name: "Alex Morgan",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login({
      phone: data.phone,
      name: data.name,
    });
  };

  const handleFillDemo = (type: "alex" | "sarah" | "marcus") => {
    if (type === "alex") {
      setValue("phone", "+15551234567");
      setValue("name", "Alex Morgan");
    } else if (type === "sarah") {
      setValue("phone", "+15551234568");
      setValue("name", "Sarah Chen");
    } else {
      setValue("phone", "+15551234569");
      setValue("name", "Marcus Vance");
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
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome to PulseChat</h1>
        <p className="text-sm text-slate-400 mt-1.5">
          Enter your name and phone number to sign in or create an account automatically.
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
            Alex Morgan
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("sarah")}
            className="text-xs py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-center truncate"
          >
            Sarah Chen
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("marcus")}
            className="text-xs py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-center truncate"
          >
            Marcus Vance
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <PhoneInput
          label="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Display Name"
          type="text"
          placeholder="e.g. Ada Lovelace"
          leftIcon={<UserIcon className="w-4 h-4" />}
          {...register("name")}
          error={errors.name?.message}
        />

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2 font-semibold shadow-lg shadow-blue-600/30"
        >
          <span>Enter Workspace</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          No password required. New phone numbers are automatically registered.
        </p>
      </div>
    </div>
  );
};
