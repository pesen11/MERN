import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Front } from "../pages/front";
import HomeLayout from "../pages/layout/homeLayout";
import AdminLayout from "../pages/layout/adminLayout";
import { AdminPages } from "../pages/cms/admin";
import store from "../store";
import { Provider, useDispatch } from "react-redux";
import { setUserDetail } from "../reducers/userReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//<></> cha vane tyo siddhai react fragment vayera basxa
//use layout when routes have similar components

const AdminPrivateRoute = ({ component }) => {
  // const component=props.component

  const dispatch = useDispatch();

  let localUser = JSON.parse(localStorage.getItem("auth_user")) ?? null;
  if (!localUser) {
    return <Navigate to="/login"></Navigate>;
  } else {
    let accessToken = localStorage.getItem("auth_token");
    if (!accessToken) {
      localStorage.removeItem("auth_user");
      return <Navigate to="/login"></Navigate>;
    } else {
      dispatch(setUserDetail(localUser));
      return component;
    }
  }

  /*
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [role, setRole] = useState();

  let navigate = useNavigate();
  const getUserVerification = async () => {
    try {
      let verifiedUser = await getVerified();
      setIsLoggedIn(true);
      setRole(verifiedUser.result.role[0]);
    } catch (err) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return navigate("/login");
    }
  };

  useEffect(() => {
    getUserVerification();
  });
  return isLoggedIn && role === "admin" ? component : <Navigate to={"/login"}></Navigate>;
  */
};
const RoutingComponent = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Front.HomePage />} />
              <Route path="login" element={<Front.LoginPage />} />

              <Route path="register" element={<Front.RegisterPage />} />
              <Route path="category/:slug" element={<Front.CategoryDetailPage />} />
              <Route path="product/:slug" element={<Front.ProductDetailPage />} />
              <Route path="*" element={<Front.ErrorPage />} />
            </Route>

            <Route path="/admin" element={<AdminPrivateRoute component={<AdminLayout />} />}>
              <Route index element={<AdminPages.AdminDashBoard />} />
              <Route path="banner" element={<AdminPages.BannerPage />}></Route>
              <Route path="banner/create" element={<AdminPages.BannerCreate />}></Route>
              <Route path="banner/:id" element={<AdminPages.BannerUpdate />}></Route>

              <Route path="brand" element={<AdminPages.BrandPage />}></Route>
              <Route path="brand/create" element={<AdminPages.BrandCreate />}></Route>
              <Route path="brand/:id" element={<AdminPages.BrandUpdate />}></Route>

              <Route path="category" element={<AdminPages.CategoryPage />}></Route>
              <Route path="category/create" element={<AdminPages.CategoryCreate />}></Route>
              <Route path="category/:id" element={<AdminPages.CategoryUpdate />}></Route>

              <Route path="user" element={<AdminPages.UserPage />}></Route>
              <Route path="user/create" element={<AdminPages.UserCreate />}></Route>
              <Route path="user/:id" element={<AdminPages.UserUpdate />}></Route>

              <Route path="product" element={<AdminPages.ProductPage />}></Route>
              <Route path="product/create" element={<AdminPages.ProductCreate />}></Route>
              <Route path="product/:id" element={<AdminPages.ProductUpdate />}></Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default RoutingComponent;
