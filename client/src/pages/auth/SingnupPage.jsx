/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const redirect = useNavigate();
  const queryClient = useQueryClient();

  const [responsedata, setResponseData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [fetchStatus, setFetchStatus] = useState();

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "* Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!values.username) {
      errors.username = "* Required";
    } else if (values.username.length > 20) {
      errors.username = "Must be 20 characters or less";
    }

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

    if (!values.confirmpassword) {
      errors.confirmpassword = "* Required";
    }

    return errors;
  };

  const postData = async (values) => {
    console.log(values);
    const res = await axios.post("/api/auth/signup", values);
    if (res.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return res.data;
  };

  const mutation = useMutation((values) => postData(values), {
    onSuccess: (data) => {
      // Invalidate and refetch
      console.log(data);
      queryClient.invalidateQueries("data");
      redirect("/login");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validate,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      {fetchStatus === "loading" && <div>Loading...</div>}
      {fetchStatus === "error" && <div>Error fetching data</div>}
      {fetchStatus === "success" && (
        <div>Data fetched: {JSON.stringify(responsedata)}</div>
      )}

      <form onSubmit={formik.handleSubmit} className="flex flex-col w-96 gap-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="p-2 rounded-md text-black"
        />
        {formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="username">User Name</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="p-2 rounded-md text-black"
        />
        {formik.errors.username ? (
          <div className="text-red-500">{formik.errors.username}</div>
        ) : null}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="p-2 rounded-md text-black"
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
          className="p-2 rounded-md text-black"
        />

        {formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          id="confirmpassword"
          name="confirmpassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmpassword}
          className="p-2 rounded-md text-black"
        />

        {formik.errors.confirmpassword ? (
          <div className="text-red-500">{formik.errors.confirmpassword}</div>
        ) : null}

        <button type="submit" className="mt-4 p-2 rounded-md bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
