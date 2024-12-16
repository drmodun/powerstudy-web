import { Note } from "@/types/note";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Markdown from "react-markdown";
import { useCheckEditPermissions } from "@/hooks/useCheckEditPermissions";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

export interface NoteCardProps {
  data: Note;
  userId?: number;
}

export const NoteCard = ({ data, userId }: NoteCardProps) => {
  const { canEdit, isLoading } = useCheckEditPermissions(userId || -1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown>{data.content}</Markdown>
      </CardContent>
      <CardFooter className="flex min-h-[5vw] justify-end gap-4">
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          <>
            {canEdit && (
              <Link
                to={`/knowledge-bases/${data.knowledgeBaseId}/notes/${data.id}`}
              >
                <Button variant="secondary">Edit</Button>
              </Link>
            )}
            <Button variant="destructive">Delete</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
