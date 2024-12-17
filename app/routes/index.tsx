// app/routes/index.tsx
import { KnowledgeBaseForm } from "@/components/forms/knowledgeBaseForm";
import { MathProblemForm } from "@/components/forms/mathProblemForm";
import { QuestionAnswerForm } from "@/components/forms/questionAnswerForm";
import InfoCard from "@/components/infoCard";
import { useAuth } from "@/services/hooks/useAuth";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

export default function Home() {
  const { data } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Welcome to PowerStudy
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Your personal study companion that helps you track and improve your
            learning journey.
          </p>

          {data ? (
            <span>Welcome, {data.name}!</span>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <InfoCard
              title="Create Knowledge Base"
              description="Organize your study materials and notes in one place"
              buttonText="Create Knowledge Base"
              dialogTitle="Create Knowledge Base"
            >
              <KnowledgeBaseForm />
            </InfoCard>

            <InfoCard
              title="Solve complex math problems"
              description="Get automated solutions to complex math problems with step by step explanation"
              buttonText="Solve a Problem"
              dialogTitle="Upload Math Problem"
            >
              <MathProblemForm />
            </InfoCard>

            <InfoCard
              title="Get an answer to any question"
              description="Ask any question and get a detailed answer powered by AI"
              buttonText="Ask a Question"
              dialogTitle="Ask a Question"
            >
              <QuestionAnswerForm />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>

    //TODO: maybe use shadcn to make this prettier
  );
}
