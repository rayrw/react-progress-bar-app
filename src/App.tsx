import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { queryClient } from "app/query";
import { store } from "app/store";
import { RouterProvider, createBrowserRouter } from "app/router";

import { Layout } from "common/Layout";
import { HomePage } from "features/home/HomePage";
import { userRoutes } from "features/users/userRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      userRoutes,
    ],
  },
]);

const routerFuture = {
  v7_startTransition: true,
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense>
          <RouterProvider future={routerFuture} router={router} />
        </Suspense>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
