import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useThreadContext } from "../../store/ThreadContext";
import { useRef, useState } from "react";
import { toast } from "react-toastify";


const EditProfile = ({setShowEditProfile}) => {

    const {currentUser,setCurrentUser} = useThreadContext();
    const [selectedImage, setSelectedImage] = useState(null);
  const {updating, setUpdating} = useThreadContext();

    const imgRef = useRef(null)

    // const redirect = useNavigate();
    const queryClient = useQueryClient();


    const updateUser = async (values) => {
      setUpdating(true)
      setShowEditProfile(false)
       try {
        const res = await axios.put(`/api/users/updateProfile/${currentUser?._id}`, {...values,profileimg:selectedImage});
        if (res.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return res.data;
       } catch (error) {
        console.log(error);
       }
    }


    const mutation = useMutation((values) => updateUser(values), {
        onSuccess: (data) => {
          // Invalidate and refetch
          console.log(data);
          setUpdating(false)
          localStorage.setItem("current-user",  JSON.stringify(data));
          setCurrentUser(data)
          toast.success("Profile updated successfully");
          queryClient.invalidateQueries("data");
          setShowEditProfile(false)
        //   redirect("/signin");
        },
      });


      const formik = useFormik({
        initialValues: {
          name: currentUser?.name,
          username: currentUser?.username,
          email: currentUser?.email,
          profileimg : currentUser?.profileimg
        },
        onSubmit: (values) => {
          mutation.mutate(values);
        },
      });


      const handleImageChange = (e) =>{
       if(e?.target?.files && e?.target?.files[0].type.startsWith("image/")){
        console.log("Image selected")
        const reader = new FileReader();
        reader.onloadend = () =>{
          setSelectedImage(reader.result);
          // formik.setFieldValue("profileimg", reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
       }
      }



  return (
    <div className="w-[520px] h-[700px] bg-slate-900 flex items-center justify-center rounded-md relative">

        <div className="absolute top-2 right-2 m-4 cursor-pointer" onClick={()=>setShowEditProfile(false)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col w-96  gap-3">

        {/* <label htmlFor="profileimg" className="text-white">Profile Image</label> */}
        <button type="button" className="text-white w-40 py-1 rounded-md bg-green-600 " onClick={()=>imgRef.current.click()}>Change Avatar</button>
        <input
          id="profileimg"
          name="profileimg"
          type="file"
          onChange={handleImageChange}
          // value={formik.values.profileimg}
          className="p-2 rounded-md text-white border border-white hidden"
          ref={imgRef}
        />

        {
          selectedImage && (
            <div className="flex items-center justify-center ">
              <img src={selectedImage} alt="profile" className=" object-cover w-24 h-24 rounded-full" />
            </div>
          )
        }

        <label htmlFor="name" className="text-white">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="p-2 rounded-md text-black border border-black"
        />
        {formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="username"  className="text-white">User Name</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="p-2 rounded-md text-black border border-black"
        />
        {formik.errors.username ? (
          <div className="text-red-500">{formik.errors.username}</div>
        ) : null}

        <label htmlFor="email"  className="text-white">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="p-2 rounded-md text-black border border-black"
        />
        {formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

      

        <button type="submit" className="mt-4 p-2 rounded-md bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  )
}
export default EditProfile