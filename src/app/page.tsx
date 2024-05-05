"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Download, Loader2 } from "lucide-react";
import SheetDemo from "@/components/custom/sheet";
import Header from "@/components/custom/header";
import Banner from "@/components/custom/banner";
import useDownload from "@/hooks/useDownload";
import useFetch from "@/hooks/useFetch";

/*
https://www.instagram.com/p/C54RQluSuX1
*/

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Please enter a valid URL for the video.",
  }),
});

type Props = {};

function Page({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const { formats, isPending, fetchUrl } = useFetch();
  const onSubmit = async (values: any) => {
    await fetchUrl(values);
  };

  const { progress, downloadStatus, sheetOpen, startDownload } = useDownload({
    formats,
  });
  const handleDownload = async () => {
    startDownload();
  };

  const getEmbedSrc = () => {
    let postUrl = formats.postUrl;

    if (postUrl.endsWith("/")) {
      postUrl = postUrl.slice(0, -1);
    }

    const embedSrc = postUrl + "/embed";
    return embedSrc;
  };

  console.log(form.formState.errors["postUrl"], "form");
  return (
    <div className="container">
      {formats && (
        <SheetDemo
          sheetOpen={sheetOpen}
          progress={progress}
          downloadStatus={downloadStatus}
          file={formats?.filename}
        />
      )}
      <div>
        <Header />
        <div className="md:px-40">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-center p-[12px] rounded-[21px] shadow-custom dark:shadow-custom-white dark:border-[#330e14] dark:border-2"
            >
              <FormField
                control={form.control}
                name="postUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        type="search"
                        id="default-search"
                        className="h-12 border-none text-md md:text-xl bg-transparent"
                        placeholder="example : https://www.instagram.com/p/C54RQluSuX1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex items-center justify-between md:space-x-2 bg-insta rounded-[9px] py-6 md:px-10 dark:text-white dark:hover:bg-insta hover:bg-insta hover:brightness-90"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="hidden md:block">Search</span>
                <Download className="block md:hidden"></Download>
              </Button>
            </form>
          </Form>
          <p className="mt-4 px-2 text-red-500">
            {form.formState?.errors?.["postUrl"]?.message}
          </p>
        </div>
        <Banner />
      </div>

      {formats && (
        <>
          <div className="flex-col md:flex-row flex rounded-lg overflow-hidden my-20">
            <div className="flex-1">
              <iframe
                className="d-flex h-[680px] w-full md:h-[840px] md:w-[500px] rounded-lg border-2"
                src={getEmbedSrc()}
              ></iframe>
            </div>
            <div className="flex-1">
              <div>
                <span>FileName</span>
                <span>{formats.filename}</span>
              </div>
              <div>
                <span>height</span>
                <span>{formats.height}</span>
              </div>
              <div>
                <span>width</span>
                <span>{formats.width}</span>
              </div>
              <Button onClick={handleDownload}>download</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
