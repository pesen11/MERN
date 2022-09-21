import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { AdminBreadCrumb } from "../../../component/cms/breadCrumbComponent";

import { AdminComponent } from "../../../../component/cms";
import { useEffect, useState } from "react";
import {
  deleteProductById,
  getProducts,
  getProductByType,
} from "../../../../services/productService";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/imageViewComponent";
import ActionButtons from "../../../../component/common/actionButton";
import NumberFormat from "react-number-format";

const ProductPage = () => {
  const deleteProduct = async (id) => {
    try {
      let response = await deleteProductById(id);
      if (response.status) {
        getAllProducts();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log("product gone", id);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      selector: (row) => (row.category ? row.category.title : "-"),
    },
    {
      name: "Price",
      selector: (row) => (
        <NumberFormat
          value={row.afterDiscount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Npr. "}
        ></NumberFormat>
      ),
    },
    {
      name: "Is Featured",
      selector: (row) => (row.is_featured ? "Yes" : "No"),
    },

    {
      name: "Brand",
      selector: (row) => (row.brands ? row.brands.title : "-"),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => (
        <ActionButtons
          id={row._id}
          onDeleteClick={deleteProduct}
          updatePath={"/admin/product/" + row._id}
        />
      ),
    },
  ];
  const [data, setData] = useState();
  const getAllProducts = async () => {
    try {
      let result = await getProducts();

      if (result.status) {
        setData(result.result);
      } else {
        toast.error(result.msg);
      }
      return result;
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb
          createUrl={"/admin/product/create"}
          type="Product"
          opt="Listing"
        />

        <Row>
          <Col sm={12}>
            <DataTable columns={columns} data={data} pagination />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
