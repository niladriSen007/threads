
// import { toast } from "react-toastify"

import axios from "axios"
import { useQuery } from "react-query"
import { useThreadContext } from "../store/ThreadContext"


const HomePage = () => {

  const { setCurrentUser } = useThreadContext();

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/users/profile")
      console.log(res)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

   const { status, data } = useQuery("currentUser", getCurrentUser)
  //  console.log(data)
   setCurrentUser(data)

  // useEffect(() => {
  //   welcome()
  // }, [])

  // const welcome = () => {
  //   toast.success("Welcome to the HomePage")
  // }

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching data</div>}
      
        <h1>Home Page</h1>
    </div>
  )
}
export default HomePage