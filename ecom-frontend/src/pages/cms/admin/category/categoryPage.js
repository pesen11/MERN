import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { AdminBreadCrumb } from "../../../component/cms/breadCrumbComponent";

import { AdminComponent } from "../../../../component/cms";
import { useEffect, useState } from "react";
import {
  deleteCategoryById,
  getCategories,
  getCategoryByType,
} from "../../../../services/categoryService";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/imageViewComponent";
import ActionButtons from "../../../../component/common/actionButton";

const CategoryPage = () => {
  const deleteCategory = async (id) => {
    try {
      let response = await deleteCategoryById(id);
      if (response.status) {
        getAllCategorys();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log("category gone", id);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Parent",
      selector: (row) => (row.parent_id ? row.parent_id.title : "-"),
    },

    {
      name: "Brand",
      selector: (row) => (row.brands ? row.brands.map((item) => item.title).join(",") : "-"),
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
          onDeleteClick={deleteCategory}
          updatePath={"/admin/category/" + row._id}
        />
      ),
    },
  ];
  const [data, setData] = useState();
  const getAllCategorys = async () => {
    try {
      let result = await getCategories();
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
    getAllCategorys();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb
          createUrl={"/admin/category/create"}
          type="Category"
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

export default CategoryPage;
