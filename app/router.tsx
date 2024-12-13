// app/router.tsx
import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { routerWithQueryClient, } from "@tanstack/react-router-with-query";
import NotFound from "./components/boundaries/notFoundComponent";
import { QueryClient } from "@tanstack/react-query";

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultErrorComponent: (error) => (
        <ErrorComponent error={error}></ErrorComponent>
      ),
      defaultNotFoundComponent: () => <NotFound />,
    }),
    queryClient
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
