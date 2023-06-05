import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId = "" }) => {
  const { posts = [] } = usePosts(userId as string);

  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem key={post.id} post={post} userId={userId} />
      ))}
    </>
  );
};

export default PostFeed;
