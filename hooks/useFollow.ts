import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete(`/api/follow`, {
            params: {
              userId,
            },
          });
      } else {
        request = () =>
          axios.post(`/api/follow`, {
            userId,
          });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }, [
    currentUser,
    fetchedUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
