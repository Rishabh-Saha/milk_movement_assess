import React from "react";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
