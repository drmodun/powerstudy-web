// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  routers: {
    ssr: {
      entry: "./app/ssr.tsx",
      vite: {
        ssr: {
          noExternal: ["react-dropzone"],
        },
      },
    },
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
