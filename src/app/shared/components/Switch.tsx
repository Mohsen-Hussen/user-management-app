import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/app/shared/lib/cn";

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-zinc-200 bg-zinc-100 transition-colors data-[state=checked]:bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:data-[state=checked]:bg-zinc-100",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-5 dark:bg-zinc-950 dark:data-[state=checked]:bg-zinc-900",
        )}
      />
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = "Switch";

export default Switch;
