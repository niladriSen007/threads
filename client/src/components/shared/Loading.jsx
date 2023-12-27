const Loading = ({content}) => {
  return (
    <div className="absolute w-screen h-screen -top-16 left-0 z-50 bg-transparent backdrop-blur-lg ">
    <div className="   h-screen ml-80 mt-16">
      <h1 className="text-3xl font-black text-center mt-96 mr-96 flex items-center justify-center gap-2 overflow-hidden">
        <img src="/biking.gif" alt="loading" className="w-20 h-20"/>
        <span className="font-medium text-2xl">{content}</span>
        </h1>
    </div>
  </div>
  )
}
export default Loading