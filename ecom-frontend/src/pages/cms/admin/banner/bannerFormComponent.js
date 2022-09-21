import { Button, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const BannerForm = ({ handleSubmit, defaultData }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),

    link: Yup.string().required("Link is required"),

    status: Yup.string().required("Status is required"),
  });
  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);

      //API call
    },
  });

  useEffect(() => {
    if (defaultData) {
      formik.setValues(defaultData);
    }
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="title">
          <Form.Label className="col-sm-3">Title:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter a banner title."
              name="title"
              required={true}
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && <em className="text-danger">{formik.errors.title}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="link">
          <Form.Label className="col-sm-3">Link:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter a link."
              name="link"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
            {formik.errors.link && <em className="text-danger">{formik.errors.link}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="status">
          <Form.Label className="col-sm-3">Status:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              required
              onChange={formik.handleChange}
              size={"sm"}
              value={formik.values.status}
            >
              <option>--Select Any One</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
            {formik.errors.status && <em className="text-danger">{formik.errors.status}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="image">
          <Form.Label className="col-sm-3">Image:</Form.Label>
          <Col sm={3}>
            <Form.Control
              size="sm"
              type="file"
              placeholder="Upload an image ."
              name="image"
              required={true}
              onChange={(e) => {
                formik.setValues({ ...formik.values, image: e.target.files[0] });
              }}
            />
            {formik.errors.image && <em className="text-danger">{formik.errors.image}</em>}
          </Col>
          <Col sm={3}>
            {formik.values.image && typeof formik.values.image === "object" ? (
              <img
                className="img img-fluid"
                alt="banner.png"
                src={formik.values.image && URL.createObjectURL(formik.values.image)}
              />
            ) : (
              <img
                className="img img-fluid"
                alt="banner.png"
                src={process.env.REACT_APP_IMAGE_URL + "/label_image/" + formik.values.image}
              />
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="title">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button variant="danger" size="sm" type="reset" className="me-2">
              <i className="fa fa-trash"></i> Cancel
            </Button>
            <Button variant="success" size="sm" type="submit" className="me-2">
              <i className="fa fa-paper-plane"></i> Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default BannerForm;
