import { Outlet } from "react-router-dom";
import MenuComponent from "../../front/MenuComponent";

const HomeLayout = () => {
  return (
    <>
      <MenuComponent></MenuComponent>
      <Outlet />
    </>
  );
};

export default HomeLayout;
