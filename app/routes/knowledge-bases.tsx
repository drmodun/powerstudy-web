import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/knowledge-bases")({
  component: KnowledgeBases,
});

export default function KnowledgeBases() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Knowledge Bases</h1>
        <Button asChild>
          <Link to="/knowledge-bases/create">Create New</Link>
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg">
        <div className="text-2xl font-semibold text-gray-500">
          🚧 Under Construction 🚧
        </div>
        <p className="text-gray-400 text-center">
          This feature is currently in development. Check back soon!
        </p>
      </div>
    </div>
  );
}
