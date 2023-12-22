import { useState } from "react";
import { BiRepost } from "react-icons/bi";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";

const Actions = () => {
    const [liked, setLiked] = useState(false);
  return (
    <div className="flex items-center gap-1">
            {!liked ? (
              <FaRegHeart
                onClick={() => setLiked(!liked)}
                className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
                size={40}
              />
            ) : (
              <FaHeart
                size={40}
                onClick={() => setLiked(!liked)}
                color="red"
                className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
              />
            )}

            <FaRegComment
              size={40}
              color="#fff"
              className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
            />
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
  )
}
export default Actions