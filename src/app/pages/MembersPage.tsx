import { useState, useMemo, useCallback } from "react";
import useMembersQuery from "@/app/hooks/useMembersQuery";
import useDeleteMembers from "@/app/hooks/useDeleteMembers";
import MembersTable from "@/app/shared/table/components/MembersTable";
import FilterTabs from "@/app/shared/table/components/FilterTabs";
import Button from "@/app/shared/components/Button";
import ConfirmDialog from "@/app/shared/components/ConfirmDialog";
import type { RowSelectionState } from "@tanstack/react-table";
import type { Member } from "@/app/api/members.schemas";

type Filter = "all" | "active" | "absent";

function filterMembers(data: Member[], filter: Filter): Member[] {
  if (filter === "all") return data;
  return data.filter((m) => m.status === filter);
}

const MembersPage = () => {
  const membersQuery = useMembersQuery();
  const deleteMembers = useDeleteMembers();

  const [filter, setFilter] = useState<Filter>("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [confirmBulkOpen, setConfirmBulkOpen] = useState<boolean>(false);

  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data]);

  const filtered = useMemo(() => filterMembers(members, filter), [members, filter]);

  const selectedIds = useMemo(
    () => Object.keys(rowSelection).filter((k) => rowSelection[k]),
    [rowSelection],
  );
  const canBulkDelete = selectedIds.length > 0;

  const onFilterChange = useCallback((f: Filter) => {
    setFilter(f);
    setRowSelection({});
  }, []);

  const onBulkDeleteClick = useCallback(() => setConfirmBulkOpen(true), []);
  const onConfirmBulkDelete = useCallback(() => {
    deleteMembers.mutate(selectedIds, {
      onSuccess: () => {
        setConfirmBulkOpen(false);
        setRowSelection({});
      },
    });
  }, [deleteMembers, selectedIds]);

  const errorMessage = membersQuery.isError ? "Failed to load members. Please try again." : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterTabs filter={filter} onFilterChange={onFilterChange} />

        <Button
          className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/20"
          variant="outline"
          size="sm"
          disabled={!canBulkDelete || deleteMembers.isPending}
          onClick={onBulkDeleteClick}
        >
          Delete Selected
        </Button>
      </div>

      <MembersTable
        data={filtered}
        isLoading={membersQuery.isLoading}
        errorMessage={errorMessage}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <ConfirmDialog
        open={confirmBulkOpen}
        onOpenChange={setConfirmBulkOpen}
        title={`Delete ${selectedIds.length} user(s)?`}
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={onConfirmBulkDelete}
        isPending={deleteMembers.isPending}
        tone="danger"
      />
    </div>
  );
};

export default MembersPage;
