import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { useUploadNotes } from "@/services/hooks/useUploadNotes";
import { Button } from "../ui/button";
import { FileInput } from "../ui/file-input";
import { useUploadImages } from "@/services/hooks/useUploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface NoteFormProps {
  knowledgeBaseId: number;
}

export const NoteForm = ({ knowledgeBaseId }: NoteFormProps) => {
  const { mutateAsync: uploadNotes, isPending: isGettingNotes } =
    useUploadNotes(knowledgeBaseId);

  const { mutateAsync: uploadImages, isPending: isUploadingImages } =
    useUploadImages();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        files: z.array(z.instanceof(File)),
      })
    ),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = async (data: { files: File[] }) => {
    if (data.files.length <= 0) {
      return;
    }

    if (isGettingNotes || isUploadingImages) {
      return;
    }

    const images = await uploadImages(data.files);

    await uploadNotes({
      data: images,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => <FileInput preview {...field} />}
        />
        <Button disabled={isGettingNotes || isUploadingImages} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
