import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-2xl border-0 bg-[#F2F4F6] px-4 py-3 text-base text-[#191F28] transition-all duration-200 outline-none",
        "placeholder:text-[#B0B8C1]",
        "focus:bg-white focus:ring-2 focus:ring-[#3182F6]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-[#191F28] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "aria-invalid:ring-2 aria-invalid:ring-[#F04452]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
