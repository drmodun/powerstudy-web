import { knowledgeBaseQueryOptions } from "@/utils/knowledgeBaseUtils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import KnowledgeBaseCard from "@/components/knowledgeBaseCard";
import NotFound from "@/components/boundaries/notFoundComponent";
import { useNotes } from "@/services/hooks/useNotes";
import { Spinner } from "@/components/spinner";
import NoteCard from "@/components/noteCard";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

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

  const {
    data: notes,
    isPending,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useNotes({
    knowledgeBaseId: parseInt(id),
    limit: 8,
  });

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto py-8">
      <KnowledgeBaseCard data={data} />
      {isPending ? (
        <Spinner size="md" />
      ) : (
        notes?.pages.map((page) => (
          <>
            {page.map((note) => (
              <NoteCard data={note} userId={data.userId} />
            ))}
          </>
        ))
      )}

      {isFetchingNextPage ? (
        <Spinner size="md" />
      ) : hasNextPage ? (
        <Button onClick={() => fetchNextPage()}>Load More</Button>
      ) : (
        <Label>End of notes</Label>
      )}
    </div>
  );
}
