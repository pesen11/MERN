import "bootstrap/dist/css/bootstrap.min.css";

// import { useState } from "react";

const LoginPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 offset-md-3 col-md-6">
            <h4 className="text-center">Login Page</h4>
            <hr />
            <div className="form-group row">
              <label className="col-sm-3" htmlFor="email">
                Email address:
              </label>
              <div className="col-sm-9 mb-3">
                <input
                  className=" form-control"
                  type="email"
                  name="email"
                  placeholder="Enter your email."
                ></input>
              </div>
              <label className="col-sm-3" htmlFor="password">
                Password:
              </label>
              <div className="col-sm-9">
                <input
                  className=" form-control"
                  type="password"
                  name="password"
                  placeholder="Your Password."
                ></input>
              </div>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label mb-3" htmlFor="exampleCheck1">
                Remember me.
              </label>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
