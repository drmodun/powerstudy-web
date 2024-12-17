import NotFound from "@/components/boundaries/notFoundComponent";
import { questionAnswerQueryOptions } from "@/utils/questionAnswerUtils";
import { Label } from "@radix-ui/react-label";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";

export const Route = createFileRoute("/question-answers/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.ensureQueryData(
      questionAnswerQueryOptions(parseInt(params.id))
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const initial = Route.useLoaderData();
  const { data, isError } = useSuspenseQuery({
    ...questionAnswerQueryOptions(parseInt(id)),
    initialData: initial,
  });

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{data.question}</h1>
      <Label className="mb-4">{data?.updatedAt?.toLocaleString()}</Label>
      <Markdown>{data.answer}</Markdown>
    </div>
  );
}
