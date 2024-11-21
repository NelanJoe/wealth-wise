import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { formatTimeAgo } from "@/lib/format-time-ago";

import type { Thread as ThreadType } from "@/types/thread";

type TheadProps = {
  thread: ThreadType;
};

export default function Thread({ thread }: TheadProps) {
  return (
    <div className="w-full p-4 space-y-5 bg-white rounded-md shadow">
      <div className="flex flex-row gap-3 ">
        <Avatar>
          <AvatarFallback>{thread.author.displayName}</AvatarFallback>
          <AvatarImage
            src={`${thread.author.photoURL}`}
            alt={`${thread.author.displayName}`}
          />
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-blue-500">{thread.author.displayName}</p>
          <p className="text-xs">{formatTimeAgo(thread.createdAt)}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold capitalize transition-all duration-150 ease-in cursor-pointer hover:text-blue-500">
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </h3>
          <p>{thread.body}</p>
        </div>
        <div>
          <Badge className="bg-blue-500 hover:bg-blue-500">
            {thread.category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
