import useSWR from "swr";

import fetcher from "@/libs/fetcher";

export default function usePosts(userId?: string) {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}
