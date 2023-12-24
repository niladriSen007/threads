import { useThreadContext } from "../../store/ThreadContext"

const Following = () => {

  const {currentUser} = useThreadContext()
  // console.log(currentUser)

  return (
    <div className="text-center text-white">{currentUser?.following?.length > 0 ? currentUser?.following?.length : <span>You have not yet followed anyone</span>}</div>
  )
}
export default Following