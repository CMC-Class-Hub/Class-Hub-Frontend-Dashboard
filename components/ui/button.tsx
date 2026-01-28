import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6]/50 focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-sm",
        destructive:
          "bg-[#F04452] text-white hover:bg-[#D93843] shadow-sm",
        outline:
          "border border-[#E5E8EB] bg-white text-[#333D4B] hover:bg-[#F2F4F6] hover:border-[#D1D6DB]",
        secondary:
          "bg-[#F2F4F6] text-[#333D4B] hover:bg-[#E5E8EB]",
        ghost:
          "text-[#4E5968] hover:bg-[#F2F4F6] hover:text-[#333D4B]",
        link: "text-[#3182F6] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl gap-1.5 px-4 text-sm",
        lg: "h-13 rounded-2xl px-7 text-base",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
