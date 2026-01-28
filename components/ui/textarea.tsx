import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none flex field-sizing-content min-h-24 w-full rounded-2xl border-0 bg-[#F2F4F6] px-4 py-3 text-base text-[#191F28] transition-all duration-200 outline-none",
        "placeholder:text-[#B0B8C1]",
        "focus:bg-white focus:ring-2 focus:ring-[#3182F6]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-2 aria-invalid:ring-[#F04452]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
