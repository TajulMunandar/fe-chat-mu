import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../assets/logoUmuslim.png";
import { LoginUser } from "../features/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(LoginUser({ email, password }));
    if (result.meta.requestStatus === "fulfilled" && result.payload) {
      const { userId, role } = result.payload; // Pastikan userId diambil dari payload
      localStorage.setItem("userId", userId);
      if (role === "user") {
        navigate("/Hubungi-Admin");
      } else if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate(from, { replace: true });
      }
    } else {
      console.error("Login gagal");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 items-center lg:px-8 font-[poppins]">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:shadow-2xl md:p-10 rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
          <img className="mx-auto w-32" src={image} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Masuk ke Akun Anda
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isError && <p className="text-red-800 text-center">{message}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-2 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Link
            className="float-end pb-5  text-blue-500 text-sm font-bold"
            to="/register"
          >
            {" "}
            <span className="font-medium text-gray-500">
              Tidak Memiliki Akun!
            </span>{" "}
            Daftar ?
          </Link>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#006633] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
