import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import type { User } from "./schemas";

const userQueryOptions = (userId: string) =>
  queryOptions<User>({
    queryKey: ["user", userId],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        { signal },
      );
      return response.json();
    },
  });

export function useUser(userId: string) {
  const { data } = useSuspenseQuery(userQueryOptions(userId));

  return data;
}
