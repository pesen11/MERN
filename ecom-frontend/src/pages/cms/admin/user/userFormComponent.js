import { Button, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import Select from "react-select";

const UserForm = ({ handleSubmit, defaultData, edit }) => {
  let roles = [
    { value: "customer", label: "Buyer" },
    { value: "seller", label: "Seller" },
    { value: "admin", label: "Admin" },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short Name!")
      .max(50, "Too Long Name!")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long.")
      .required("Password is required."),
    role: Yup.object().nullable(),
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
      let sel_roles = defaultData.role.map((item) => {
        return {
          value: item,
          label: item === "customer" ? "Buyer" : item === "admin" ? "Admin" : "Seller",
        };
      });
      formik.setValues({
        ...defaultData,
        role: sel_roles,
        address_shipping_address: defaultData?.address?.shipping.address,
        address_shipping_house_no: defaultData?.address?.shipping.house_no,
        address_billing_address: defaultData?.address?.billing.address,
        address_billing_house_no: defaultData?.address?.billing.house_no,
      });
    }
    // console.log(defaultData);
  }, [defaultData]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="email">
          <Form.Label className="col-sm-3">Email:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter email."
              name="email"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.email}
              readOnly={edit}
            />
            {formik.errors.email && <em className="text-danger">{formik.errors.email}</em>}
          </Col>
        </Form.Group>
        {!edit && (
          <Form.Group className="row mb-3" controlId="password">
            <Form.Label className="col-sm-3">Password:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                size="sm"
                required={true}
                name="password"
                onChange={formik.handleChange}
              />
              {formik.errors.password && <em className="text-danger">{formik.errors.password}</em>}
            </Col>
          </Form.Group>
        )}

        <Form.Group className="row mb-3" controlId="name">
          <Form.Label className="col-sm-3">Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter a profile name."
              name="name"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && <em className="text-danger">{formik.errors.name}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="phone">
          <Form.Label className="col-sm-3">Phone:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Your number"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && <em className="text-danger">{formik.errors.phone}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="role">
          <Form.Label className="col-sm-3">Role:</Form.Label>
          <Col sm={9}>
            <Select
              options={roles}
              isMulti={true}
              required
              name="role"
              value={formik.values.role}
              onChange={(selectedOptions) => {
                console.log(selectedOptions);

                formik.setValues({ ...formik.values, role: selectedOptions });
              }}
            ></Select>
            {formik.errors.role && <em className="text-danger">{formik.errors.role}</em>}
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

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Shipping Address:</Form.Label>

          <Col sm={5}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter your shipping address."
              name="address_shipping_address"
              id="address_shipping_address"
              onChange={formik.handleChange}
              value={formik.values.address_shipping_address}
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
              value={formik.values.address_shipping_house_no}
            />
            {formik.errors.address_shipping_house_no && (
              <em className="text-danger">{formik.errors.address_shipping_house_no}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Billing Address:</Form.Label>
          <Col sm={5}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter your billing address."
              name="address_billing_address"
              id="address_billing_address"
              onChange={formik.handleChange}
              value={formik.values.address_billing_address}
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
              value={formik.values.address_billing_house_no}
              onChange={formik.handleChange}
            />
            {formik.errors.address_billing_house_no && (
              <em className="text-danger">{formik.errors.address_billing_house_no}</em>
            )}
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
              required={formik.values.image ? false : true}
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
                alt="user.png"
                src={formik.values.image && URL.createObjectURL(formik.values.image)}
              />
            ) : (
              <img
                className="img img-fluid"
                alt="user.png"
                src={process.env.REACT_APP_IMAGE_URL + "/users/" + formik.values.image}
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

export default UserForm;
