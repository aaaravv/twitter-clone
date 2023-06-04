import useSWR from "swr";

import fetcher from "@/libs/fetcher";

export default function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
}
