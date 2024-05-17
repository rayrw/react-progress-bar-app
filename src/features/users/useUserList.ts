import { queryClient } from "app/query";
import { useLoaderData } from "app/router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import type { User } from "./schemas";

const userListQueryOptions = (queryParams: Partial<User> = {}) =>
  queryOptions<User[]>({
    queryKey: ["users", queryParams],
    queryFn: async ({ signal }) => {
      const qs = new URLSearchParams(queryParams).toString();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${qs ? `?${qs}` : ""}`,
        { signal },
      );
      return response.json();
    },
  });

export function useUserList() {
  const { searchParams } = useLoaderData() as any;
  const { data } = useSuspenseQuery(userListQueryOptions(searchParams));

  return data;
}

export async function prefetchUserList() {
  return queryClient.prefetchQuery(userListQueryOptions({}));
}
