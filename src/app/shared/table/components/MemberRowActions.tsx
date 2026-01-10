import { useMemberRowActions } from "@/app/hooks/useMemberRowActions";
import { MoreVertical, Trash2, UserRound, ToggleLeft, Edit } from "lucide-react";
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
import type { Member } from "@/app/types";

const MemberRowActions = ({ member }: { member: Member }) => {
  const {
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
    isUpdateStatusPending,
    isDeletePending,
  } = useMemberRowActions({ member });

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

          <DropdownMenuItem onSelect={() => onToggleStatus()} disabled={isUpdateStatusPending}>
            <ToggleLeft className="h-4 w-4" />
            Toggle status
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={onDeleteSelect}
            className="text-red-700 dark:text-red-200"
            disabled={isDeletePending}
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
        isPending={isDeletePending}
        tone="danger"
      />
    </>
  );
};

export default MemberRowActions;
