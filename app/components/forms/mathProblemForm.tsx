import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { Button } from "../ui/button";
import { FileInput } from "../ui/file-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSolveMathProblem } from "@/services/hooks/useSolveMathProblem";
import { toBase64 } from "@/utils/toBase64";

export interface MathProblemFormProps {
  onSuccess?: (id: number) => void;
}

export const MathProblemForm = ({ onSuccess }: MathProblemFormProps) => {
  const { mutateAsync: solveMathProblem, isPending: isSolvingMathProblem } =
    useSolveMathProblem();

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
    if (isSolvingMathProblem) {
      return;
    }

    const [image] = data.files;

    if (!image) {
      return;
    }

    await solveMathProblem(image);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FileInput
              accept={{
                "image/*": [".png", ".jpg", ".jpeg"],
              }}
              maxFiles={1}
              preview
              {...field}
            />
          )}
        />
        <Button disabled={isSolvingMathProblem} type="submit">
          Submit math problem
        </Button>
      </form>
    </Form>
  );
};
