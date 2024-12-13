import { knowledgeBaseQueryOptions } from "@/utils/knowledgeBaseUtils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  difficultyLabels,
  levelOfDetailLabels,
  subjectLabels,
} from "@/types/knowledgeBase";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/knowledge-bases/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(
      knowledgeBaseQueryOptions(parseInt(params.id))
    );
    return data;
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isError } = useSuspenseQuery(
    knowledgeBaseQueryOptions(parseInt(id))
  );
  const navigate = useNavigate();

  if (isError || !data) {
    return <div>Error fetching knowledge base</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>
            Subject: {subjectLabels[data.subject]} | Difficulty:{" "}
            {difficultyLabels[data.difficulty]} | Detail Level:{" "}
            {levelOfDetailLabels[data.levelOfDetail]}
          </CardDescription>
        </CardHeader>
        <CardContent>{/* Add content here if needed */}</CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() =>
              navigate({ to: `/knowledge-bases/${data.id}/add-note` })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Note
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: `/knowledge-bases/${data.id}/edit` })}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              // TODO: Implement delete functionality
              console.log("Delete clicked");
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
