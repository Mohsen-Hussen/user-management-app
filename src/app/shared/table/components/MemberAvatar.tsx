import { cn } from "@/app/shared/lib/cn";
import jamesBrown from "@/app/assets/james-brown.svg";
import sophiaWilliams from "@/app/assets/sophia-williams.svg";
import arthurTaylor from "@/app/assets/arthur-taylor.svg";
import emmaWright from "@/app/assets/emma-wright.svg";
import matthewJohnson from "@/app/assets/matthew-johnson.svg";
import lauraPerez from "@/app/assets/laura-perez.svg";
import weiChen from "@/app/assets/wei-chen.svg";

const avatarMap: Record<string, string> = {
  "James Brown": jamesBrown,
  "Sophia Williams": sophiaWilliams,
  "Arthur Taylor": arthurTaylor,
  "Emma Wright": emmaWright,
  "Matthew Johnson": matthewJohnson,
  "Laura Perez": lauraPerez,
  "Wei Chen": weiChen,
};

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

  const localAvatar = avatarMap[name];

  return (
    <div
      className={cn("h-9 w-9 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800", className)}
    >
      {localAvatar ? (
        <img src={localAvatar} alt={name} className="h-full w-full object-cover" />
      ) : avatarUrl ? (
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
