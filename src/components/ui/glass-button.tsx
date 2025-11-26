import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const glassButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all duration-300",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-sm outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "overflow-hidden"
  ),
  {
    variants: {
      variant: {
        default: [
          "bg-white/10 hover:bg-white/20",
          "backdrop-blur-md",
          "border border-white/20",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
          "text-foreground",
          "dark:bg-black/10 dark:hover:bg-black/20 dark:border-white/10",
          // Shine effect
          "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:content-['']",
          "hover:before:animate-[shimmer_1.5s_ease-in-out_1_forwards]",
          "hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
        ].join(" "),
        outline: [
          "bg-transparent hover:bg-white/10",
          "backdrop-blur-sm",
          "border border-white/20",
          "text-foreground",
          "dark:hover:bg-white/5 dark:border-white/10",
        ].join(" "),
        ghost: [
          "bg-transparent hover:bg-white/10",
          "text-foreground",
          "dark:hover:bg-white/5",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        className={cn(glassButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GlassButton.displayName = "GlassButton";

export default GlassButton;
export type { GlassButtonProps };
