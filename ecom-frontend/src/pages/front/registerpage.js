import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
  let roles = [
    { value: "customer", label: "Buyer" },
    { value: "seller", label: "Seller" },
  ];

  //data receive
  //data validate
  //data submission

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short Name!")
      .max(50, "Too Long Name!")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long.")
      .required("Password is required."),
    role: Yup.array()
      .min(1, "Atleast 1 role is required to be selected.")
      .required()
      .of(Yup.string(["seller", "customer"])),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: [],
      phone: "",
      address_shipping_address: "",
      address_shipping_house_no: "",
      address_billing_address: "",
      address_billing_house_no: "",
      image: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log(values);

      //API call
    },
  });

  // console.log(formik.values);
  return (
    <>
      <Container>
        <Row>
          <Col
            sm={12}
            md={{
              offset: 1,
              span: 9,
            }}
          >
            <h4 className="text-center">Register Here</h4>
            <hr />
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2 ">
                <Form.Label htmlFor="email">What is your email?</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Enter email."
                  name="email"
                  required={true}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && <em className="text-danger">{formik.errors.email}</em>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="password">Enter your password.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="sm"
                  required={true}
                  name="password"
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <em className="text-danger">{formik.errors.password}</em>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="name">What should we call you?</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter a profile name."
                  name="name"
                  required={true}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && <em className="text-danger">{formik.errors.name}</em>}
              </Form.Group>

              <Form.Group className="mb-2" controlId="phone">
                <Form.Label>Please provide your phone number.</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Your number"
                  name="phone"
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && <em className="text-danger">{formik.errors.phone}</em>}
              </Form.Group>

              <Form.Group className="mb-2" controlId="image">
                <Form.Label>You may upload a profile picture if you like.</Form.Label>
                <div className="row">
                  <Col sm={3}>
                    <Form.Control
                      size="sm"
                      type="file"
                      name="image"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        formik.setValues({ ...formik.values, image: file });
                      }}
                    />
                  </Col>
                  <Col sm={6}>
                    <div>
                      <img
                        src={formik.values.image && URL.createObjectURL(formik.values.image)}
                        alt="yourImage.png"
                        className="img"
                        height="200"
                      ></img>
                    </div>
                  </Col>
                </div>
              </Form.Group>
              <Form.Group className="mb-2" controlId="role">
                <Form.Label>Choose your role.</Form.Label>

                <Select
                  options={roles}
                  isMulti={true}
                  required
                  name="role"
                  onChange={(selectedOptions) => {
                    let roles = [];
                    selectedOptions.forEach((item) => {
                      roles.push(item.value);
                    });
                    formik.setValues({ ...formik.values, role: roles });
                  }}
                ></Select>
                {formik.errors.role && <em className="text-danger">{formik.errors.role}</em>}
              </Form.Group>

              <Form.Group className="row mb-2">
                <Form.Label>Where should we ship your package?</Form.Label>
                <Col sm={5}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter your shipping address."
                    name="address_shipping_address"
                    id="address_shipping_address"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address_shipping_address && (
                    <em className="text-danger">{formik.errors.address_shipping_address}</em>
                  )}
                </Col>
                <Col sm={4}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter your house number."
                    name="address_shipping_house_no"
                    id="address_shipping_house_no"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address_shipping_house_no && (
                    <em className="text-danger">{formik.errors.address_shipping_house_no}</em>
                  )}
                </Col>
              </Form.Group>

              <Form.Group className="row mb-2">
                <Form.Label>Please provide billing address.</Form.Label>
                <Col sm={5}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter your billing address."
                    name="address_billing_address"
                    id="address_billing_address"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address_billing_address && (
                    <em className="text-danger">{formik.errors.address_billing_address}</em>
                  )}
                </Col>
                <Col sm={4}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter your house number."
                    name="address_billing_house_no"
                    id="address_billing_house_no"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address_billing_house_no && (
                    <em className="text-danger">{formik.errors.address_billing_house_no}</em>
                  )}
                </Col>
              </Form.Group>

              <Button variant="success" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { RegisterPage };
