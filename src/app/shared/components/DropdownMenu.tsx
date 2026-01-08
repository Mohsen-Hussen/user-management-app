import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/app/shared/lib/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuPrimitive.DropdownMenuContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    {...props}
    className={cn(
      "z-50 min-w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-soft dark:border-zinc-800 dark:bg-zinc-950",
      className,
    )}
  />
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuPrimitive.DropdownMenuItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    {...props}
    className={cn("my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
