import NotFound from "@/components/boundaries/notFoundComponent";
import MarkdownEditor from "@/components/markdownEditor/markdownEditor";
import { Label } from "@/components/ui/label";
import { mathProblemQueryOptions } from "@/utils/mathProblemUtils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";

export const Route = createFileRoute("/math-problems/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(
      mathProblemQueryOptions(parseInt(params.id))
    );
    return data;
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const initial = Route.useLoaderData();
  const { data, isError } = useSuspenseQuery({
    ...mathProblemQueryOptions(parseInt(id)),
    initialData: initial,
  });

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{data.mathQuestion}</h1>
      <Label className="mb-4">{data?.updatedAt?.toLocaleString()}</Label>
      <Markdown>{data.solution}</Markdown>
    </div>
  );
}

export default Route;
