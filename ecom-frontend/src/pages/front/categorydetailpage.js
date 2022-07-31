import { useParams } from "react-router-dom";

const CategoryDetailPage = () => {
  const params = useParams(); //get parameter values
  return <>{params.slug}</>;
};

export default CategoryDetailPage;
