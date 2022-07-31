import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Front } from "../pages/front";
import HomeLayout from "../pages/layout/homeLayout";
import AdminLayout from "../pages/layout/adminLayout";
import { AdminPages } from "../pages/cms/admin";

//<></> cha vane tyo siddhai react fragment vayera basxa
//use layout when routes have similar components

const AdminPrivateRoute = ({ component }) => {
  // const component=props.component
  let isLoggedIn = true;
  let role = "admin";
  return isLoggedIn && role === "admin" ? (
    component
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
};
const RoutingComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Front.HomePage />} />
            <Route path="login" element={<Front.LoginPage />} />

            <Route path="register" element={<Front.RegisterPage />} />
            <Route
              path="category/:slug"
              element={<Front.CategoryDetailPage />}
            />
            <Route path="*" element={<Front.ErrorPage />} />
          </Route>

          <Route
            path="/admin"
            element={<AdminPrivateRoute component={<AdminLayout />} />}
          >
            <Route index element={<AdminPages.AdminDashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutingComponent;
