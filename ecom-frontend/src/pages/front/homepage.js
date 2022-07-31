// import "bootstrap/dist/css/bootstrap.min.css";

import { Carousel, Card, Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";

const HomePage = () => {
  let [banners, setBanners] = useState();
  let [brands, setBrands] = useState();

  let getAllBanners = () => {
    setBanners([
      {
        _id: "62e0c0859b505b18404400d2",
        title: "FirstBanner",
        image: "1658896517251-banner1.jpg",
        link: null,
        slug: "firstbanner",
        type: "banner",
        status: "active",
        createdAt: "2022-07-27T04:35:17.271Z",
        updatedAt: "2022-07-27T04:35:17.271Z",
        __v: 0,
      },
      {
        _id: "62e0c09a9b505b18404400d7",
        title: "SecondBanner",
        image: "1658896538969-banner2.jpg",
        link: null,
        slug: "secondbanner",
        type: "banner",
        status: "active",
        createdAt: "2022-07-27T04:35:38.975Z",
        updatedAt: "2022-07-27T04:35:38.975Z",
        __v: 0,
      },
      {
        _id: "62e0c0ce9b505b18404400e1",
        title: "ThirdBanner",
        image: "1658896590278-banner3.jpg",
        link: null,
        slug: "thirdbanner",
        type: "banner",
        status: "active",
        createdAt: "2022-07-27T04:36:30.287Z",
        updatedAt: "2022-07-27T04:36:30.287Z",
        __v: 0,
      },
    ]);
  };

  let getAllBrands = () => {
    setBrands([
      {
        _id: "62e0ca7fa7f39e9da27896e4",
        title: "Samsung",
        image: "1658899070994-samsung.png",
        link: null,
        slug: "samsung",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:17:51.020Z",
        updatedAt: "2022-07-27T05:17:51.020Z",
        __v: 0,
      },
      {
        _id: "62e0ca8ea7f39e9da27896e9",
        title: "Apple",
        image: "1658899086254-Apple_logo_black.png",
        link: null,
        slug: "apple",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:18:06.257Z",
        updatedAt: "2022-07-27T05:18:06.257Z",
        __v: 0,
      },
      {
        _id: "62e0caa5a7f39e9da27896ee",
        title: "Dell",
        image: "1658899109523-Dell_Logo.png",
        link: null,
        slug: "dell",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:18:29.527Z",
        updatedAt: "2022-07-27T05:18:29.527Z",
        __v: 0,
      },
      {
        _id: "62e0cab0a7f39e9da27896f3",
        title: "Lenovo",
        image: "1658899120826-lenovo-logo.png",
        link: null,
        slug: "lenovo",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:18:40.829Z",
        updatedAt: "2022-07-27T05:18:40.829Z",
        __v: 0,
      },
      {
        _id: "62e0cac1a7f39e9da27896f8",
        title: "Asus Rog",
        image: "1658904467515-asusrog.png",
        link: null,
        slug: "asusrog",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:18:57.642Z",
        updatedAt: "2022-07-27T05:18:57.642Z",
        __v: 0,
      },
      {
        _id: "62e0cacda7f39e9da27896fd",
        title: "Razer",
        image: "1658899149591-Razer_(2).png",
        link: null,
        slug: "razer",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:19:09.595Z",
        updatedAt: "2022-07-27T05:19:09.595Z",
        __v: 0,
      },
      {
        _id: "62e0caeba7f39e9da2789702",
        title: "HP",
        image: "1658899179286-2048px-HP_logo.png",
        link: null,
        slug: "hp",
        type: "brand",
        status: "active",
        createdAt: "2022-07-27T05:19:39.326Z",
        updatedAt: "2022-07-27T05:19:39.326Z",
        __v: 0,
      },
    ]);
  };

  useEffect(() => {
    getAllBanners();
    getAllBrands();
  }, []);

  return (
    <>
      <Carousel fade>
        {banners &&
          banners.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                height={344}
                width={988}
                src={
                  process.env.REACT_APP_BE_URL +
                  "Uploads/label_image/" +
                  item.image
                }
                alt="First slide"
              />
            </Carousel.Item>
          ))}
      </Carousel>
      <hr />
      <h4 className="text-center mt-4 mb-4">Brands</h4>
      <hr />
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
                  src={
                    process.env.REACT_APP_BE_URL +
                    "Uploads/label_image/" +
                    item.image
                  }
                  alt="myimg"
                ></img>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default HomePage;
