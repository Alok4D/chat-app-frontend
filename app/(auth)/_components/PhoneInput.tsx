"use client";

import React, { forwardRef } from "react";
import { Phone } from "lucide-react";
import { Input, InputProps } from "@/components/ui/Input";

export interface PhoneInputProps extends Omit<InputProps, "type"> {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, countryCode = "+1", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <Input
          ref={ref}
          type="tel"
          placeholder="+1 (555) 000-0000"
          leftIcon={<Phone className="w-4 h-4" />}
          className={className}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
