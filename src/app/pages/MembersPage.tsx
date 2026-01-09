import { useState, useMemo, useCallback } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import MembersTable from "@/app/shared/table/components/MembersTable";
import Button from "@/app/shared/components/Button";
import ConfirmDialog from "@/app/shared/components/ConfirmDialog";
import { cn } from "@/app/shared/lib/cn";

const dummyMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    title: "Senior Developer",
    since: "2022-01-15",
    project: {
      name: "E-commerce Platform",
      subtitle: "Frontend Development",
      iconKey: "shopping-cart",
    },
    document: {
      filename: "resume_john_doe.pdf",
      sizeMb: 2.4,
    },
    status: "active",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Experienced frontend developer with expertise in React and TypeScript.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    title: "Product Designer",
    since: "2021-06-20",
    project: {
      name: "Mobile App Redesign",
      subtitle: "UI/UX Design",
      iconKey: "palette",
    },
    document: {
      filename: "portfolio_jane_smith.pdf",
      sizeMb: 5.8,
    },
    status: "active",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    bio: "Creative designer passionate about user-centered design and accessibility.",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    title: "Backend Engineer",
    since: "2020-03-10",
    project: {
      name: "API Infrastructure",
      subtitle: "Backend Development",
      iconKey: "server",
    },
    document: {
      filename: "technical_specs_mike.pdf",
      sizeMb: 1.2,
    },
    status: "absent",
    phone: "+1 (555) 246-8135",
    location: "Austin, TX",
    bio: "Backend specialist focusing on scalable microservices and cloud architecture.",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    title: "DevOps Engineer",
    since: "2021-11-05",
    project: {
      name: "CI/CD Pipeline",
      subtitle: "Infrastructure",
      iconKey: "settings",
    },
    document: {
      filename: "devops_docs_sarah.pdf",
      sizeMb: 3.6,
    },
    status: "active",
    phone: "+1 (555) 369-2580",
    location: "Seattle, WA",
    bio: "DevOps expert with experience in Kubernetes, Docker, and cloud platforms.",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom.brown@company.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    title: "QA Engineer",
    since: "2022-08-12",
    project: {
      name: "Testing Framework",
      subtitle: "Quality Assurance",
      iconKey: "check-circle",
    },
    document: {
      filename: "test_cases_tom.pdf",
      sizeMb: 4.1,
    },
    status: "absent",
    phone: "+1 (555) 147-2589",
    location: "Boston, MA",
    bio: "Quality assurance engineer focused on automated testing and test-driven development.",
  },
];

const useMembersQuery = () => ({
  data: dummyMembers,
  isLoading: false,
  isError: false,
  error: null,
});

const useDeleteMembers = () => ({
  mutate: (ids: string[], options?: { onSuccess?: () => void }) => {
    console.log("Mock delete members:", ids);
    setTimeout(() => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }, 500);
  },
  isPending: false,
});

type Filter = "all" | "active" | "absent";
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

  const filtered = useMemo(() => {
    const members = membersQuery.data ?? [];
    return filterMembers(members, filter);
  }, [membersQuery.data, filter]);

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
        <div className="inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
          {(
            [
              ["all", "All"],
              ["active", "Active"],
              ["absent", "Absent"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                filter === key
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900",
              )}
              onClick={() => onFilterChange(key)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <Button
          variant="danger"
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
