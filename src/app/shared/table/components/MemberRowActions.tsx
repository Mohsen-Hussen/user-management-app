import { useState, useCallback } from "react";
import { MoreVertical, Trash2, UserRound, ToggleLeft } from "lucide-react";
import IconButton from "@/app/shared/components/IconButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/shared/components/DropdownMenu";
import ConfirmDialog from "@/app/shared/components/ConfirmDialog";
import MemberDetailsDialog from "./MemberDetailsDialog";

type Member = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  since: string;
  project: {
    name: string;
    subtitle: string;
    iconKey: string;
  };
  document: {
    filename: string;
    sizeMb: number;
  };
  status: "active" | "absent";
  phone: string;
  location: string;
  bio: string;
};

const dummyMember: Member = {
  id: "1",
  name: "James Brown",
  email: "james@aliqui.com",
  avatarUrl: "https://i.pravatar.cc/100?img=12",
  title: "Marketing Manager",
  since: "2021-02-01",
  project: {
    name: "Monday.com",
    subtitle: "Campaign Strategy Brainstorm",
    iconKey: "monday",
  },
  document: {
    filename: "brown-james.pdf",
    sizeMb: 2.4,
  },
  status: "active",
  phone: "+20 10 1234 5678",
  location: "Cairo, EG",
  bio: "Focuses on growth strategy and campaign experimentation.",
};

const updateStatus = {
  mutate: ({ id, status }: { id: string; status: string }) => {
    console.log(`Mock: Updating status for member ${id} to ${status}`);
  },
  isPending: false,
};

const deleteMembers = {
  mutate: (ids: string[], options?: { onSuccess?: () => void }) => {
    console.log(`Mock: Deleting members with ids:`, ids);
    options?.onSuccess?.();
  },
  isPending: false,
};

export function MemberRowActions({ member = dummyMember }: { member?: Member }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onToggleStatus = useCallback(() => {
    const next = member.status === "active" ? "absent" : "active";
    updateStatus.mutate({ id: member.id, status: next });
  }, [member.id, member.status]);

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

  const onConfirmDelete = useCallback(() => {
    deleteMembers.mutate([member.id], { onSuccess: () => setConfirmOpen(false) });
  }, [member.id]);

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
}
