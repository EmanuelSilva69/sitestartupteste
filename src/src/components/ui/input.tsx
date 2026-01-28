import * as React from "react";
import { cn } from "./utils";
import { Loader2, TriangleAlert } from "lucide-react"; // Import new icons

function Input({
  className,
  type,
  isError = false, // New prop
  isLoading = false, // New prop
  ...props
}: React.ComponentProps<"input"> & {
  isError?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isError && "border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]", // Error styling
          isLoading && "pr-10", // Add padding for spinner
          className,
        )}
        aria-invalid={isError} // Set aria-invalid based on isError prop
        {...props}
      />
      {isError && (
        <TriangleAlert className="absolute right-3 size-5 text-destructive" />
      )}
      {isLoading && (
        <Loader2 className="absolute right-3 size-5 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}

export { Input };
