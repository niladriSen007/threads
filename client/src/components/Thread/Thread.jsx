import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import { Link } from "react-router-dom";
import Actions from "../shared/Actions";
import { useThreadContext } from "../../store/ThreadContext";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

/**
 * Represents a Thread component.
 *
 * @component
 * @returns {JSX.Element} The Thread component.
 */

const Thread = ({ threadData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [postedBy, setPostedBy] = useState(null);
  const [loading, setLoading] = useState(true);

  // const {threadId,content,imageUrl,likes,replies} = threadData;
  const { currentUser,setUpdating,setLiked,liked } = useThreadContext();

  const popref = useRef(null);

  // console.log(threadData);

  useEffect(() => {
    const fetchPostedBy = async () => {
      try {
        const res = await axios.get(
          `/api/users/getProfile/${threadData?.postedBy}`
        );
        // console.log(res.data);
        const profileimg = res?.data?.profileimg;
        const username = res?.data?.username;
        setLoading(false);
          if(threadData?.likes?.includes(currentUser?._id)){
            setLiked([...liked, threadData?._id])
          } 
        setPostedBy((prev) => {
          return { ...prev, username, profileimg };
        });
        return { username, profileimg };
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostedBy();
  }, []);


  console.log(threadData?.createdAt)


  const givenDate = new Date(threadData?.createdAt);
const currentDate = new Date();

const diffInMilliseconds = givenDate.getTime() - currentDate.getTime();

// Convert to seconds
const diffInSeconds = Math.abs(Math.round(diffInMilliseconds / 1000));

// Convert to minutes
const diffInMinutes = Math.abs(Math.round(diffInSeconds / 60));

// Convert to hours
const diffInHours =Math.abs( Math.round(diffInMinutes / 60));

// Convert to days
const diffInDays = Math.abs(Math.round(diffInHours / 24));

// console.log(`Difference in milliseconds: ${diffInMilliseconds}`);
// console.log(`Difference in seconds: ${diffInSeconds}`);
// console.log(`Difference in minutes: ${diffInMinutes}`);
// console.log(`Difference in hours: ${diffInHours}`);
// console.log(`Difference in days: ${diffInDays}`);




  const handleDeletePost = async () => {
    console.log("In delete post")
    setUpdating(true)
    try {
      const res = await axios.delete(`/api/posts/deletePost/${threadData?._id}`);
      setUpdating(false)
      console.log(res.data);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="w-full relative">
      {loading ? (
        <div className="text-center text-white"><Loading /></div>
      ) : (
        <div>
          <div className="flex items-start gap-3 justify-between  ">
            <div>
              <img
                src={
                  postedBy?.profileimg ||
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="profile"
                className="rounded-full w-12 h-12"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between pt-3 ">
                <div className="flex flex-col">
                  <span className="font-medium">{postedBy?.username}</span>
                  {/* <span className="text-sm font-thin">{content}</span> */}
                </div>
                <div className="flex items-end gap-2 ">
                  <span>{diffInMinutes > 60 ? (diffInHours > 24 ? `${diffInDays} d` : `${diffInHours} hr`) : `${diffInMinutes}m`}</span>
                  <BsThreeDots
                    onClick={() => setShowPopup(!showPopup)}
                    className="cursor-pointer relative z-50"
                  />

                  {showPopup && (
                    <div
                      ref={popref}
                      className="absolute top-10 right-2 bg-gray-800 rounded-md  text-white text-xs w-28"
                    >
                      <div className="flex flex-col items-start justify-start gap-2  text-lg ">
                        {currentUser?._id === threadData?.postedBy ? (
                          <>
                            <button className="border-b border-gray-600 py-1 w-full text-sm">
                              Edit post
                            </button>
                            <button className=" border-gray-600 pb-1 w-full text-sm" onClick={handleDeletePost}>
                              Delete post
                            </button>
                          </>
                        ) : (
                          <div>
                            <button className="border-b border-gray-600 py-1 w-full text-sm">
                              Report post
                            </button>
                            <button className=" border-gray-600 pb-1 w-full text-sm">
                              Share Post
                            </button>
                          </div>
                        )}
                        {/* <button className="border-b border-gray-600 py-2  w-full">Hide like count</button> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <Link to={`/post/${threadData?._id}` }> */}
                <span className="text-sm font-thin">
                  {threadData?.postText}
                </span>
                {threadData?.photo && (
                  <div className="rounded-lg pt-2">
                    <img
                      src={threadData?.photo}
                      alt="post"
                      className="w-full h-96 object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                )}
              {/* </Link> */}
              <div>
                <Actions postId={threadData?._id} postLikes={threadData?.likes} postedBy={postedBy}/>
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
              <span>{threadData?.likes?.length} likes</span>
              <span>.</span>
              <span>{threadData?.replies?.length} replies</span>
            </div>
          </div>
          <hr className=" my-6 bg-gray-600 h-[1px] rounded-3xl border-none " />
        </div>
      )}
    </div>
  );
};
export default Thread;
