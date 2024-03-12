import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userAction";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data, navigate));
    setData({ email: " ", password: " " }); /*to clear data  after submit*/
  };

  // useEffect(() => {
  //   if (success) {
  //     toast.success(success);
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [success, error]);
  function handleClick() {
    e.preventDefault();
    navigate("/Signup");
  }

  return (
    <div>
      <Toaster richColors position="bottom-center" />
      {isLoading ? (
        <>
          <p>loading</p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email addres
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div>
              <p>Create new account</p>
              <a href="" onClick={handleClick}>
                Signup
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
