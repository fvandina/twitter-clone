import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { mutate: mutateFechtUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (isFollowing) {
        await axios.delete("/api/follow", {
          data: {
            userId: userId,
            currentUserId: currentUser?.id
          },
        });
      } else {
        await axios.post("/api/follow", {
          userId: userId,
          currentUserId: currentUser?.id
        });
      }

      mutateCurrentUser();
      mutateFechtUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    loginModal,
    mutateCurrentUser,
    mutateFechtUser,
    userId,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
