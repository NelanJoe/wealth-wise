import type { Thread as ThreadType } from "@/types/thread";
import Thread from "./thread";

type ThreadListProps = {
  threads: ThreadType[];
};

export default function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {threads.length > 0 ? (
        threads.map((thread) => <Thread key={thread.id} thread={thread} />)
      ) : (
        <div>
          <p>
            <i>Belum ada diskusi</i>
          </p>
        </div>
      )}
    </div>
  );
}
