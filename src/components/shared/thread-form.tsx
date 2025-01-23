import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { useCategories, useCreateThread } from "@/hooks";

import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const DEFAULT_LENGTH_TITLE: { MIN: number; MAX: number } = {
  MIN: 3,
  MAX: 50,
};

const DEFAULT_LENGTH_BODY: { MIN: number; MAX: number } = {
  MIN: 3,
  MAX: 1000,
};

const formSchema = z.object({
  title: z
    .string()
    .min(DEFAULT_LENGTH_TITLE.MIN, {
      message: `Judul minimal ${DEFAULT_LENGTH_TITLE.MIN} karakter`,
    })
    .max(DEFAULT_LENGTH_TITLE.MAX, {
      message: `Maksimal ${DEFAULT_LENGTH_TITLE.MAX} karakter`,
    }),
  category: z.string().min(1, { message: "Kategori tidak boleh kosong" }),
  body: z
    .string()
    .min(DEFAULT_LENGTH_BODY.MIN, {
      message: `Isi minimal ${DEFAULT_LENGTH_BODY.MIN} karakter`,
    })
    .max(DEFAULT_LENGTH_BODY.MAX, {
      message: `Maksimal ${DEFAULT_LENGTH_BODY.MAX} karakter`,
    }),
});

export default function ThreadForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      body: "",
    },
  });

  const { data: categories } = useCategories();
  const { createThread, isPending } = useCreateThread();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    createThread(values, { onSettled: () => form.reset() });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="title">Judul</FormLabel>
                  <span className="text-xs">
                    {form.watch("title").length}/{DEFAULT_LENGTH_TITLE.MAX}
                  </span>
                </div>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Judul"
                    {...field}
                    type="text"
                    minLength={DEFAULT_LENGTH_TITLE.MIN}
                    maxLength={DEFAULT_LENGTH_TITLE.MAX}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="category">Kategori</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="body">Konten</FormLabel>
                  <span className="text-xs">
                    {form.watch("body").length} / {DEFAULT_LENGTH_BODY.MAX}
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    id="body"
                    className="resize-none"
                    placeholder="Konten"
                    rows={4}
                    minLength={DEFAULT_LENGTH_BODY.MIN}
                    maxLength={DEFAULT_LENGTH_BODY.MAX}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Buat diskusi"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
