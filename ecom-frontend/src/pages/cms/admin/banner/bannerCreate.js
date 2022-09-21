import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";
import { createLabel } from "../../../../services/labelService";
import BannerForm from "./bannerFormComponent";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  title: "",
  link: "",
  status: "",
  type: "banner",
  image: "",
};

const BannerCreate = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createLabel(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/banner");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Banner" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <BannerForm handleSubmit={handleSubmit} defaultData={defaultValues} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerCreate;
