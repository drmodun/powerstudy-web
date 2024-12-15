import { knowledgeBaseQueryOptions } from "@/utils/knowledgeBaseUtils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import KnowledgeBaseCard from "@/components/knowledgeBaseCard";

export const Route = createFileRoute("/knowledge-bases/$id")({
  component: RouteComponent,
  staleTime: 1000 * 60 * 5,
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(
      knowledgeBaseQueryOptions(parseInt(params.id))
    );
    return data;
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const initial = Route.useLoaderData();
  const { data, isError } = useSuspenseQuery({
    ...knowledgeBaseQueryOptions(parseInt(id)),
    initialData: initial,
  });

  if (isError || !data) {
    return <div>Error fetching knowledge base</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <KnowledgeBaseCard data={data} />
    </div>
  );
}
