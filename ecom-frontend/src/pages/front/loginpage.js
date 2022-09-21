import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

let defaultData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  let [data, setData] = useState(defaultData);

  let [err, setErr] = useState(defaultData);

  // let [query, setQuery] = useSearchParams(); //query i.e url baata data nikaalna

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //params are url, data, header

    try {
      let response = await login(data);
      console.log(response);

      if (response.status) {
        toast.success(response.msg);
        navigate("/" + response.result.user.role[0]);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
    validate(e.target);
  };

  const validate = ({ name, value, required }) => {
    let err_msg = "";
    switch (name) {
      case "email":
        err_msg = required && !value ? "Email is required" : null;
        break;
      case "password":
        err_msg =
          required && !value
            ? "Password is required"
            : value.length < 8
            ? "Password must be atleast 8 characters long."
            : null;
        break;
      default:
        break;
    }

    setErr({ ...err, [name]: err_msg });
  };

  //useEffect lai async banauna mildaina it is async in itself.
  useEffect(() => {
    let token = localStorage.getItem("auth_token");

    if (token) {
      let token = localStorage.getItem("auth_token");
      let user = JSON.parse(localStorage.getItem("auth_user"));
      console.log(user);

      if (!user || !token) {
        localStorage.clear();
      } else {
        navigate("/" + user.role[0]);
      }

      // getVerified()
      //   .then((response) => {
      //     navigate("/" + response.result.role[0]);
      //   })
      //   .catch((error) => {
      //     toast.error(error.response.data.msg);
      //     localStorage.clear();
      //   });
    }
  }, [navigate]);

  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-sm-12 offset-md-1 col-md-9">
            <h4 className="text-center">Login Page</h4>
            <hr />
            <Form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    required
                  ></input>
                  <em className="text-danger">{err?.email}</em>
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
                    onChange={handleChange}
                    required
                  ></input>
                  <em className="text-danger">{err?.password}</em>
                </div>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label mb-3" htmlFor="exampleCheck1">
                  Remember me.
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Log In
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
