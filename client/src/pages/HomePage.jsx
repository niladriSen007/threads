
// import { toast } from "react-toastify"

import axios from "axios"
import { useQuery } from "react-query"
import Thread from "../components/Thread/Thread"
import { useState } from "react"


const HomePage = () => {


  const [posts,setPosts]  = useState([])
  



  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts/getAll")
      console.log(res)
      setPosts(res.data)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }


   const { status:fetchPostStatus, data  } = useQuery("getPosts", getPosts)
  // console.log(data)




  return (
    <div>
      {/* {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching data</div>} */}
      {fetchPostStatus === "loading" && <div>Loading...</div>}
      {fetchPostStatus === "error" && <div>Error fetching data</div>}
      {fetchPostStatus === "success" && (
        <div className="mx-auto max-w-3xl mt-6">
          {posts?.map((post) => (
            <div key={post?._id} className="flex items-center justify-between gap-5  py-5 w-full ">
              <Thread threadData={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )}

export default HomePage