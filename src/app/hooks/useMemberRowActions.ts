import { useState, useCallback } from "react";
import useUpdateMemberStatus from "./useUpdateMemberStatus";
import useDeleteMembers from "./useDeleteMembers";
import type { Member } from "@/app/api/members.schemas";

interface UseMemberRowActionsProps {
  member: Member;
}

export const useMemberRowActions = ({ member }: UseMemberRowActionsProps) => {
  const updateStatus = useUpdateMemberStatus();
  const deleteMembers = useDeleteMembers();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const onToggleStatus = useCallback(() => {
    const next = member.status === "active" ? "absent" : "active";
    updateStatus.mutate({ id: member.id, status: next });
  }, [member.id, member.status, updateStatus]);

  const onViewDetailsSelect = useCallback((e: Event) => {
    e.preventDefault();
    setMenuOpen(false);
    setDetailsOpen(true);
  }, []);

  const onDeleteSelect = useCallback((e: Event) => {
    e.preventDefault();
    setMenuOpen(false);
    setConfirmOpen(true);
  }, []);

  const onEditSelect = useCallback((e: Event) => {
    e.preventDefault();
    setMenuOpen(false);
    setEditOpen(true);
  }, []);

  const onConfirmDelete = useCallback(() => {
    deleteMembers.mutate([member.id], { onSuccess: () => setConfirmOpen(false) });
  }, [deleteMembers, member.id]);

  return {
    menuOpen,
    detailsOpen,
    confirmOpen,
    editOpen,
    setMenuOpen,
    setDetailsOpen,
    setConfirmOpen,
    setEditOpen,
    onToggleStatus,
    onViewDetailsSelect,
    onDeleteSelect,
    onEditSelect,
    onConfirmDelete,
    isUpdateStatusPending: updateStatus.isPending,
    isDeletePending: deleteMembers.isPending,
  };
};
