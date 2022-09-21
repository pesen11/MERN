import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";
import { createLabel } from "../../../../services/labelService";
import BrandForm from "./brandFormComponent";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  title: "",
  link: "",
  status: "",
  type: "brand",
  image: "",
};

const BrandCreate = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createLabel(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/brand");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Brand" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <BrandForm handleSubmit={handleSubmit} defaultData={defaultValues} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCreate;
