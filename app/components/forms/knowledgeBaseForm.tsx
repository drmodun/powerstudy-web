import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateKnowledgeBaseModel,
  createKnowledgeBaseSchema,
  difficulty,
  levelOfDetail,
  subject,
} from "@/types/knowledgeBase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateKnowledgeBase } from "@/services/hooks/useCreateKnowledgeBase";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const KnowledgeBaseForm = () => {
  const { mutateAsync: createKnowledgeBase, isPending } =
    useCreateKnowledgeBase();

  const form = useForm<CreateKnowledgeBaseModel>({
    resolver: zodResolver(createKnowledgeBaseSchema),
    defaultValues: {
      title: "",
      difficulty: difficulty.UNSPECIFIED,
      levelOfDetail: levelOfDetail.MEDIUM,
      subject: subject.MATH,
      language: "",
    },
  });

  const onSubmit = async (data: CreateKnowledgeBaseModel) => {
    await createKnowledgeBase(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Knowledge Base Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {Object.values(difficulty).map((level) => (
                    <FormItem
                      key={level}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={level} />
                      </FormControl>
                      <FormLabel className="font-normal capitalize">
                        {level.replace("_", " ")}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="levelOfDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level of Detail</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level of detail" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(levelOfDetail).map((level) => (
                    <SelectItem
                      key={level}
                      value={level}
                      className="capitalize"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(subject).map((subj) => (
                    <SelectItem key={subj} value={subj} className="capitalize">
                      {subj.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Knowledge Base"}
        </Button>
      </form>
    </Form>
  );
};
