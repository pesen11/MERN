import { Outlet } from "react-router-dom";
import MenuComponent from "../../front/MenuComponent";
import "../../assets/css/home.css";
import { useDispatch } from "react-redux";
import { syncLocalCart } from "../../reducers/cartReducer";

const HomeLayout = () => {
  let dispatch = useDispatch();
  dispatch(syncLocalCart());
  return (
    <>
      <MenuComponent></MenuComponent>
      <Outlet />
    </>
  );
};

export default HomeLayout;
