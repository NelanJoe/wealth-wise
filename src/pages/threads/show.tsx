import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, DeleteIcon, Loader2Icon } from "lucide-react";
import {
  useSharedThreadComments,
  useCurrentUser,
  useDeleteThread,
} from "@/hooks";

import { formatTimeAgo } from "@/lib/format-time-ago";

import type { User } from "@/schemas/user.schema";
import type { Thread } from "@/schemas/thread.schema";
import type { Comment } from "@/schemas/comment.schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import CommentList from "@/components/shared/comment-list";
import CommentForm from "@/components/shared/comment-form";
import CommentSkeleton from "@/components/shared/comment-skeleton";

export default function ThreadShow() {
  const { threadId } = useParams<{ threadId: string }>();

  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();

  const { thread, comments, pending, isError } = useSharedThreadComments(
    threadId ?? ""
  );
  const { deleteThread, isPending } = useDeleteThread();

  const isAuthor = currentUser?.uid === thread?.author.uid;

  if (pending) {
    return (
      <div className="flex flex-row items-center justify-center gap-3 h-96">
        <h2>Memuat diskusi...</h2>
        <Loader2Icon className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (isError || !thread) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-50px)] gap-4">
        <h2 className="text-xl font-semibold text-red-500">
          Thread Tidak Ditemukan
        </h2>
        <p>Thread ID tidak valid atau telah dihapus.</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <section className="pt-10 pb-24">
      <div className="max-w-4xl px-4 mx-auto mb-6">
        <ThreadHeader
          isAuthor={isAuthor}
          isPending={isPending}
          onDelete={() => deleteThread(threadId ?? "")}
        />
      </div>
      <div className="max-w-4xl px-4 mx-auto space-y-4 min-h-max">
        <ThreadContent thread={thread} />
        {comments && (
          <CommentSection
            comments={comments}
            isLoading={pending}
            isError={isError}
            currentUser={currentUser}
          />
        )}
      </div>
    </section>
  );
}

const ThreadHeader = ({
  isAuthor,
  isPending,
  onDelete,
}: {
  isAuthor: boolean;
  isPending: boolean;
  onDelete: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        className="rounded-full"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="ml-2">Kembali</span>
      </Button>
      {isAuthor && (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive" className="rounded-full">
              <span>Hapus diskusi</span>
              <DeleteIcon className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-left text-sm sm:text-md">
                Apakah Kamu Yakin Menghapus Diskusi Ini?
              </DialogTitle>
              <DialogDescription className="text-left text-xs sm:text-md">
                Setelah diskusi dihapus, tidak dapat dikembalikan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start gap-2 sm:gap-0 flex-row">
              <DialogClose asChild>
                <Button size="sm" className="rounded-full" disabled={isPending}>
                  <span>Tidak</span>
                </Button>
              </DialogClose>
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                disabled={isPending}
                onClick={onDelete}
              >
                {isPending ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Hapus</span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ThreadContent = ({ thread }: { thread: Thread }) => (
  <div className="p-4 mb-10 space-y-4 border rounded-md">
    <div className="flex flex-row gap-3">
      <Avatar>
        <AvatarFallback>
          {thread.author.displayName?.slice(0, 2)}
        </AvatarFallback>
        <AvatarImage
          src={thread.author.photoURL}
          alt={thread.author.displayName}
        />
      </Avatar>
      <div className="flex flex-col gap-1 text-sm">
        <p className="text-primary-blue">{thread.author.displayName}</p>
        <p className="text-xs">{formatTimeAgo(thread.createdAt)}</p>
      </div>
    </div>
    <h2 className="text-3xl font-semibold capitalize">{thread.title}</h2>
    <p>{thread.body}</p>
    <Badge className="bg-blue-500 hover:bg-blue-500">
      {thread.category.name}
    </Badge>
  </div>
);

const CommentSection = ({
  comments,
  isLoading,
  isError,
  currentUser,
}: {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  currentUser?: User;
}) => (
  <div className="p-4 space-y-5 border rounded-md">
    {currentUser ? (
      <div className="flex flex-row gap-3">
        <Avatar>
          <AvatarFallback>
            {currentUser.displayName?.slice(0, 2)}
          </AvatarFallback>
          <AvatarImage
            src={currentUser.photoURL}
            alt={currentUser.displayName}
          />
        </Avatar>
        <div className="w-full">
          <CommentForm />
        </div>
      </div>
    ) : (
      <div className="p-4 text-center border rounded-lg">
        <h2>Silahkan masuk untuk mengirim komentar.</h2>
        <Link to="/login" className="underline text-primary">
          <i>Masuk</i>
        </Link>
      </div>
    )}
    {isLoading ? (
      <CommentSkeleton commentLength={1} />
    ) : isError || !comments.length ? (
      <p className="italic text-center text-gray-500">Belum ada komentar.</p>
    ) : (
      <CommentList comments={comments} />
    )}
  </div>
);
