import React from "react";
import { useGenericTable } from "./useGenericTable";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/app/shared/lib/cn";
import EmptyState from "@/app/shared/components/EmptyState";
import ErrorState from "@/app/shared/components/ErrorState";
import LoadingSkeleton from "@/app/shared/components/LoadingSkeleton";
import { GenericTableProps } from "@/app/types";

function TableSkeleton() {
  return (
    <div className="space-y-2">
      <LoadingSkeleton className="h-10 w-full" />
      <LoadingSkeleton className="h-10 w-full" />
      <LoadingSkeleton className="h-10 w-full" />
      <LoadingSkeleton className="h-10 w-full" />
      <LoadingSkeleton className="h-10 w-full" />
    </div>
  );
}

export const GenericTable = React.memo(function GenericTable<TData>(
  props: GenericTableProps<TData>,
) {
  const { data, isLoading, errorMessage, emptyTitle = "No results", emptyDescription } = props;

  const { table } = useGenericTable(props);

  if (isLoading) return <TableSkeleton />;

  if (errorMessage) {
    return <ErrorState title="Something went wrong" description={errorMessage} />;
  }

  if (!data.length) {
    return (
      <EmptyState title={emptyTitle} {...(emptyDescription && { description: emptyDescription })} />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-zinc-50 text-left dark:bg-zinc-900/40">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-zinc-200 dark:border-zinc-800">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      "px-4 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-300",
                      header.id === "__select__" && "w-12",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      "px-4 py-4 align-middle text-sm text-zinc-800 dark:text-zinc-100",
                      cell.column.id === "__select__" && "w-12",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}) as <TData>(props: GenericTableProps<TData>) => React.ReactElement;
