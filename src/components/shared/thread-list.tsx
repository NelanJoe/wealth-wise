import type { Thread } from "@/schemas/thread.schema";
import ThreadItem from "./thread-item";

export default function ThreadList({ threads }: { threads: Thread[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {threads.length > 0 ? (
        threads.map((thread) => <ThreadItem key={thread.id} thread={thread} />)
      ) : (
        <i>Belum ada diskusi</i>
      )}
    </div>
  );
}
