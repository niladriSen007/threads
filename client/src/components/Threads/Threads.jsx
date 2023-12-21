import { lazy } from "react";


const Thread = lazy(() => import("../Thread/Thread"));

const Threads = () => {


  return (
    <>
      <Thread />
    </>
  );
};
export default Threads;
