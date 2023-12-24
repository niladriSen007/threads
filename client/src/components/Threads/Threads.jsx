import { lazy } from "react";
import { useThreadContext } from "../../store/ThreadContext";
import { useQuery } from "react-query";
import axios from "axios";


const Thread = lazy(() => import("../Thread/Thread"));

const Threads = ({threads}) => {

  const {currentUser} = useThreadContext();
  console.log(currentUser)

  // const {name, username, profileimg,followers} = currentUser;

  const getUsersAllPost = async () => {
    try {
    const res = await axios.get(`/api/posts/getAllPosts/${currentUser?._id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {data} = useQuery("posts", getUsersAllPost);

  console.log(data)



  return (
    <>
    {
      data?.length > 0 ?
      data?.map((thread) => (
        <div key={thread?._id}>

        <Thread threadData = {thread}/>
        </div>
      )) : <div className="text-center text-white">Please make some posts to show.</div>
    }
    </>
  );
};
export default Threads;
