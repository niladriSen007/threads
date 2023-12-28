import axios from "axios";

import { BiRepost } from "react-icons/bi";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { useThreadContext } from "../../store/ThreadContext";

import {  useNavigate } from "react-router-dom";

const Actions = ({ postId,postedBy,postLikes }) => {
  const { liked, setLiked} = useThreadContext();

  const navigate = useNavigate();

  const likeUnlikePost = async () => {
    // setUpdating(true)
    try {
      const res = await axios.put(`/api/posts/likeOrUnlikePost/${postId}`);
      if (Array.isArray(liked)) {
        if (liked?.includes(postId)) {
          const filtered = liked.filter((id) => id !== postId);
          setLiked(filtered);
        } else setLiked([...liked, postId]);
      } else {
        setLiked([postId]);
      }
      // setUpdating(false)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {liked && !liked?.includes(postId) ? (
        <div onClick={likeUnlikePost}>
          <FaRegHeart
            onClick={() => setLiked(!liked)}
            className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
            size={40}
          />
        </div>
      ) : (
        <div onClick={likeUnlikePost}>
          <FaHeart
            size={40}
            onClick={() => setLiked(!liked)}
            color="red"
            className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
          />
        </div>
      )}
      {/* <Link to={`/post/${postId}`}> */}
        <FaRegComment
          size={40}
          color="#fff"
          className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
          onClick={() => navigate(`/post/${postId}`,{
            state: { postedBy },
          })}
        />
      {/* </Link> */}
      {/* {
          showComment && <Comments postId={postId} />
      } */}
      <BiRepost
        size={46}
        color="#fff"
        className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
      />
      <FaShareFromSquare
        size={40}
        color="#fff"
        className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
      />
    </div>
  );
};
export default Actions;
