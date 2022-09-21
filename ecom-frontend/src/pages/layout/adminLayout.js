import "../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.css";
// import { FaPlus } from "react-icons/fa";
import "bootstrap";
import { Outlet } from "react-router-dom";
import { AdminComponent } from "../../component/cms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminComponent.TopNavComponent />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <AdminComponent.AdminSideBarComponent />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminComponent.AdminFooterComponent />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
