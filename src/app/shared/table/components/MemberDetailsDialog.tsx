import LoadingSkeleton from "@/app/shared/components/LoadingSkeleton";
import Button from "@/app/shared/components/Button";
import { Dialog, DialogContent, DialogTitle } from "@/app/shared/components/Dialog";

const MemberDetailsDialog = ({
  open,
  onOpenChange,
  memberId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
}) => {
  const dummyData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Senior software engineer with 5+ years of experience in React and TypeScript. Passionate about building user-friendly applications and mentoring junior developers.",
  };

  const isLoading = false;
  const isError = false;
  const data = dummyData;
  const refetch = () => console.log(memberId, "Refetch member data");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>User details</DialogTitle>

        {isLoading ? (
          <div className="mt-4 space-y-2">
            <LoadingSkeleton className="h-4 w-2/3" />
            <LoadingSkeleton className="h-4 w-1/2" />
            <LoadingSkeleton className="h-20 w-full" />
          </div>
        ) : isError ? (
          <div className="mt-4">
            <div className="text-sm text-red-700 dark:text-red-200">
              Failed to load user details.
            </div>
            <Button className="mt-3" variant="secondary" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : data ? (
          <div className="mt-4 space-y-3">
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
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailsDialog;
