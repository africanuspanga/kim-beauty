import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating = 5,
  className,
  size = "h-4 w-4",
}: {
  rating?: number;
  className?: string;
  size?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            size,
            i < rating ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-line text-line"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
