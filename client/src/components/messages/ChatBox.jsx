import axios from "axios";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useThreadContext } from "../../store/ThreadContext";
import { useFormik } from "formik";

const ChatBox = ({ receivingUser }) => {
  // const messages = [
  //   {
  //     id: 1,
  //     message: "Hello sayan",
  //     sender: "Niladri",
  //     receiver: "Sayan",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 2,
  //     message: "Hi Nil, How are you?",
  //     sender: "Sayan",
  //     receiver: "Niladri",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 3,
  //     message: "I am fine, How are you?",
  //     sender: "Niladri",
  //     receiver: "Sayan",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 4,
  //     message: "I am fine too",
  //     sender: "Sayan",
  //     receiver: "Niladri",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 5,
  //     message: "What are you doing?",
  //     sender: "Niladri",
  //     receiver: "Sayan",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 6,
  //     message: "    Nothing much, just chilling out with friends, you?",
  //     sender: "Sayan",
  //     receiver: "Niladri",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 7,
  //     message: "Coding, Coding and Coding",
  //     sender: "Niladri",
  //     receiver: "Sayan",
  //     timestamp: "21.36",
  //   },
  //   {
  //     id: 8,
  //     message: "Coding sucks",
  //     sender: "Sayan",
  //     receiver: "Niladri",
  //     timestamp: "21.36",
  //   },
  // ];

  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `/api/messages/getMessage/${receivingUser?.idx}`
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    getMessages();
  }, [receivingUser]);

  const { currentUser, getconversationsLoading,
    setGetconversationsLoading } = useThreadContext();


    

  const queryClient = useQueryClient();

  const sendMessages = async (values) => {
    setGetconversationsLoading(true)
    try {
      const res = await axios.post(
        `/api/messages/sendMessage`,
        {
          text:values?.text,
          receiverId: receivingUser?.idx,
        }
      );
      console.log(res);
      formik.values.text = "";
      setGetconversationsLoading(false)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation((values) => sendMessages(values), {
    onSuccess: (data) => {
      // Invalidate and refetch
      getMessages();
      console.log(data);
      queryClient.invalidateQueries("data");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });



  return (
    <div className="rounded-t-md relative">
      <div className="bg-slate-800 w-full h-14 p-2 flex items-center gap-3 relative">
        <img
          src={receivingUser?.img}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <h1 className="text-white text-lg font-medium">
          {receivingUser?.name}
        </h1>
        <div className="absolute bottom-2 w-3 h-3 bg-green-500 rounded-full left-8"></div>
      </div>
      <div className="bg-slatee-950 h-[600px] pb-16 w-full border-x border-b border-gray-600 p-4 rounded-b-md ">
        <div className="h-[500px]">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex flex-col my-2 ${
                message?.sender === currentUser?._id
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`flex items-center gap-2 ${
                  message?.sender === currentUser?._id ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div>
                  <img
                    src={
                      message?.sender === currentUser?._id
                        ? currentUser?.profileimg
                        : receivingUser?.img
                    }
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div

                  className={`flex flex-col  my-2  px-3 py-1 rounded-md ${
                    message?.sender === currentUser?._id
                      ? "items-end bg-blue-700"
                      : "items-start bg-violet-700"
                  }`}
                >
                  <div>
                    <h1
                      className={`text-xs font-thin ${
                        message?.sender === currentUser?._id
                          ? "text-white"
                          : "text-gray-200"
                      }`}
                    >
                      {message.sender === currentUser?._id
                        ? "You"
                        : receivingUser?.name}
                    </h1>
                  </div>
                  <div>
                    <h1
                      className={`text-xs ${
                        message?.sender === currentUser?._id
                          ? "text-white"
                          : "text-gray-200"
                      }`}
                    >
                      {message.text}
                    </h1>
                  </div>
                </div>
              </div>
              <p
                className={`text-xs   ${
                  message?.sender === currentUser?._id
                    ? "text-white text-right mr-10"
                    : "text-gray-200 ml-10"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          ))}
        </div>

        <div className=" absolute bottom-2 bg-slate-800  w-[612px]  p-4 rounded-full z-50  backdrop-blur-xl">
          <form onSubmit={formik.handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            name="text"
            id="text"
            onChange={formik.handleChange}
            value={formik.values.text}
            className="w-full bg-transparent focus:outline-none focus:border-b border-b border-gray-600"
            placeholder="Type a message"
          />
          <button type="submit" className="text-gray-200">
          <FaPaperPlane size={24}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
