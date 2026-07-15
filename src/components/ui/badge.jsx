import * as React from "react";
import { cn } from "@/lib/utils";

const toneClasses = {
  default: "bg-primary/15 text-primary-foreground border-primary/30",
  success: "bg-success/15 text-success border-success/30",
  sky: "bg-sky/15 text-sky border-sky/30",
  secondary: "bg-secondary/15 text-secondary border-secondary/30",
  muted: "bg-muted text-muted-foreground border-border",
  warning: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
};

export function Badge({ className, tone = "default", children, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        toneClasses[tone] || toneClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
