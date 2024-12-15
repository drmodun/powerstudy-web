import {
  difficultyLabels,
  KnowledgeBaseWithUser,
  levelOfDetailLabels,
  subjectLabels,
  subjectColorRecord,
  difficultyColorRecord,
  levelOfDetailColorRecord,
} from "@/types/knowledgeBase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useCheckEditPermissions } from "@/hooks/useCheckEditPermissions";
import { Chip } from "../chip";

export interface KnowledgeBaseCardProps {
  data: KnowledgeBaseWithUser;
}

export const KnowledgeBaseCard = ({ data }: KnowledgeBaseCardProps) => {
  const navigate = useNavigate();
  const { canEdit, isLoading } = useCheckEditPermissions(data.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2">
          <Chip
            label={subjectLabels[data.subject]}
            variant={subjectColorRecord[data.subject]}
          />
          <Chip
            label={difficultyLabels[data.difficulty]}
            variant={difficultyColorRecord[data.difficulty]}
          />
          <Chip
            label={levelOfDetailLabels[data.levelOfDetail]}
            variant={levelOfDetailColorRecord[data.levelOfDetail]}
          />
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
  );
};
