// app/router.tsx
import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { QueryClient } from "@tanstack/react-query";
import { Label } from "./components/ui/label";

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultErrorComponent: (error) => (
        <ErrorComponent {...error}>
          <Label>Something went wrong {error.error.message}</Label>
        </ErrorComponent>
      ), // TODO: add error page
      defaultNotFoundComponent: () => <Label>Page not found</Label>,
    }),
    queryClient
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
