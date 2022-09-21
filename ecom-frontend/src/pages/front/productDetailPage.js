import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import SliderComponent from "../../component/common/slider/sliderComponent";
import NumberFormat from "react-number-format";
import { useEffect, useState } from "react";
import SingleProductView from "../../component/common/singleProductView/singleProductViewComponent";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/productService";
import { dispatch, useDispatch } from "react-redux";
import { addAnItemToCart } from "../../reducers/cartReducer";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const params = useParams();
  let [data, setData] = useState();
  let [relatedProducts, setRelatedProducts] = useState();
  let [sliderData, setSliderData] = useState();
  let [qty, setQty] = useState(0);
  let dispatch = useDispatch();

  const getProduct = async () => {
    try {
      let response = await getProductBySlug(params.slug);
      if (response.result) {
        let images = response.result.detail.images;
        setData(response.result.detail);
        setRelatedProducts(response.result.related);
        let sliders = [];
        images.map((image) => {
          sliders.push({
            image: image,
            title: "",
          });
        });
        setSliderData(sliders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addCurrentProductToCart = (e) => {
    e.preventDefault();
    dispatch(
      addAnItemToCart({
        qty: +qty,
        product_id: data._id,
      })
    );
    toast.success("Product updated on your cart.");
  };

  useEffect(() => {
    getProduct();
  }, [params]);

  return (
    <>
      <Container className="mt-5">
        {data && (
          <>
            <Row>
              <Col sm={12} md={6}>
                <SliderComponent data={sliderData} type="product"></SliderComponent>
              </Col>

              <Col sm={12} md={6}>
                <Row className="mt-3">
                  <Col>
                    <h1 className="text-center">{data.name}</h1>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  {data.category && (
                    <Col sm={6} md={3}>
                      <Badge bg="info">{data.category.title}</Badge>
                    </Col>
                  )}

                  {data.brand && (
                    <Col sm={6} md={3}>
                      <Badge bg="success">{data.brands.title}</Badge>
                    </Col>
                  )}
                </Row>

                <Row className="mt-3">
                  <Col>
                    <small>{data.seller?.name}</small>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <NumberFormat
                      value={data.afterDiscount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Npr. "}
                    ></NumberFormat>
                    {data.afterDiscount && (
                      <del className="text-danger px-3">
                        <NumberFormat
                          value={data.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Npr. "}
                        />
                      </del>
                    )}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form onSubmit={addCurrentProductToCart}>
                      <Form.Group className="row mb-3">
                        <Col sm={12} md={6}>
                          <Form.Control
                            type="number"
                            name="qty"
                            required
                            placeholder="0"
                            min="0"
                            size="sm"
                            defaultValue={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          ></Form.Control>
                        </Col>

                        <Col sm={12} md={6} className="d-grid gap-2">
                          <Button variant="warning" type="submit" className="block" size="sm">
                            Add To Cart
                          </Button>
                        </Col>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col dangerouslySetInnerHTML={{ __html: data.description }}></Col>
            </Row>
            <hr />
            <Row>
              <Col sm={12}>
                <h1 className="text-center">Related Products</h1>
              </Col>
              <hr />
              {relatedProducts &&
                relatedProducts.map((item, index) => (
                  <Col key={index} sm={6} md={3} className="my-2">
                    <SingleProductView data={item} type="product"></SingleProductView>
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
export default ProductDetailPage;
