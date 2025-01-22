import { Skeleton } from "../ui/skeleton";

export default function CommentSkeleton({
  commentLength = 2,
}: {
  commentLength?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[...Array(commentLength)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100 animate-pulse"
        >
          <div className="flex gap-2 items-center">
            <Skeleton className="w-[48px] h-[48px] rounded-full bg-slate-300" />
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-28 bg-slate-300" />
                <Skeleton className="h-2 w-32 bg-slate-300" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-2 w-1/2 bg-slate-300" />
            <Skeleton className="h-2 w-98 bg-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
