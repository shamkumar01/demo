import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../redux/userAction";
import { toast, Toaster } from "sonner";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(otp, navigate));
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  });
  return (
    <div>
      <Toaster richColors position="bottom-center" />
      {isLoading ? (
        <>
          <p>loading </p>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter the Otp
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Otp;
