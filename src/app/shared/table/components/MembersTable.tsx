import React, { useMemo } from "react";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FileText } from "lucide-react";
import { GenericTable } from "@/app/shared/table/GenericTable/GenericTable";
import MemberRowActions from "@/app/shared/table/components/MemberRowActions";
import MemberAvatar from "@/app/shared/table/components/MemberAvatar";
import Badge from "@/app/shared/components/Badge";
import type { Member } from "@/app/api/members.schemas";

function formatSince(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleString(undefined, { month: "short" });
  return `Since ${month} ${d.getFullYear()}`;
}

const MembersTable = ({
  data,
  isLoading,
  errorMessage,
  rowSelection,
  onRowSelectionChange,
}: {
  data: Member[];
  isLoading: boolean;
  errorMessage?: string | null;
  rowSelection: RowSelectionState;
  onRowSelectionChange: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}) => {
  const columns = useMemo<ColumnDef<Member>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Member Name",
        cell: ({ row }) => {
          const m = row.original;
          return (
            <div className="flex items-center gap-3">
              <MemberAvatar name={m.name} avatarUrl={m.avatarUrl} />
              <div className="min-w-0">
                <div className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                  {m.name}
                </div>
                <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">{m.email}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          const m = row.original;
          return (
            <div className="min-w-0">
              <div className="truncate font-medium text-zinc-900 dark:text-zinc-100">{m.title}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{formatSince(m.since)}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "project",
        header: "Project",
        cell: ({ row }) => {
          const p = row.original.project;
          return (
            <div className="min-w-0">
              <div className="truncate font-medium text-zinc-900 dark:text-zinc-100">{p.name}</div>
              {p.subtitle ? (
                <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {p.subtitle}
                </div>
              ) : null}
            </div>
          );
        },
      },
      {
        accessorKey: "document",
        header: "Member Documents",
        cell: ({ row }) => {
          const doc = row.original.document;
          if (!doc) return <span className="text-xs text-zinc-500 dark:text-zinc-400">—</span>;
          return (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-red-600" />
              <div className="min-w-0">
                <div className="truncate text-sm text-zinc-900 dark:text-zinc-100">
                  {doc.filename}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {doc.sizeMb.toFixed(1)} MB
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <Badge variant={s === "active" ? "success" : "muted"}>
              <span
                className={
                  s === "active"
                    ? "h-1.5 w-1.5 rounded-full bg-emerald-500"
                    : "h-1.5 w-1.5 rounded-full bg-zinc-400"
                }
              />
              {s === "active" ? "Active" : "Absent"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <MemberRowActions member={row.original} />
          </div>
        ),
        size: 60,
      },
    ];
  }, []);

  return (
    <GenericTable<Member>
      data={data}
      columns={columns}
      isLoading={isLoading}
      errorMessage={errorMessage ?? null}
      getRowId={(m) => m.id}
      rowSelection={rowSelection}
      onRowSelectionChange={onRowSelectionChange}
      emptyTitle="No members found"
      emptyDescription="Try changing the filter."
    />
  );
};

export default MembersTable;
