import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import LoginModal from "@/components/modals/LoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mustateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (hasLiked) {
        await axios.delete("/api/like", { data: { postId: postId } });
      } else {
        await axios.post("/api/like", { postId });
      }
      mutateFetchedPost();
      mustateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      toast.error("Something when wrong");
    }
  }, [
    currentUser,
    hasLiked,
    loginModal,
    mustateFetchedPosts,
    mutateFetchedPost,
    postId,
  ]);

  return {
    hasLiked,
    toggleLike
  };
};

export default useLike;
