import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { AdminBreadCrumb } from "../../../component/cms/breadCrumbComponent";
import { AdminComponent } from "../../../component/cms";
import { useEffect, useState } from "react";
import { deleteLabelById, getLabelByType } from "../../../services/labelService";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../component/common/imageViewComponent";
import ActionButtons from "../../../component/common/actionButton";

const BannerPage = () => {
  const deleteBanner = async (id) => {
    try {
      let response = await deleteLabelById(id);
      if (response.status) {
        getAllLabels();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log("banner gone", id);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Link",
      selector: (row) => (
        <a href={row.link} className="btn-link">
          {row.link}
        </a>
      ),
    },
    {
      name: "Image",
      selector: (row) => (
        <ImageViewComponent src={"/label_image/" + row.image}></ImageViewComponent>
      ),
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
          onDeleteClick={deleteBanner}
          updatePath={"/admin/banner/" + row._id}
        />
      ),
    },
  ];
  const [data, setData] = useState();
  const getAllLabels = async () => {
    try {
      let result = await getLabelByType("banner");
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
    getAllLabels();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb
          createUrl={"/admin/banner/create"}
          type="Banner"
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

export default BannerPage;
