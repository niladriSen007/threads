import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useThreadContext } from "../../store/ThreadContext";
import Loading from "../shared/Loading";

const Comments = ({ postId,commentCount,setCommentCount }) => {
  const [comments, setComments] = useState([]);

  const { currentUser,updating,setUpdating } = useThreadContext();

  const getPostComments = async () => {
    try {
      const res = await axios.get(`/api/posts/getPost/${postId}`);
      console.log(res.data);
      setUpdating(false)
      setCommentCount(res.data?.replies?.length);
      setComments(res.data?.replies);
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery("comments", getPostComments);

  const [formData, setFormData] = useState({
    comment: "",
  });

  const handleSubmit = async (e) => {
    setUpdating(true)
    e.preventDefault();
    try {
      const res = await axios.post(`/api/posts/reply/${postId}`, {
        replyText: formData?.comment,
      });
      console.log(res.data);
      setFormData({
        comment: "",
      });
      // setComments(res?.data)
      getPostComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {updating ? <p>Uploading your comment...</p> :
      <div className="flex items-center gap-4 w-full my-4">
        <img
          src={currentUser?.profileimg}
          alt=""
          className="w-6 h-6 rounded-full "
        />
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full"
        >
          <input
            type="text"
            placeholder="Add a comment"
            className="flex-1 bg-transparent text-white focus:outline-none border-gray-600 border-b"
            value={formData?.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          />
          <button
            type="submit"
            className="text-xs bg-blue-700 px-2 py-1 rounded-md"
          >
            Comment
          </button>
        </form>
      </div> }
      <div className="mt-6">
              <span>Comments</span>
      </div>
     <div className="py-4">
     {comments?.length > 0 ? (
        comments.map((comment, id) => {
          return (
            <div className="mb-6" key={id}>
              <div className="flex items-center gap-4">
                <img
                  src={comment?.userImg}
                  alt=""
                  className="w-8 h-8 rounded-full "
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-thin text-gray-400">
                    {comment?.userName}
                  </span>
                  <p className="text-sm font-thin">{comment?.replyText}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No comments</p>
      )}
     </div>
    </div>
  );
};
export default Comments;
