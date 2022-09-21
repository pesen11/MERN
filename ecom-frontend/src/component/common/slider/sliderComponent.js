import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SliderComponent = ({ data, type }) => {
  return (
    <>
      <Carousel fade>
        {data &&
          data.map((item, index) => (
            <Carousel.Item key={index}>
              {item.link ? (
                <a href={item.link} target="_new">
                  <img
                    className="d-block w-100"
                    src={process.env.REACT_APP_BE_URL + "Uploads/" + type + "/" + item.image}
                    alt="First slide"
                  />

                  {item.title && (
                    <>
                      <Carousel.Caption>
                        <h3>{item.title}</h3>
                      </Carousel.Caption>
                    </>
                  )}
                </a>
              ) : (
                <>
                  <img
                    className="d-block w-100"
                    src={process.env.REACT_APP_BE_URL + "Uploads/" + type + "/" + item.image}
                    alt="First slide"
                  />

                  {item.title && (
                    <>
                      <Carousel.Caption>
                        <h3>{item.title}</h3>
                      </Carousel.Caption>
                    </>
                  )}
                </>
              )}
              <a href={item.link}></a>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default SliderComponent;
