import { useCallback } from "react";
import { cn } from "@/app/shared/lib/cn";
import type { Filter, FilterTabsProps } from "@/app/types";

const FilterTabs = ({ filter, onFilterChange }: FilterTabsProps) => {
  const handleFilterChange = useCallback(
    (f: Filter) => {
      onFilterChange(f);
    },
    [onFilterChange],
  );

  return (
    <div className="inline-flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
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
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            filter === key
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
          )}
          onClick={() => handleFilterChange(key)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
