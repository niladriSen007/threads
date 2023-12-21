import { FaInstagram } from "react-icons/fa";
import { profileTab } from "../constants/utils/profileTab";
import { Suspense, useState } from "react";
import { profileContent } from "../constants/utils/profileContent";
const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <section>
        {/* // Profile Info */}
        <div className="flex items-center justify-between mx-auto  max-w-xl">
          <div className="flex flex-col ">
            <h1 className="text-3xl overflow-hidden font-black ">Niladri Sen</h1>
            <p className="text-sm text-gray-400 font-semibold">niladri_076</p>
            <span className="text-sm text-gray-400 font-base mt-3">
              0 followers
            </span>
          </div>
          <div className="flex flex-col gap-5 justify-end items-end">
            <img
              src="https://randomuser.me/api/portraits/men/9.jpg"
              alt="user"
              className="rounded-full  w-24 h-24"
              loading="lazy"
            />
            <FaInstagram size={24} color="#fff" />
          </div>
        </div>

        {/* // Edit Profile Button */}
        <div className="flex items-center justify-between mx-auto  max-w-xl mt-5">
          <button className="bg-transparent border border-gray-600 text-white  w-full py-1 rounded-lg">
            Edit Profile
          </button>
        </div>

        {/* // Profile Tab */}
        <div className="flex items-center justify-between gap-5 mx-auto max-w-xl my-16 border-b px-16  border-gray-600">
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
          {profileContent?.map((content) => (
            <div
              className={`${
                selectedTab === content?.id ? "block" : "hidden"
              } w-full`}
              key={content.id}
            >
              {content.element}
            </div>
          ))}
        </div>
      </section>
    </Suspense>
  );
};
export default ProfilePage;