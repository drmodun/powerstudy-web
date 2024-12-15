import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, fullPage = false, size = "md", ...props }, ref) => {
    const spinner = (
      <Loader2
        className={cn("animate-spin text-primary", sizeClasses[size])}
        aria-label="Loading"
      />
    );

    if (fullPage) {
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
            className
          )}
          {...props}
        >
          {spinner}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        {spinner}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
