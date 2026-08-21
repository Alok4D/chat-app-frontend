"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { GroupForm } from "./GroupForm";
import { useGroups } from "@/hooks/useGroups";
import { useAppSelector } from "@/redux/hooks";

export const CreateGroupModal: React.FC = () => {
  const isOpen = useAppSelector((s) => s.chat.isCreateGroupModalOpen);
  const { createGroup, isSubmitting, closeModal } = useGroups();

  const handleCreate = async (data: { name: string; description: string; participantIds: string[] }) => {
    await createGroup(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Create New Group"
      description="Collaborate with multiple team members simultaneously"
    >
      <GroupForm
        onSubmit={handleCreate}
        isLoading={isSubmitting}
        onCancel={closeModal}
      />
    </Modal>
  );
};
