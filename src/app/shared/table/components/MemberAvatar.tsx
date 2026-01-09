import { cn } from "@/app/shared/lib/cn";

const MemberAvatar = ({
  name,
  avatarUrl,
  className,
}: {
  name: string;
  avatarUrl?: string | undefined;
  className?: string;
}) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn("h-9 w-9 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800", className)}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-zinc-700 dark:text-zinc-200">
          {initials}
        </div>
      )}
    </div>
  );
};

export default MemberAvatar;
