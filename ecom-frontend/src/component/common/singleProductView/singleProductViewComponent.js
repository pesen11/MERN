import { Badge, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noImageFound from "../../../images/noImage.jpg";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addAnItemToCart } from "../../../reducers/cartReducer";
import { toast } from "react-toastify";

const SingleProductView = ({ data, type }) => {
  const handleError = (e) => {
    e.target.src = noImageFound;
  };

  let dispatch = useDispatch(); //reducer to events dispatch garna ko laagi
  let all_cart = useSelector((store) => {
    return store.cart.cartDetail;
  });

  const addCurrentProductToCart = () => {
    dispatch(addAnItemToCart({ product_id: data._id, qty: 1 })); //yo event dispatch hunxa
    toast.success("Cart updated succesfully");
  };

  // console.log("allCarts", all_cart);
  return (
    <>
      <Card>
        <div
          className="product-thumbnail"
          style={{
            backgroundImage: `url(${
              process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.images[0]
            })`,
          }}
        >
          <Card.Img
            variant="top"
            // src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.images[0]}
            onError={handleError}
            className="mx-auto my-auto"
            style={{ maxWidth: "298px" }}
          />
        </div>
        <Card.Body>
          <Card.Title className="h5">
            <p className="text-center" title={data.name}>
              {data.slug ? (
                <NavLink
                  to={"/" + type + "/" + data.slug}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {data.name.slice(0, 30) + "..."}
                </NavLink>
              ) : (
                <> {data.name.slice(0, 30) + "..."}</>
              )}
            </p>
          </Card.Title>

          <Card.Text>
            <NavLink to={"/category/" + data.category.slug}>
              <Badge pill bg="info">
                {data.category && data.category.title}
              </Badge>
            </NavLink>
          </Card.Text>

          <Card.Text className="h6 my-3">
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
          </Card.Text>

          <Button variant="warning" type="button" size="sm" onClick={addCurrentProductToCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleProductView;
