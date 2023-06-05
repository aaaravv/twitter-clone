import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
  comment: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${comment.user.id}`);

      return;
    },
    [router, comment.user.id]
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) return;

    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      cursor-pointer 
      hover:bg-neutral-900 
      transition
  "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={comment.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
              text-white 
              font-semibold 
              cursor-pointer 
              hover:underline
        "
            >
              {comment.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
              text-neutral-500
              cursor-pointer
              hover:underline
              hidden
              md:block
        "
            >
              @{comment.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{comment.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
