import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateQuestionAnswer } from "@/services/hooks/useCreateQuestionAnswer";
import { Input } from "../ui/input";

export interface QuestionAnswerFormProps {
  onSuccess?: (id: number) => void;
}

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
});

export const QuestionAnswerForm = ({ onSuccess }: QuestionAnswerFormProps) => {
  const { mutateAsync: createQuestionAnswer, isPending: isCreatingQuestion } =
    useCreateQuestionAnswer();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isCreatingQuestion) {
      return;
    }

    const response = await createQuestionAnswer({
      question: data.question,
    });

    onSuccess && onSuccess(response.data.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter your question..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreatingQuestion}>
          {isCreatingQuestion ? "Asking..." : "Ask Question"}
        </Button>
      </form>
    </Form>
  );
};
