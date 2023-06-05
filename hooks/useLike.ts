import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { currentUser } = useCurrentUser();
  const { post: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(postId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    return fetchedPost?.likedIds?.includes(currentUser.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;

      if (hasLiked) {
        request = () =>
          axios.delete(`/api/like`, {
            params: {
              postId,
            },
          });
      } else {
        request = () =>
          axios.post(`/api/like`, {
            postId,
          });

        await request();
        mutateFetchedPost();
        mutateFetchedPosts();

        toast.success("Success");
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  }, [
    currentUser,
    hasLiked,
    loginModal,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
