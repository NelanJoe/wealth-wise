import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { useSharedThreadComments, useCurrentUser } from "@/hooks";

import { formatTimeAgo } from "@/lib/format-time-ago";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CommentList from "@/components/shared/comment-list";
import CommentForm from "@/components/shared/comment-form";
import CommentSkeleton from "@/components/shared/comment-skeleton";

export default function ThreadShow() {
  const navigate = useNavigate();
  const { threadId } = useParams<"threadId">();

  const { data: currentUser } = useCurrentUser();

  const { thread, comments, pending, isError } = useSharedThreadComments(
    String(threadId)
  );

  return (
    <section className="pt-10 pb-24">
      <div className="max-w-4xl px-4 mx-auto mb-6">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-full"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="ml-2">Kembali</span>
        </Button>
      </div>
      <div className="max-w-4xl px-4 mx-auto space-y-4 min-h-max">
        <div>
          {pending ? (
            <div>Loading...</div>
          ) : isError ? (
            <span>Not Found Thread</span>
          ) : (
            <div className="p-4 mb-10 space-y-4 border rounded-md">
              <div className="flex flex-row gap-3">
                <Avatar>
                  <AvatarFallback>
                    {thread?.author.displayName.slice(0, 2)}
                  </AvatarFallback>
                  <AvatarImage
                    src={`${thread?.author.photoURL}`}
                    alt={`${thread?.author.displayName}`}
                  />
                </Avatar>
                <div className="flex flex-col gap-1 text-sm">
                  <p className="text-primary-blue">
                    {thread?.author.displayName}
                  </p>
                  <p className="text-xs">
                    {formatTimeAgo(String(thread?.createdAt))}
                  </p>
                </div>
              </div>
              <h2 className="text-3xl font-semibold capitalize">
                {thread?.title}
              </h2>
              <p>{thread?.body}</p>
              <div>
                <Badge className="bg-blue-500 hover:bg-blue-500">
                  {thread?.category}
                </Badge>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">
            <div className="flex flex-row items-center gap-1">
              {pending ? (
                <Loader2Icon className="w-3 h-3 animate-spin" />
              ) : isError ? (
                <span>Null</span>
              ) : (
                <span>{comments?.length}</span>
              )}
              <span>Komentar</span>
            </div>
          </h3>
        </div>
        <div className="border p-4 space-y-5 rounded-md">
          {currentUser ? (
            <div className="flex flex-row gap-3">
              <div>
                <Avatar>
                  <AvatarFallback>
                    {currentUser.displayName.slice(0, 2)}
                  </AvatarFallback>
                  <AvatarImage
                    src={`${currentUser.photoURL}`}
                    alt={`${currentUser.displayName}`}
                  />
                </Avatar>
              </div>
              <div className="w-full">
                <CommentForm />
              </div>
            </div>
          ) : (
            <div className="border p-4 rounded-lg">
              <div className="flex flex-col items-center justify-center">
                <h2>Silahkan masuk untuk mengirim komentar.</h2>
                <Link to="/login" className="underline text-primary">
                  <i>Masuk</i>
                </Link>
              </div>
            </div>
          )}
          {pending ? (
            <CommentSkeleton commentLength={1} />
          ) : isError ? (
            <i>Not Found Comments</i>
          ) : (
            comments && <CommentList comments={comments} />
          )}
        </div>
      </div>
    </section>
  );
}
