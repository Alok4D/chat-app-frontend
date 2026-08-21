import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ParticipantSelector } from "./ParticipantSelector";
import { useUsers } from "@/hooks/useUsers";
import { Users, FileText } from "lucide-react";

export interface GroupFormProps {
  onSubmit: (data: { name: string; description: string; participantIds: string[] }) => Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const { users } = useUsers();
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
      <Input
        label="Group Name"
        placeholder="e.g. Design & Frontend Core"
        value={name}
        onChange={(e) => setName(e.target.value)}
        leftIcon={<Users className="w-4 h-4" />}
        required
      />

      <Input
        label="Description (Optional)"
        placeholder="Brief description of the group's purpose"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        leftIcon={<FileText className="w-4 h-4" />}
      />

      <ParticipantSelector
        users={users}
        selectedUserIds={selectedIds}
        onToggleParticipant={handleToggle}
      />

      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" isLoading={isLoading}>
          Create Group
        </Button>
      </div>
    </form>
  );
};
