import { useState, useMemo, useCallback } from "react";
import useMembersQuery from "./useMembersQuery";
import useDeleteMembers from "./useDeleteMembers";
import type { RowSelectionState } from "@tanstack/react-table";
import type { Filter, Member } from "@/app/types";

function filterMembers(data: Member[], filter: Filter): Member[] {
  if (filter === "all") return data;
  return data.filter((m) => m.status === filter);
}

export const useMembersPage = () => {
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

  return {
    filtered,
    errorMessage,
    selectedIds,
    canBulkDelete,
    filter,
    rowSelection,
    confirmBulkOpen,
    isLoading: membersQuery.isLoading,
    isDeletePending: deleteMembers.isPending,
    setRowSelection,
    setConfirmBulkOpen,
    onFilterChange,
    onBulkDeleteClick,
    onConfirmBulkDelete,
  };
};
