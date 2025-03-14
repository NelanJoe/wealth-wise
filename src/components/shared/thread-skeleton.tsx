import { Skeleton } from "../ui/skeleton";

export default function ThreadSkeleton({
  threadLength = 3,
}: {
  threadLength?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {[...Array(threadLength)].map((_, index) => (
        <div
          key={index}
          className="w-full p-4 space-x-4 rounded-lg bg-slate-100/50"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px] rounded-full" />
                <Skeleton className="h-4 w-[150px] rounded-full" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-[320px] md:w-[400px] rounded-full" />
              <Skeleton className="h-4 w-[350px] md:w-[450px] rounded-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-[100px] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
