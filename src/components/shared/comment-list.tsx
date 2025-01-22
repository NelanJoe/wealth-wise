import type { Comment } from "@/schemas/comment.schema";
import CommentItem from "./comment-item";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="flex flex-col gap-3">
      {comments?.length > 0 ? (
        comments.map((comment) => <CommentItem comment={comment} />)
      ) : (
        <div>Belum ada komentar</div>
      )}
    </div>
  );
}
