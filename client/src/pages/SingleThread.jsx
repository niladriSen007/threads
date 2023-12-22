import { useEffect, useRef, useState } from "react";

import { BsThreeDots } from "react-icons/bs";

import Actions from "../components/shared/Actions";
import Comments from "../components/Comments/Comments";
// import { useParams } from "react-router"

const SingleThread = () => {
  // const { postId } = useParams()

  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div className=" mx-auto  max-w-xl">
      <div className="flex items-center gap-3  relative">
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/9.jpg"
            alt="profile"
            className="rounded-full w-12 h-12"
            loading="lazy"
          />
        </div>
        <div className=" flex-1 flex items-center justify-between pt-3 ">
          <div className="flex flex-col">
            <span className="font-medium">niladri_076</span>
            {/* <span className="text-sm font-thin">{content}</span> */}
          </div>
          <div className="flex items-end gap-2 ">
            <span>6m</span>
            <BsThreeDots
              onClick={() => setShowPopup(!showPopup)}
              className="cursor-pointer relative z-50"
            />

            {showPopup && (
              <div
                ref={popref}
                className="absolute top-10 right-2 bg-gray-800 rounded-lg  text-white text-xs"
              >
                <div className="flex flex-col items-start justify-start gap-2  text-lg w-40 h-48">
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
        <p className="text-sm font-thin">Lorem ipsum dolo</p>
        <img
          src="https://picsum.photos/200/300"
          alt="post"
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>
      <div>
        <Actions />
      </div>
      <div className="flex gap-1 text-sm font-thin text-gray-600 pb-6">
        <span>233 likes</span>
        <span>.</span>
        <span>833 replies</span>
      </div>
      <Comments />
      <Comments />
      <Comments />
    </div>
  );
};
export default SingleThread;
