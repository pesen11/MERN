import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noImageFound from "../../../images/noImage.jpg";

const CardLayout = ({ data, type }) => {
  const handleError = (e) => {
    e.target.src = noImageFound;
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.image}
        onError={handleError}
        style={{ height: "150px", width: "150px" }}
        className="mx-auto my-auto"
      />
      <Card.Body>
        <Card.Title>
          {data.slug ? (
            <NavLink
              to={"/category/" + data.slug}
              style={{ textDecoration: "none", color: "black" }}
            >
              {data.title}
            </NavLink>
          ) : (
            <p>{data.title}</p>
          )}
        </Card.Title>
      </Card.Body>
    </Card>

    // <>
    //   <Card>
    //     <Card.Img
    //       variant="top"
    //       src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.image}
    //       onError={handleError}
    //       className="thumb-small"
    //     />
    //     <Card.Body>
    //       <Card.Title>
    //         {data.slug ? (
    //           <NavLink
    //             to={"/category/" + data.slug}
    //             style={{ textDecoration: "none", color: "black" }}
    //           >
    //             {data.title}
    //           </NavLink>
    //         ) : (
    //           <p>{data.title}</p>
    //         )}
    //       </Card.Title>
    //     </Card.Body>
    //   </Card>
    // </>
  );
};

export default CardLayout;
