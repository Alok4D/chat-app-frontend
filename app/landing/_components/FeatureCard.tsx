import React, { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  tag,
}) => {
  return (
    <Card hover className="flex flex-col items-start text-left p-6">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
          {icon}
        </div>
        {tag && (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {tag}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </Card>
  );
};
