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
    if (selectedIds.length === 0) {
      setError("Please select at least one participant");
      return;
    }
    setError(null);
    await onSubmit({ name: name.trim(), description: description.trim(), participantIds: selectedIds });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Group Name */}
      <div>
        <label className="block text-[12.5px] font-semibold text-[#8B949E] mb-1.5 uppercase tracking-wider">
          Group Name
        </label>
        <div className="flex items-center gap-2.5 bg-[#0D1117] border border-[#30363D] rounded-xl px-3.5 py-2.5 focus-within:border-[#6C63FF]/60 focus-within:ring-1 focus-within:ring-[#6C63FF]/20 transition-all">
          <Users className="w-4 h-4 text-[#8B949E] shrink-0" />
          <input
            type="text"
            placeholder="Enter group name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent text-[13.5px] text-[#E6EDF3] placeholder-[#8B949E] outline-none"
          />
          <span className="text-[11px] text-[#8B949E]">{name.length}/59</span>
        </div>
      </div>

      {/* Participant Selector */}
      <div>
        <label className="block text-[12.5px] font-semibold text-[#8B949E] mb-1.5 uppercase tracking-wider">
          Add Participants
        </label>
        <ParticipantSelector
          users={[]}
          selectedUserIds={selectedIds}
          onToggleParticipant={handleToggle}
        />
      </div>

      {error && <p className="text-xs text-[#FF7070] font-medium">{error}</p>}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#30363D]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[#6C63FF] text-white hover:bg-[#5a52e8] disabled:opacity-60 shadow-md shadow-[#6C63FF]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
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
