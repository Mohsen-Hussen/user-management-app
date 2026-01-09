import React, { useState, useCallback } from "react";
import useMemberDetailsQuery from "@/app/hooks/useMemberDetailsQuery";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/shared/components/Popover";
import Button from "@/app/shared/components/Button";
import LoadingSkeleton from "@/app/shared/components/LoadingSkeleton";

const MemberDetailsPopover = ({
  memberId,
  trigger,
}: {
  memberId: string;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isError, refetch } = useMemberDetailsQuery(memberId, open);
  const onOpenChange = useCallback((next: boolean) => setOpen(next), []);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">User details</div>

        {isLoading ? (
          <div className="mt-3 space-y-2">
            <LoadingSkeleton className="h-4 w-2/3" />
            <LoadingSkeleton className="h-4 w-1/2" />
            <LoadingSkeleton className="h-20 w-full" />
          </div>
        ) : isError ? (
          <div className="mt-3">
            <div className="text-sm text-red-700 dark:text-red-200">
              Failed to load user details.
            </div>
            <Button className="mt-3" variant="secondary" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : data ? (
          <div className="mt-3 space-y-3">
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Name</div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">{data.name}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Email</div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">{data.email}</div>
            </div>
            {data.phone ? (
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Phone</div>
                <div className="text-sm text-zinc-900 dark:text-zinc-100">{data.phone}</div>
              </div>
            ) : null}
            {data.location ? (
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Location</div>
                <div className="text-sm text-zinc-900 dark:text-zinc-100">{data.location}</div>
              </div>
            ) : null}
            {data.bio ? (
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Bio</div>
                <div className="text-sm text-zinc-700 dark:text-zinc-200">{data.bio}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default MemberDetailsPopover;
