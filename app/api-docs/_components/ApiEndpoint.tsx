"use client";

import React, { useState } from "react";
import { ApiMethod } from "./ApiMethod";
import { ApiResponse } from "./ApiResponse";
import { ChevronDown, ChevronUp, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "WS";
  path: string;
  title: string;
  description: string;
  authRequired?: boolean;
  requestBody?: any;
  response: {
    status: number;
    data: any;
    description?: string;
  };
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  method,
  path,
  title,
  description,
  authRequired = true,
  requestBody,
  response,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden backdrop-blur-xl transition-all">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ApiMethod method={method} />
          <span className="font-mono text-xs font-semibold text-slate-200 truncate">
            {path}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline truncate">
            — {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {authRequired && (
            <span
              title="Bearer Token Required"
              className="flex items-center gap-1 text-[11px] font-medium text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Auth</span>
            </span>
          )}
          <button className="text-slate-400 hover:text-white">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Accordion Details */}
      {isOpen && (
        <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-4 animate-slideDown">
          <p className="text-xs text-slate-300 leading-relaxed">{description}</p>

          {requestBody && (
            <div>
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Request Payload Schema
              </h5>
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[12px] font-mono text-blue-300 overflow-x-auto">
                <code>{JSON.stringify(requestBody, null, 2)}</code>
              </pre>
            </div>
          )}

          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Sample Response
            </h5>
            <ApiResponse
              statusCode={response.status}
              data={response.data}
              description={response.description}
            />
          </div>
        </div>
      )}
    </div>
  );
};
