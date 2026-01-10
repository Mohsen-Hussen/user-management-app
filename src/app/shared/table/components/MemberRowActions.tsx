import { useState, useCallback } from "react";
import { MoreVertical, Trash2, UserRound, ToggleLeft, Edit } from "lucide-react";
import useUpdateMemberStatus from "@/app/hooks/useUpdateMemberStatus";
import useDeleteMembers from "@/app/hooks/useDeleteMembers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/shared/components/DropdownMenu";
import ConfirmDialog from "@/app/shared/components/ConfirmDialog";
import MemberDetailsDialog from "@/app/shared/table/components/MemberDetailsDialog";
import EditMemberFormDialog from "@/app/shared/table/components/EditMemberFormDialog";
import IconButton from "@/app/shared/components/IconButton";
import type { Member } from "@/app/api/members.schemas";

const MemberRowActions = ({ member }: { member: Member }) => {
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

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Row actions">
            <MoreVertical className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onViewDetailsSelect}>
            <UserRound className="h-4 w-4" />
            View details
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onEditSelect}>
            <Edit className="h-4 w-4" />
            Edit member
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => onToggleStatus()} disabled={updateStatus.isPending}>
            <ToggleLeft className="h-4 w-4" />
            Toggle status
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={onDeleteSelect}
            className="text-red-700 dark:text-red-200"
            disabled={deleteMembers.isPending}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MemberDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} memberId={member.id} />

      <EditMemberFormDialog open={editOpen} onOpenChange={setEditOpen} member={member} />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete user?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={onConfirmDelete}
        isPending={deleteMembers.isPending}
        tone="danger"
      />
    </>
  );
};

export default MemberRowActions;
