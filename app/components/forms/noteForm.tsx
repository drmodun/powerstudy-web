import { Form, useForm } from "react-hook-form";
import { FormField } from "../ui/form";
import { useUploadNotes } from "@/services/hooks/useUploadNotes";
import { Button } from "../ui/button";
import { FileInput } from "../ui/file-input";

export interface NoteFormProps {
  knowledgeBaseId: number;
}

export const NoteForm = ({ knowledgeBaseId }: NoteFormProps) => {
  const { mutateAsync: uploadNotes, isPaused } =
    useUploadNotes(knowledgeBaseId);

  const form = useForm({
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = async (data: { files: File[] }) => {
    await uploadNotes({
      data: data.files,
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
        <Button disabled={isPaused} type="button">
          Submit
        </Button>
      </form>
    </Form>
  );
};
