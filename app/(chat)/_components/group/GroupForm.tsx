import React, { useState } from "react";
import { ParticipantSelector } from "./ParticipantSelector";
import { Users } from "lucide-react";

export interface GroupFormProps {
  onSubmit: (data: { name: string; description: string; participantIds: string[] }) => Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({ onSubmit, isLoading = false, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (userId: string) => {
    setError(null);
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a group name");
      return;
    }
    if (selectedIds.length < 2) {
      setError("Please select at least 2 participants (groups require at least 3 members total)");
      return;
    }
    setError(null);
    try {
      await onSubmit({ name: name.trim(), description: description.trim(), participantIds: selectedIds });
    } catch (err: any) {
      setError(err?.message || "Failed to create group");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Group Name */}
      <div>
        <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5 uppercase tracking-wider">
          Group Name
        </label>
        <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 focus-within:border-[#6C63FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all">
          <Users className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <input
            type="text"
            placeholder="e.g. Design Team 🎨"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            maxLength={59}
            className="flex-1 bg-transparent text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none"
          />
          <span className="text-[11px] text-[#94A3B8]">{name.length}/59</span>
        </div>
      </div>

      {/* Participant Selector */}
      <div>
        <label className="block text-[12.5px] font-semibold text-[#475569] mb-1.5 uppercase tracking-wider">
          Add Participants (minimum 2)
        </label>
        <ParticipantSelector
          users={[]}
          selectedUserIds={selectedIds}
          onToggleParticipant={handleToggle}
        />
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !name.trim() || selectedIds.length < 2}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[#6C63FF] text-white hover:bg-[#5a52e8] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#6C63FF]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Users className="w-4 h-4" />
              Create Group
            </>
          )}
        </button>
      </div>
    </form>
  );
};
