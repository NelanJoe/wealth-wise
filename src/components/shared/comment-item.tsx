import type { Comment } from "@/schemas/comment.schema";
import { formatTimeAgo } from "@/libs/format-time-ago";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="p-4 space-y-4 border rounded-lg">
      <div className="flex flex-row gap-3">
        <Avatar>
          <AvatarImage
            src={`${comment.author.photoURL}`}
            alt={`${comment.author.displayName}`}
          />
          <AvatarFallback>
            {comment.author.displayName?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-primary-blue">{comment.author.displayName}</p>
          <p className="text-xs">{formatTimeAgo(String(comment.createdAt))}</p>
        </div>
      </div>
      <p>{comment.text}</p>
    </div>
  );
}
