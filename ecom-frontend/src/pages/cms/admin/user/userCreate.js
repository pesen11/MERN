import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";
import { createUser } from "../../../../services/userService";
import UserForm from "./userFormComponent";
import { useNavigate } from "react-router-dom";

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

const UserCreate = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      // console.log(data);
      let response = await createUser(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/user");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="User" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <UserForm handleSubmit={handleSubmit} defaultData={defaultValues} edit={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreate;
