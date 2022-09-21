import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";

import { updateCategory } from "../../../../services/categoryService";
import CategoryForm from "./categoryFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../../../services/categoryService";
import { useCallback, useEffect, useState } from "react";

const defaultValues = {
  title: "",
  status: "",
  brands: "",
  parent_id: "",
  image: "",
  show_in_homepage: "",
};

const CategoryUpdate = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [data, setData] = useState(defaultValues);

  const handleSubmit = async (data) => {
    try {
      // console.log("Final", data);

      let response = await updateCategory(data, params.id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getCategoryById(id);
      // console.log(response);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getCategoryDetail();
  }, [getCategoryDetail]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Category" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryUpdate;
