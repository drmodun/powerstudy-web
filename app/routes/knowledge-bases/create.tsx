import { KnowledgeBaseForm } from "@/components/forms/knowledgeBaseForm";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/knowledge-bases/create")({
  component: CreateKnowledgeBase,
});

export default function CreateKnowledgeBase() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Knowledge Base
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Want to explore existing knowledge bases?
            <Button variant={"link"}>
              <Link to="/knowledge-bases">View Knowledge Bases</Link>
            </Button>
          </p>
        </div>
        <KnowledgeBaseForm />
      </div>
    </div>
  );
}
