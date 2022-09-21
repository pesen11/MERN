import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";
import { createProduct } from "../../../../services/productService";
import ProductForm from "./productFormComponent";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
  seller: "",
  status: "inactive",
  brands: "",
  category: "",
  image: "",
  is_featured: false,
};

const ProductCreate = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      // console.log(data);
      if (data.brands) {
        // console.log(data.brands.value);
        data.brands = data.brands.value;
      }

      let response = await createProduct(data);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/product");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Product" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <ProductForm handleSubmit={handleSubmit} defaultData={defaultValues} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
