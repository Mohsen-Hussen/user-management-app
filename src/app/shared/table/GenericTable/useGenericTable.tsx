import { useMemo } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Table,
  type Row,
  type ColumnDef,
} from "@tanstack/react-table";
import Checkbox from "@/app/shared/components/Checkbox";
import type { GenericTableProps } from "./types";

export function useGenericTable<TData>({
  data,
  columns,
  getRowId,
  rowSelection,
  onRowSelectionChange,
  sorting,
  onSortingChange,
}: GenericTableProps<TData>) {
  const selectionColumn: ColumnDef<TData, unknown> = useMemo(
    () => ({
      id: "__select__",
      header: ({ table }: { table: Table<TData> }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={(e) => table.toggleAllRowsSelected(!!e.target.checked)}
          />
        </div>
      ),
      cell: ({ row }: { row: Row<TData> }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
          />
        </div>
      ),
      size: 44,
      enableSorting: false,
      enableHiding: false,
    }),
    [],
  );

  const table = useReactTable({
    data,
    columns: useMemo(() => [selectionColumn, ...columns], [selectionColumn, columns]),
    getRowId: (row) => getRowId(row as TData),
    state: {
      rowSelection,
      ...(sorting && { sorting }),
    },
    onRowSelectionChange,
    ...(onSortingChange && { onSortingChange }),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table };
}
