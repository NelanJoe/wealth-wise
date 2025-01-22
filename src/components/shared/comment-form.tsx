import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { useCreateComment } from "@/hooks/comment";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const MAX_LENGTH: number = 300;

const formSchema = z.object({
  text: z.string().max(MAX_LENGTH, {
    message: `Maksimal ${MAX_LENGTH} karakter`,
  }),
});

export default function CommentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const { threadId } = useParams<"threadId">();
  const { createComment, isPending } = useCreateComment();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = ({ text }) => {
    createComment(
      { threadId: String(threadId), text },
      { onSettled: () => form.reset({ text: "" }) }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel htmlFor="komentar">Tambahkan Komentar</FormLabel>
                <span className="text-sm">
                  {form.watch("text").length} / {MAX_LENGTH}
                </span>
              </div>
              <FormControl>
                <Textarea
                  id="komentar"
                  placeholder="Tulis komentar..."
                  className="resize-none h-fit"
                  maxLength={MAX_LENGTH}
                  rows={4}
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              Loading
            </span>
          ) : (
            <span>Buat Komentar</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
