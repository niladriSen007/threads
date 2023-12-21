import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
const Thread = () => {
  const [liked, setLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const popref = useRef(null);

  //generater a code by using which i can implement the functionality that when i click any other place the popup will be closed
  useEffect(() => {
    const handleClickOutsideClick = (event) => {
      if (popref.current && !popref.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    const handleClickOutside = () => {
      document.addEventListener("mousedown", handleClickOutsideClick);
    };

    const cleanup = () => {
      document.removeEventListener("mousedown", handleClickOutsideClick);
    };

    if (showPopup) {
      handleClickOutside();
    } else {
      cleanup();
    }

    return cleanup;
  }, [showPopup]);

  return (
    <div>
      <div className="flex items-start gap-3 justify-between relative">
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/9.jpg"
            alt="profile"
            className="rounded-full w-12 h-12"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">niladri_076</span>
              <span className="text-sm font-thin">First post</span>
            </div>
            <div className="flex items-end gap-2 ">
              <span>6m</span>
              <BsThreeDots
                onClick={() => setShowPopup(!showPopup)}
                className="cursor-pointer"
              />

              {showPopup && (
                <div
                  ref={popref}
                  className="absolute top-10 right-2 bg-gray-800 rounded-lg px-4 py-2 text-white text-xs"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span>Report</span>
                    <span>Block</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg">
            <img
              src="https://picsum.photos/200/300"
              alt="post"
              className="w-full h-72 object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
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
        </div>
      </div>
      <div className="flex items-center gap-3 ml-16 my-1">
        <div className="flex items-center ">
          <img
            src="https://randomuser.me/api/portraits/men/19.jpg"
            className="w-6 h-6 rounded-full"
            alt="user_1"
          />
          <img
            src="https://randomuser.me/api/portraits/men/3.jpg"
            className="w-6 h-6 rounded-full"
            alt="user_1"
          />
          <img
            src="https://randomuser.me/api/portraits/men/12.jpg"
            className="w-6 h-6 rounded-full"
            alt="user_1"
          />
        </div>
        <div className="flex gap-1 text-sm font-thin text-gray-600">
          <span>238 likes</span>
          <span>.</span>
          <span>839 replies</span>
        </div>
      </div>
      <hr className=" my-6  ml-16 " />
    </div>
  );
};
export default Thread;
