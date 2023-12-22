import { lazy } from "react";


const Thread = lazy(() => import("../Thread/Thread"));

const Threads = () => {

  // const threadId = 1;
  const threadData = {
    threadId:1,
    content: "This is a thread",
    imageUrl: "https://picsum.photos/200/300",
    likes: 10,
    replies: 5,
  };


  const threadData2 = {
    threadId:2,
    content: "This is a thread 2",
    // imageUrl: "https://picsum.photos/200/300",
    likes: 10,
    replies: 5,
  };



  return (
    <>
      <Thread {...{threadData}}/>
      <Thread {...{threadData: threadData2}}/>
    </>
  );
};
export default Threads;
