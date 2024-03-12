import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux/userAction";
import { toast, Toaster } from "sonner";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
  });

  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(data, navigate));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  });
  function handleClick() {
    navigate("/Login");
  }
  return (
    <div>
      <Toaster position="bottom-right" />
      {isLoading ? (
        <>
          <p>Please Wait...</p>
        </>
      ) : (
        <>
          {" "}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="namePerson" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={data.name}
                id="namePerson"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <div id="namePerson" className="form-text">
                enter name
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="contact">
              <label htmlFor="inputcontact" className="form-label">
                Contact Number
              </label>
              <input
                type="number"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                className="form-control"
                id="inputcontact"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="select ">
              <label for="category">Choose Gender</label>
              <select
                className="form-select form-select-lg mb-3"
                value={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
                aria-label="Large select example"
              >
                <option selected>Choose Gender</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div>
              <p>already have an account?</p>
              <a href="" onClick={handleClick}>
                Login
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;
