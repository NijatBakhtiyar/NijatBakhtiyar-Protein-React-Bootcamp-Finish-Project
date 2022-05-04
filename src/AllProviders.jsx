import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function AllProviders({ children }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
