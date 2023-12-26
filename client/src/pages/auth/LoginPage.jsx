import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useThreadContext } from "../../store/ThreadContext";

const LoginPage = () => {
  const redirect = useNavigate();
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const [responsedata, setResponseData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [fetchStatus, setFetchStatus] = useState();

  const {setCurrentUser} = useThreadContext()

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "* Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "* Required";
    }

    return errors;
  };

  const postData = async (values) => {
    console.log(values);
    const res = await axios.post("/api/auth/signin", values);
    if (res.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return res.data;
  };

  const mutation = useMutation((values) => postData(values), {
    onSuccess: (data) => {
      // Invalidate and refetch
      console.log(data);
      localStorage.setItem("current-user", JSON.stringify(data));
      setCurrentUser(data)
      queryClient.invalidateQueries("data");
      redirect("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="h-screen">
      <img
        src="https://www.roomvu.com/academy/wp-content/uploads/2023/08/image-79.png"
        alt=""
      />

      <div className="flex flex-col justify-center items-center gap-8 -mt-32">
        {fetchStatus === "loading" && <div>Loading...</div>}
        {fetchStatus === "error" && <div>Error fetching data</div>}
        {fetchStatus === "success" && (
          <div>Data fetched: {JSON.stringify(responsedata)}</div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-96 gap-2"
        >
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            // autoComplete="off"
            className="p-4 rounded-md text-white bg-gray-800 focus:mx-1"
            placeholder="Enter your email "
          />
          {formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="p-4 rounded-md text-white bg-gray-800 focus:mx-1"
            placeholder="Enter your password "
          />

          {formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="mt-4 p-2 rounded-md bg-blue-700">
            Submit
          </button>
        </form>
        <span className="text-gray-600">---------- or -----------</span>
        <div className="flex items-center gap-8 border border-gray-600  px-14 rounded-lg py-4">
         <img src="https://img.freepik.com/premium-vector/instagram-app-icon-social-media-logo-vector-illustration_277909-403.jpg" alt="" className="w-12 h-12 rounded-lg object-cover" />
          <span>Continue with Instagram</span>
        </div>
        <Link to={"/signup"} className="w-96 text-center p-2 rounded-md border border-gray-600 ">Register as a new user ?</Link>
      </div>
    </div>
  );
};
export default LoginPage;
