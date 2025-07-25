"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-3 w-full overflow-visible rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-3 w-3 flex-1 rounded-full shadow-lg ring-2 ring-primary/50 dark:ring-gray-500"
        style={{ marginLeft: `calc(${value}% - 0.8rem)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
