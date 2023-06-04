import useSWR from "swr";

import fetcher from "@/libs/fetcher";

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    currentUser: data,
    isLoading,
    isError: error,
    mutate,
  };
}
