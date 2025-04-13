import { Skeleton } from "../ui/skeleton";

export default function CategorySkeleton({
  categoryLength = 3,
}: {
  categoryLength?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(categoryLength)].map((_, index) => (
        <Skeleton key={index} className="w-16 h-7 rounded-full" />
      ))}
    </div>
  );
}
