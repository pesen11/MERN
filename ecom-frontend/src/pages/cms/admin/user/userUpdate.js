import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";

import { updateUser } from "../../../../services/userService";
import UserForm from "./userFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../../../services/userService";
import { useCallback, useEffect, useState } from "react";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  role: [],
  phone: "",
  address_shipping_address: "",
  address_shipping_house_no: "",
  address_billing_address: "",
  address_billing_house_no: "",
  image: "",
  status: "",
};

const UserUpdate = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [data, setData] = useState(defaultValues);

  const handleSubmit = async (data) => {
    try {
      // console.log("Final", data);

      let response = await updateUser(data, params.id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getUserById(id);
      // console.log(response);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="User" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <UserForm handleSubmit={handleSubmit} defaultData={data} edit={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
