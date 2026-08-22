"use client";

import React from "react";
import { Modal } from "./Modal";
import { UserMinus, AlertTriangle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  iconType?: "removeUser" | "leaveGroup" | "warning";
  variant?: "danger" | "warning" | "primary";
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  iconType = "removeUser",
  variant = "danger",
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center p-2 select-none">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-xs",
            variant === "danger"
              ? "bg-red-50 text-red-600 border border-red-100"
              : "bg-[#6C63FF]/10 text-[#6C63FF]"
          )}
        >
          {iconType === "leaveGroup" ? (
            <LogOut className="w-6 h-6" />
          ) : iconType === "removeUser" ? (
            <UserMinus className="w-6 h-6" />
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
        </div>

        <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-[13.5px] text-[#64748B] leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13px] font-semibold text-[#475569] transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-xl text-[13px] font-bold text-white transition-all shadow-md cursor-pointer",
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                : "bg-[#6C63FF] hover:bg-[#5a52e8] shadow-[#6C63FF]/20"
            )}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
