import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getProductByCategory } from "../../services/productService";
import { useEffect, useState } from "react";
import SingleProductView from "../../component/common/singleProductView/singleProductViewComponent";

const CategoryDetailPage = () => {
  const params = useParams(); //get parameter values

  const [products, setProducts] = useState();

  const getAllProductsByCategory = async () => {
    try {
      let all_cats_product = await getProductByCategory(params.slug);
      if (all_cats_product) {
        setProducts(all_cats_product.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProductsByCategory();
  }, []);
  return (
    <>
      <Container>
        {products && products.length ? (
          <>
            <Row className="mt-5">
              <Col>
                <h1 className="text-center">
                  Product Listing of <em>{products && products[0]["category"]["title"]}</em>
                </h1>
                <hr />
              </Col>
            </Row>

            <Row className="mt-3">
              {products &&
                products.map((item, index) => (
                  <Col sm={6} md={3} className="mt-3" key={index}>
                    <SingleProductView data={item} type={"product"} />
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          <>
            <Row className="mt-5">
              <Col>
                <h1 className="text-center">Category is empty!</h1>
                <hr />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CategoryDetailPage;
