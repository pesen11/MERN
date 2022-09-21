import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
// import { AdminBreadCrumb } from "../../../component/cms/breadCrumbComponent";

import { AdminComponent } from "../../../../component/cms";
import { useEffect, useState } from "react";
import { deleteUserById, getUserByRole } from "../../../../services/userService";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/imageViewComponent";
import ActionButtons from "../../../../component/common/actionButton";

const UserPage = () => {
  const deleteUser = async (id) => {
    try {
      let response = await deleteUserById(id);
      if (response.status) {
        getAllUsers();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log("user gone", id);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Role",
      selector: (row) => row.role.join(","),
    },

    {
      name: "Image",
      selector: (row) => (
        <ImageViewComponent src={"/users/" + row.image} width="50px"></ImageViewComponent>
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
          onDeleteClick={deleteUser}
          updatePath={"/admin/user/" + row._id}
        />
      ),
    },
  ];
  const [data, setData] = useState();
  const getAllUsers = async () => {
    try {
      let result = await getUserByRole("all");
      if (result.status) {
        let logged_in = JSON.parse(localStorage.getItem("auth_user"));
        let all_users = result.result.filter((item) => item._id !== logged_in._id);
        setData(all_users);
      } else {
        toast.error(result.msg);
      }
      return result;
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="container-fluid px-4">
        <AdminComponent.AdminBreadCrumb
          createUrl={"/admin/user/create"}
          type="User"
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

export default UserPage;
