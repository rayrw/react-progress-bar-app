import type { RouteObject } from "app/router";
import { queryClient } from "app/query";

export const userRoutes: RouteObject = {
  id: "userList",
  path: "users",
  async lazy() {
    const { UserListPage } = await import("./UserListPage");
    return {
      Component: UserListPage,
    };
  },
  loader: async ({ request }) => {
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);
    queryClient.removeQueries({
      queryKey: ["users", searchParams],
      type: "inactive",
    });
    queryClient.refetchQueries({
      queryKey: ["users", searchParams],
      exact: true,
      type: "active",
    });
    return { searchParams };
  },
  shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) => {
    return (
      currentUrl.pathname === "/users/" &&
      nextUrl.pathname === "/users/" &&
      defaultShouldRevalidate
    );
  },
  children: [
    {
      id: "viewUser",
      path: ":userId",
      async lazy() {
        const { ViewUserPage } = await import("./ViewUserPage");
        return {
          Component: ViewUserPage,
        };
      },
      async loader() {
        queryClient.removeQueries({
          queryKey: ["user"],
          type: "inactive",
        });
        return null;
      },
    },
  ],
};
