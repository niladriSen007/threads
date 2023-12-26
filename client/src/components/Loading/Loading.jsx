import { BsThreeDots } from "react-icons/bs"
import Actions from "../shared/Actions"

const Loading = () => {
  return (
    <div>
          <div className="flex items-center gap-3 justify-between w-full ">
            <div className="flex items-center gap-2">
              <img
                src={
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="profile"
                className="rounded-full w-12 h-12"
                loading="lazy"
              />
          <div className="w-24 h-4 bg-slate-900"></div>
            </div>
          <div className="w-24 h-4 bg-slate-900"></div>
        </div>
        <div className="w-full bg-slate-900 h-40 my-4 ">

        </div>
          <div className="flex items-center gap-3 ml-16 my-1">
            <div className="flex items-center ">
              <img
                src={
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="profile"
                className="rounded-full w-6 h-6"
                loading="lazy"
              />
               <img
                src={
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="profile"
                className="rounded-full w-6 h-6"
                loading="lazy"
              />
               <img
                src={
                  "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
                }
                alt="profile"
                className="rounded-full w-6 h-6"
                loading="lazy"
              />
            </div>
            <div className="flex gap-1 items-center text-sm font-thin text-gray-600">
              {/* <span>{threadData?.likes?.length} likes</span> */}
              <div className="w-16 h-4 bg-slate-900"></div>
              <span>.</span>
              {/* <span>{threadData?.replies?.length} replies</span> */}
              <div className="w-16 h-4 bg-slate-900"></div>
            </div>
          </div>
          <hr className=" my-6 bg-gray-600 h-[1px] rounded-3xl border-none " />
        </div>
  )
}
export default Loading