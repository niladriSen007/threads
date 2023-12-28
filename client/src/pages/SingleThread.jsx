import { useEffect, useRef, useState } from "react";

import { BsThreeDots } from "react-icons/bs";

import Actions from "../components/shared/Actions";
import Comments from "../components/Comments/Comments";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router";
import { FaRegComment } from "react-icons/fa";
import { useThreadContext } from "../store/ThreadContext";
// import { useParams } from "react-router"

const SingleThread = () => {
  const { postId } = useParams()

  const location = useLocation();

  // console.log(location?.state?.postedBy)

  const {postedBy} = location?.state;

  const {showComment,setShowComment} = useThreadContext();



  const [threadData, setThreadData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const popref = useRef(null);

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

  const getThread = async () => {
    try {
      const res = await axios.get(`/api/posts/getPost/${postId}`);
      console.log(res.data);
      setThreadData(res.data);
      setCommentCount(res.data?.replies?.length);
    } catch (error) {
      console.log(error);
    }
  }

  const { data } = useQuery("thread", getThread);


  return (
    <div className=" mx-auto  max-w-xl relative">
      <div className="flex items-center gap-3  ">
        <div>
          <img
            src={postedBy?.profileimg}
            alt="profile"
            className="rounded-full w-12 h-12"
            loading="lazy"
          />
        </div>
        <div className=" flex-1 flex items-center justify-between pt-3 ">
          <div className="flex flex-col">
            <span className="font-medium">{postedBy?.username}</span>
            {/* <span className="text-sm font-thin">{content}</span> */}
          </div>
          <div className="flex items-end gap-2 ">
            <span>6m</span>
            <BsThreeDots
              onClick={() => setShowPopup(!showPopup)}
              className="cursor-pointer  z-50"
            />

            {showPopup && (
              <div
                ref={popref}
                className="absolute top-10 right-2 bg-gray-800 rounded-lg  text-white text-xs"
              >
                <div className="flex flex-col items-start justify-start gap-2  text-sm w-40 ">
                  <button className="border-b border-gray-600 py-2 w-full">
                    Edit post
                  </button>
                  <button className="border-b border-gray-600 py-2 w-full">
                    Delete post
                  </button>
                  <button className="border-b border-gray-600 py-2  w-full">
                    Hide like count
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-3 flex flex-col gap-3">
        <p className="text-sm font-thin">{threadData?.postText}</p>
       { threadData?.photo &&  <img
          src={threadData?.photo}
          alt="post"
          className="w-full h-80 object-cover rounded-lg"
        />}
      </div>
      <div>
      <FaRegComment
          size={40}
          color="#fff"
          className="cursor-pointer hover:bg-gray-800 p-2 rounded-full duration-300 ease-in-out transition-all"
         onClick={() => setShowComment(!showComment)}
        />
      </div>
      <div className="flex gap-1 text-sm font-thin text-gray-600 pb-6">
        <span>{threadData?.likes?.length} likes</span>
        <span>.</span>
        <span>{commentCount} replies</span>
      </div>
      {
        showComment &&
      <Comments {...{postId,commentCount,setCommentCount}}/>
      }
      {/* <Comments />
      <Comments /> */}
    </div>
  );
};
export default SingleThread;
