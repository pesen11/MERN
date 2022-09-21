import { NavLink } from "react-router-dom";

const AdminSideBarComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  return (
    <>
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <NavLink className="nav-link" to={"/admin"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </NavLink>

            <NavLink className="nav-link" to={"/admin/banner"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-images"></i>
              </div>
              Banner
            </NavLink>

            <NavLink className="nav-link" to={"/admin/brand"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-b"></i>
              </div>
              Brand
            </NavLink>

            <NavLink className="nav-link" to={"/admin/category"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-sitemap"></i>
              </div>
              Category
            </NavLink>

            <NavLink className="nav-link" to={"/admin/user"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
              </div>
              Users
            </NavLink>

            <NavLink className="nav-link" to={"/admin/product"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              Product
            </NavLink>

            <a className="nav-link" href="index.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              Order
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {localUser.name}
        </div>
      </nav>
    </>
  );
};

export default AdminSideBarComponent;
