"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface ApiResponseProps {
  statusCode: number;
  data: any;
  description?: string;
}

export const ApiResponse: React.FC<ApiResponseProps> = ({
  statusCode,
  data,
  description,
}) => {
  const [copied, setCopied] = useState(false);
  const formatted = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2 mt-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono font-semibold px-2 py-0.5 rounded-md ${
              statusCode < 300
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            HTTP {statusCode}
          </span>
          {description && <span className="text-slate-400">{description}</span>}
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Response</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[12px] font-mono text-slate-300 overflow-x-auto custom-scrollbar">
        <code>{formatted}</code>
      </pre>
    </div>
  );
};
