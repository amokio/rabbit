"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { request } from "../actions";

type Props = {
  setResponse: (res: { fileType: string; content: string }) => void;
};

enum Method {
  Get = "Get",
  Post = "Post",
  Delete = "Delete",
  Patch = "Patch",
  Options = "Options",
  Head = "Head",
  Put = "Put",
}

const formSchema = z.object({
  method: z.nativeEnum(Method),
  url: z.string(),
});

const Component: React.FC<Props> = ({ setResponse }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      method: Method.Get,
    },
  });

  const onSubmit = async ({
    url,
    method,
    ...rest
  }: z.infer<typeof formSchema>) => {
    const { text, headers } = await request(url, {
      method,
    });

    const fileType = (() => {
      const contentType = headers["content-type"] ?? "";

      const strategy = {
        "application/json": "json",
        "text/xml": "xml",
        "text/html": "html",
      };

      return strategy[contentType as keyof typeof strategy] ?? "json";
    })();

    setResponse({
      content: text,
      fileType,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-2 flex flex-1 pr-2"
      >
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[fit-content]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Method.Get}>GET</SelectItem>
                <SelectItem value={Method.Post}>POST</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => <Input {...field} />}
        />

        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default Component;
