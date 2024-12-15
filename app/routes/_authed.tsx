import NotFound from "@/components/boundaries/notFoundComponent";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/services/hooks/useAuth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullPage />;
  }

  if (!data) {
    return <NotFound />;
  }

  return <Outlet />;
}

//TODO: user later if needed
