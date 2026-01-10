import { useMembersPage } from "@/app/hooks/useMembersPage";
import MembersTable from "@/app/shared/table/components/MembersTable";
import FilterTabs from "@/app/shared/table/components/FilterTabs";
import Button from "@/app/shared/components/Button";
import ConfirmDialog from "@/app/shared/components/ConfirmDialog";

const MembersPage = () => {
  const {
    filtered,
    errorMessage,
    selectedIds,
    canBulkDelete,
    filter,
    rowSelection,
    confirmBulkOpen,
    isLoading,
    isDeletePending,
    setRowSelection,
    setConfirmBulkOpen,
    onFilterChange,
    onBulkDeleteClick,
    onConfirmBulkDelete,
  } = useMembersPage();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterTabs filter={filter} onFilterChange={onFilterChange} />

        <Button
          className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/20"
          variant="outline"
          size="sm"
          disabled={!canBulkDelete || isDeletePending}
          onClick={onBulkDeleteClick}
        >
          Delete Selected
        </Button>
      </div>

      <MembersTable
        data={filtered}
        isLoading={isLoading}
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
        isPending={isDeletePending}
        tone="danger"
      />
    </div>
  );
};

export default MembersPage;
