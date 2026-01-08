import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/app/shared/lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverPortal = PopoverPrimitive.Portal;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverPrimitive.PopoverContentProps
>(({ className, sideOffset = 8, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      {...props}
      className={cn(
        "z-50 w-80 rounded-xl border border-zinc-200 bg-white p-4 shadow-soft dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    />
  </PopoverPortal>
));
PopoverContent.displayName = "PopoverContent";

export default PopoverContent;
