import * as React from "react";
import { cn } from "@/app/shared/lib/cn";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-9 w-9 aspect-square items-center justify-center rounded-full border-0 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";

export default IconButton;
