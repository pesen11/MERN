import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AdminComponent } from "../../../../component/cms";

import { updateProduct } from "../../../../services/productService";
import ProductForm from "./productFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../../services/productService";
import { useCallback, useEffect, useState } from "react";

const defaultValues = {
  title: "",
  status: "",
  brands: "",
  parent_id: "",
  image: "",
  show_in_home: "",
};

const ProductUpdate = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [data, setData] = useState(defaultValues);

  const handleSubmit = async (data) => {
    try {
      // console.log("Final", data);

      let response = await updateProduct(data, params.id);
      if (response.status) {
        toast.success(response.msg);
        navigate("/admin/product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProductDetail = useCallback(async () => {
    try {
      let id = params.id;
      let response = await getProductById(id);
      // console.log(response);
      if (response.status) {
        setData(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    getProductDetail();
  }, [getProductDetail]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb type="Product" opt="Create" />

        <div className="card mb-4">
          <div className="card-body">
            <ProductForm handleSubmit={handleSubmit} defaultData={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
