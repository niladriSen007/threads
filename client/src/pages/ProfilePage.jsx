import { FaInstagram } from "react-icons/fa";
import { profileTab } from "../constants/utils/profileTab";
import { Suspense, useState } from "react";
// import { profileContent } from "../constants/utils/profileContent";
import { useThreadContext } from "../store/ThreadContext";
import Threads from "../components/Threads/Threads";
import Followers from "../components/Followers/Followers";
import Following from "../components/Following/Following";
import EditProfile from "../components/EditProfile/EditProfile";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const {updating} = useThreadContext();

  const {currentUser} = useThreadContext();
  console.log(currentUser)


  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <section className=" ">

      {
          updating && <div className="absolute w-screen h-screen -top-16 left-0 z-50 bg-transparent backdrop-blur-lg ">
            <div className="   h-screen">
              <h1 className="text-3xl font-black text-center mt-96 mr-96 flex items-center justify-center gap-2 overflow-hidden">
                <img src="/biking.gif" alt="loading" className="w-20 h-20"/>
                <span className="font-medium text-2xl">Your profile is upating...</span>
                </h1>
            </div>
          </div>
        }

        {/* // Profile Info */}
        <div className="flex items-center justify-between mx-auto  max-w-xl relative">
          <div className="flex flex-col ">
            <h1 className="text-3xl overflow-hidden font-black ">{currentUser?.name}</h1>
            <p className="text-sm text-gray-400 font-semibold">{currentUser?.username}</p>
            <span className="text-sm text-gray-400 font-base mt-3">
              {currentUser?.followers?.length} {currentUser?.followers?.length > 1 ? "followers" : "follower"}
            </span>
          </div>
          <div className="flex flex-col gap-5 justify-end items-end">
            <img
              src={currentUser?.profileimg || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
              alt="user"
              className="rounded-full  w-24 h-24"
              loading="lazy"
            />
            <FaInstagram size={24} color="#fff" />
          </div>
        </div>

        {/* // Edit Profile Button */}
        <div className="flex items-center justify-between mx-auto  max-w-xl mt-5">
          <button className="bg-transparent border border-gray-600 text-white  w-full py-1 rounded-lg" onClick={()=>setShowEditProfile(true)}>
            Edit Profile
          </button>
        </div>


        {
          showEditProfile && <>
            <motion.div
              initial={{scale:0}}
              animate={{scale:1}}
              transition={{duration:.7, type:"keyframes", stiffness:200}}
              exit={{scale:0}}
            className="absolute flex items-center justify-center -top-16 -left-72 w-screen h-screen bg-transparent backdrop-blur-sm z-50">
                <EditProfile {...{setShowEditProfile}}/>
            </motion.div>
          </>
        }

        {/* // Profile Tab */}
        <div className="flex items-center justify-between gap-5 mx-auto max-w-xl mt-16 mb-10 border-b px-16  border-gray-600">
          {profileTab?.map((tab) => (
            <div
              className={`flex items-center justify-center cursor-pointer pb-1 w-20 ${
                selectedTab === tab?.id ? "border-b-2" : ""
              }`}
              key={tab.id}
              onClick={() => setSelectedTab(tab?.id)}
            >
              <h1 className={`text-sm  `}>{tab.name}</h1>
            </div>
          ))}
        </div>

        {/* // Profile Tab Content */}
        <div className="flex items-center justify-between mx-auto  max-w-xl">
          {/* {profileContent?.map((content) => (
            <div
              className={`${
                selectedTab === content?.id ? "block" : "hidden"
              } w-full`}
              key={content.id}
            >
              {content.element}
            </div>
          ))} */}
          { selectedTab === 1 && <div className="w-full">
              <Threads />
          </div>}
          { selectedTab === 2 && <div className="w-full">
              <Followers />
          </div>}
          { selectedTab === 3 && <div className="w-full">
              <Following />
          </div>}
        </div>
      </section>
    </Suspense>
  );
};
export default ProfilePage;
