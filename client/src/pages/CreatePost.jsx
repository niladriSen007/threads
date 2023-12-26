import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { FaRegImage } from "react-icons/fa6"
import { useThreadContext } from '../store/ThreadContext';
import {motion} from 'framer-motion'
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

  const redirect = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const {currentUser,setCurrentUser,updating, setUpdating} = useThreadContext();

  const fileRef = useRef(null);

  const uploadPost = async (values) => {
    setUpdating(true)
    try {
      const res = await axios.post(`/api/posts/create`, {...values,photo:selectedImage}); 
      if (res.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return res.data;
      } catch (error) {
      console.log(error);
      }
  }


  const mutation = useMutation((values) => uploadPost(values), {
    onSuccess: (data) => {
      // Invalidate and refetch
      // console.log(data)
      setUpdating(false)

      console.log(data);
      redirect("/");
    },
  });


  const formik = useFormik({
    initialValues: {
      postText: '',
      photo: null,
      postedBy:currentUser?._id
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // formik.setFieldValue('image', event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };




  return (
    <div className="  flex items-start justify-center  w-[70vw]">

      {
        updating && (
          <div className="absolute w-screen h-screen -top-16 left-0 z-50 bg-transparent backdrop-blur-lg ">
          <div className="   h-screen ml-80 mt-16">
            <h1 className="text-3xl font-black text-center mt-96 mr-96 flex items-center justify-center gap-2 overflow-hidden">
              <img src="/biking.gif" alt="loading" className="w-20 h-20"/>
              <span className="font-medium text-2xl">Uploading your post...</span>
              </h1>
          </div>
        </div>
        )
      }
     
      <motion.div

      initial={{scale:0}}
      animate={{scale:1}}
      transition={{duration:.7, type:"keyframes", stiffness:200}}
      exit={{scale:0}}

      className='bg-slate-900 mt-24 flex flex-col w-96 rounded-md'>
        <form onSubmit={formik.handleSubmit} className='w-full  flex flex-col p-4'>
          <div className='flex items-center gap-2 my-4'>
          <img  src={currentUser?.profileimg} alt='user_photo' className='w-8 h-8 rounded-full' />
        <p>{currentUser?.username}</p>
          </div>
          <textarea
            id="postText"
            name="postText"
            onChange={formik.handleChange}
            value={formik.values.postText}
            className='rounded-md p-2 text-white bg-gray-700'
            placeholder='Enter your post here...'
          />
          <button
            type="button"
            className='my-3'
            onClick={() => fileRef.current.click()}
          >
            <FaRegImage size={24}/>
          </button>
          <input id="image" ref={fileRef} className='hidden' name="image" type="file" onChange={handleImageChange} />
          {selectedImage && (
            <div className='my-4'>
              <h3>Preview:</h3>
              <img src={selectedImage} alt="Selected" className='w-full h-48 object-fill my-8 mt-4 border border-gray-700 rounded-md' />
            </div>
          )}
          <button type="submit" className='w-32 mx-auto bg-blue-700 py-1 rounded-md my-4 shadow-xl'>Post</button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;