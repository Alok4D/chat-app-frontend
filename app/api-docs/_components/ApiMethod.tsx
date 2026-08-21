import React from "react";
import { Badge } from "@/components/ui/Badge";

export interface ApiMethodProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "WS";
}

export const ApiMethod: React.FC<ApiMethodProps> = ({ method }) => {
  const methodColors: Record<string, "primary" | "secondary" | "success" | "danger" | "warning"> = {
    GET: "primary",
    POST: "success",
    PUT: "warning",
    DELETE: "danger",
    PATCH: "warning",
    WS: "primary",
  };

  return (
    <Badge
      variant={methodColors[method] || "secondary"}
      className="font-mono font-bold tracking-wider uppercase px-2 py-0.5 text-[11px]"
    >
      {method}
    </Badge>
  );
};
