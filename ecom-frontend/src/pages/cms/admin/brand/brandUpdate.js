import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";

import { updateLabel } from "../../../../services/labelService";
import BrandForm from "./brandFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getLabelById } from "../../../../services/labelService";
import { useCallback, useEffect, useState } from "react";

const defaultValues = {
  title: "",
  link: "",
  status: "",
  type: "brand",
  image: "",
};

const BrandUpdate = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [data, setData] = useState(defaultValues);

  const handleSubmit = async (data) => {
    try {
      // console.log("Final", data);

      let response = await updateLabel(data, params.id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/brand");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBrandDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getLabelById(id);
      // console.log(response);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getBrandDetail();
  }, [getBrandDetail]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Brand" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <BrandForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandUpdate;
