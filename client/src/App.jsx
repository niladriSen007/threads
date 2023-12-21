import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/Navbar";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";

function App() {
  const LoginUserLayout = () => {
    return (
      <div className="w-screen min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    );
  };

  const BeforeLoginUserLayout = () => {
    return (
      <div className="w-screen h-screen bg-slate-950 text-white">
        <h1>Before Login Layout</h1>
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginUserLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/create",
          element: <CreatePost />,
        },
        {
          path: "/activity",
          element: <ActivityPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/",
      element: <BeforeLoginUserLayout />,
      children: [
        {
          path: "/login",
          element: <h1>Login</h1>,
        },
        {
          path: "/signup",
          element: <h1>Signup</h1>,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
