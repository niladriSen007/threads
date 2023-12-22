import { BsThreeDots } from "react-icons/bs"
import Actions from "../shared/Actions"
import { useEffect, useRef, useState } from "react";

const Comments = () => {

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
    <div className=" my-3 border-t border-gray-600 py-4 relative">
         <div className="flex items-start gap-3  ">
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/9.jpg"
            alt="profile"
            className="rounded-full w-6 h-6"
            loading="lazy"
          />
        </div>
        <div className=" flex-1 flex items-center justify-between ">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">niladri_076</span>
            <span className="text-sm font-mono">qdvhgqdvd ud qdgquydguqgd</span>
          </div>
          <div className="flex items-end gap-2 ">
            <span className="text-xs text-gray-600">6m</span>
            <BsThreeDots
              onClick={() => setShowPopup(!showPopup)}
              className="cursor-pointer relative z-50"
            />

            {showPopup && (
              <div
                ref={popref}
                className="absolute top-12 right-2  bg-gray-800 rounded-lg text-white text-xs"
              >
                <div className="flex flex-col items-start justify-start gap-2  text-sm w-40 ">
                  
                  <button className="border-b border-gray-600 py-2 w-full">
                    Delete Comment
                  </button>
                  <button className=" py-2 pt-1  w-full">
                    Hide Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       <div className="pl-8 py-1">
       <Actions />
       </div>
       <span className="pl-10 text-sm">12 likes</span>
    </div>
  )
}
export default Comments