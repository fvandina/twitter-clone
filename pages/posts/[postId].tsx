import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();
  const {postId} = router.query;
  const currentUser = useCurrentUser();

  const{data: fetchedPost, isLoading} = usePost(postId as string);

  if (isLoading || !fetchedPost){
    return (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80}/>
      </div>
    )
  }

  return (
    <>
      <Header label="Tweet" showBackArrrow/>
      <PostItem data={fetchedPost}/>
      <Form 
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
    </>
  );
}

export default PostView;