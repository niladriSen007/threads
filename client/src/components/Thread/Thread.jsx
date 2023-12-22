import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import { Link } from "react-router-dom";
import Actions from "../shared/Actions";
/**
 * Represents a Thread component.
 *
 * @component
 * @returns {JSX.Element} The Thread component.
 */

const Thread = ({ threadData }) => {
  const [showPopup, setShowPopup] = useState(false);

  const {threadId,content,imageUrl,likes,replies} = threadData;

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
    <div >
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
          <div className="flex items-center justify-between pt-3 ">
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
                  <div className="flex flex-col items-start justify-start gap-2  text-lg w-40">
                    <button className="border-b border-gray-600 py-2 w-full">Edit post</button>
                    <button className="border-b border-gray-600 py-2 w-full">Delete post</button>
                    <button className="border-b border-gray-600 py-2  w-full">Hide like count</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Link to={`/post/${threadId}`}>
          <span className="text-sm font-thin">{content}</span> 
          { imageUrl && <div className="rounded-lg pt-2">
            <img
              src="https://picsum.photos/200/300"
              alt="post"
              className="w-full h-72 object-cover rounded-2xl"
              loading="lazy"
            />
          </div>}
          </Link>
          <div>
            <Actions />
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
          <span>{likes} likes</span>
          <span>.</span>
          <span>{replies} replies</span>
        </div>
      </div>
      <hr className=" my-6  ml-16 " />
    </div>
  );
};
export default Thread;
