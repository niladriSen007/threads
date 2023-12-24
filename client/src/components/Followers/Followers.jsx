
import { useEffect, useState } from "react";
import {  useThreadContext } from "../../store/ThreadContext"
import axios from "axios";

const Followers = () => {

  const {currentUser} = useThreadContext()

  const [followers, setFollowers] = useState([]);

  console.log(currentUser?.followers)

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const promises = currentUser?.followers.map(id => axios.get(`/api/users/getProfile/${id}`));
        const responses = await Promise.all(promises);
        const followerDetails = responses.map(response => response.data);
        setFollowers(followerDetails);
      } catch (error) {
        console.error('Failed to fetch followers', error);
      }
    };

    if (currentUser?.followers?.length) {
      fetchFollowers();
    }
  }, [currentUser?.followers]);

  console.log(followers)

    

  return (
    <div className="text-white">
        <p className=" pb-4">Your Followers</p>
      {
      followers?.length > 0 ?
      followers?.map((follower) => (
        <div key={follower?._id} className="flex items-center justify-between gap-5 border-b border-gray-600 py-5">
          <div className="flex items-center gap-5">
            <img
              src={follower?.profileimg || "https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"}
              alt="user"
              className="rounded-full  w-16 h-16"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{follower?.username}</h1>
              <p className="text-sm text-gray-400 font-semibold">{follower?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="  text-white  w-full py-1 px-2 bg-blue-700 rounded-lg">
              Follow
            </button>
          </div>
        </div>
      )) : <div className="text-center text-white">No followers yet.</div>
    }</div>
  )
}
export default Followers