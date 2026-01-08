import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";

export type GenericTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  errorMessage?: string | null;

  getRowId: (row: TData) => string;

  rowSelection: RowSelectionState;
  onRowSelectionChange: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;

  emptyTitle?: string;
  emptyDescription?: string;
};
