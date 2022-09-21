// import "bootstrap/dist/css/bootstrap.min.css";

import { Carousel, Card, Row, Col, Container } from "react-bootstrap";
import { getLabelByType } from "../../services/labelService";

import { useEffect, useState } from "react";
import SliderComponent from "../../component/common/slider/sliderComponent";
import { NavLink } from "react-router-dom";
import CardLayout from "../../component/common/cardlayout/cardLayoutComponent";
import SingleProductView from "../../component/common/singleProductView/singleProductViewComponent";
import { getProducts } from "../../services/productService";

import noImageFound from "../../images/noImage.jpg";
import { getCategories } from "../../services/categoryService";

const HomePage = () => {
  let [banners, setBanners] = useState();
  let [brands, setBrands] = useState();
  let [cats, setCats] = useState();
  let [products, setProducts] = useState();

  let getAllBanners = async () => {
    let result = await getLabelByType("banner");
    if (result) {
      let all_active_banners = result.result.filter((item) => item.status === "active");
      setBanners(all_active_banners);
    }
  };

  let getAllBrands = async () => {
    let result = await getLabelByType("brand");
    if (result) {
      setBrands(result.result);
    }
  };

  let getAllCategories = async () => {
    let result = await getCategories();
    if (result) {
      let all_cats = result.result.filter(
        (item) => item.show_in_homepage === true && item.status === "active"
      );
      setCats(all_cats);
    }
  };

  let getAllProducts = async () => {
    let result = await getProducts();
    if (result.result) {
      let all_products = result.result.filter((item) => item.status === "active");
      setProducts(all_products);
    }
  };

  useEffect(() => {
    getAllBanners();
    getAllBrands();
    getAllCategories();
    getAllProducts();
    // console.log(products);
  }, []);

  return (
    <>
      <SliderComponent data={banners} type="label_image"></SliderComponent>
      <hr />
      <h4 className="text-center mt-4 mb-4">Brands</h4>
      <hr />
      <Container>
        <Row className="">
          {brands &&
            brands.map((item, index) => (
              <Col
                sm={6}
                md={{
                  offset: 0,
                  span: 3,
                }}
                key={index}
              >
                <Card style={{ width: "16rem" }} className="mb-2 ">
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>

                  <img
                    className="mx-auto my-auto"
                    height={150}
                    width={150}
                    src={process.env.REACT_APP_BE_URL + "Uploads/label_image/" + item.image}
                    alt="myimg"
                  ></img>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Container>
        <Row className="mt-3">
          <Col sm={12}>
            <h4 className="text-center">Categories</h4>
            <hr />
          </Col>
        </Row>

        <Row className="mt-4">
          {cats &&
            cats.map((item, index) => (
              <Col sm={6} md={2} key={index}>
                <CardLayout data={item} type="category"></CardLayout>
              </Col>
            ))}
        </Row>
      </Container>

      <Container>
        <Row className="my-5">
          <Col sm={12}>
            <h4 className="text-center">All Products</h4>
            <hr />
          </Col>
        </Row>

        <Row>
          {products &&
            products.map((item, index) => (
              <Col sm={6} md={3} className="mt-3" key={index}>
                <SingleProductView data={item} type={"product"} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
