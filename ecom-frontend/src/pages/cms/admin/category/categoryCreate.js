import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";
import { createCategory } from "../../../../services/categoryService";
import CategoryForm from "./categoryFormComponent";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  title: "",
  status: "",
  brands: "",
  parent_id: "",
  image: "",
  show_in_homepage: "",
};

const CategoryCreate = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      let response = await createCategory(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/category");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Category" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <CategoryForm handleSubmit={handleSubmit} defaultData={defaultValues} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
