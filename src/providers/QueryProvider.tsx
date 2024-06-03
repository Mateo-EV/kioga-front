"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider(props: {
  children: React.ReactNode;
  type: "admin" | "customer";
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: props.type === "customer" ? 5 * 60 * 1000 : Infinity,
            gcTime: props.type === "customer" ? 5 * 60 * 1000 : Infinity,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
