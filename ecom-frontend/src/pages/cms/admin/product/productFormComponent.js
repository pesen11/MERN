import { Button, Col, Row, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getProducts } from "../../../../services/productService";
import { getLabelByType } from "../../../../services/labelService";
import Select from "react-select";
import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getUserByRole } from "../../../../services/userService";
import { getCategories } from "../../../../services/categoryService";

const ProductForm = ({ handleSubmit, defaultData }) => {
  let [all_cats, setAllCats] = useState();
  let [all_brands, setAllBrands] = useState();
  let [all_sellers, setAllSellers] = useState();

  let [loading, setLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),

    status: Yup.string().required("Status is required"),
  });
  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // if (values.brands) {
      //   values.brands = values.brands.map((item) => item.value);
      // }

      // console.log(values);
      handleSubmit(values);
      //API call
    },
  });

  const getAllCategories = async () => {
    try {
      let result = await getCategories();
      setAllCats(result.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(!loading);
    }
  };

  const getAllBrands = async () => {
    try {
      let response = await getLabelByType("brand");
      let brands = response.result.map((item) => {
        return {
          label: item.title,
          value: item._id,
        };
      });
      setAllBrands(brands);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(!loading);
    }
  };

  const getAllSellers = async () => {
    try {
      let all_users = await getUserByRole("seller");
      setAllSellers(all_users.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(!loading);
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllBrands();
    getAllSellers();
  }, [defaultData]);

  useEffect(() => {
    if (defaultData.name) {
      let data = defaultData;

      if (typeof defaultData["category"] === "string") {
        data.category = defaultData["category"];
      } else {
        data.category = defaultData["category"]["_id"];
      }

      if (typeof defaultData["brands"] === "object") {
        let brands = defaultData.brands;
        if (brands.title) {
          brands = { label: brands.title, value: brands._id };
        }
        data.brands = brands;
      }

      if (typeof defaultData["seller"] === "string") {
        data.seller = defaultData["seller"];
      } else {
        data.seller = defaultData["seller"]["_id"];
      }

      if (data.images) {
        data.image = data.images;
      }
      console.log(data);

      formik.setValues(data);
    }
  }, [defaultData, loading]);

  // console.log(formik.values);
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="row mb-3" controlId="name">
          <Form.Label className="col-sm-3">Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter a product name."
              name="name"
              required={true}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && <em className="text-danger">{formik.errors.name}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="description">
          <Form.Label className="col-sm-3">Description:</Form.Label>
          <Col sm={9}>
            <CKEditor
              editor={ClassicEditor}
              data={formik.values.description}
              name="description"
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setValues({ ...formik.values, description: data });
              }}
            />

            {formik.errors.description && (
              <em className="text-danger">{formik.errors.description}</em>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="price">
          <Form.Label className="col-sm-3">Price:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              placeholder="Enter a product price"
              name="price"
              min={0}
              required={true}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && <em className="text-danger">{formik.errors.price}</em>}
          </Col>
        </Form.Group>
        <Form.Group className="row mb-3" controlId="discount">
          <Form.Label className="col-sm-3">Discount(%):</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              placeholder="Enter a product discount"
              name="discount"
              min={0}
              max={98}
              step="any"
              required={true}
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
            {formik.errorsdiscounte && <em className="text-danger">{formik.errors.discount}</em>}
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

        <Form.Group className="row mb-3" controlId="category">
          <Form.Label className="col-sm-3">Category:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="category"
              required
              onChange={formik.handleChange}
              size={"sm"}
              value={formik.values.category}
            >
              <option>--Select Any One</option>
              {all_cats &&
                all_cats.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.title}
                  </option>
                ))}
              {/* <option value="active">Active</option>
              <option value="inactive">Inactive</option> */}
            </Form.Select>
            {formik.errors.category && <em className="text-danger">{formik.errors.category}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="brands">
          <Form.Label className="col-sm-3">Brands</Form.Label>
          <Col sm={9}>
            <Select
              name="brands"
              options={all_brands}
              onChange={(e) => {
                console.log(e);
                formik.setValues({
                  ...formik.values,
                  brands: e,
                });
              }}
              size={"sm"}
              value={formik.values.brands}
            >
              <option>--Select Any One</option>
              {all_cats &&
                all_cats.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.title}
                  </option>
                ))}
              {/* <option value="active">Active</option>
              <option value="inactive">Inactive</option> */}
            </Select>
            {formik.errors.brands && <em className="text-danger">{formik.errors.brands}</em>}
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3" controlId="seller">
          <Form.Label className="col-sm-3">Seller:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="seller"
              required
              onChange={formik.handleChange}
              size={"sm"}
              value={formik.values.seller}
            >
              <option>--Select Any One</option>
              {all_sellers &&
                all_sellers.map((item, key) => (
                  <option value={item._id} key={key}>
                    {item.name}
                  </option>
                ))}
              {/* <option value="active">Active</option>
              <option value="inactive">Inactive</option> */}
            </Form.Select>
            {formik.errors.seller && <em className="text-danger">{formik.errors.seller}</em>}
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
              multiple
              required={formik.values.image ? false : true}
              onChange={(e) => {
                formik.setValues({ ...formik.values, image: Object.values(e.target.files) });
              }}
            />
            {formik.errors.image && <em className="text-danger">{formik.errors.image}</em>}
          </Col>
        </Form.Group>
        <Row>
          {formik.values.image ? (
            formik.values.image.map((img, index) => (
              <Col sm={2} key={index}>
                {typeof img === "string" ? (
                  <img
                    className="img img-fluid img-thumbnail mb-3"
                    alt=""
                    src={process.env.REACT_APP_IMAGE_URL + "/product/" + img}
                  ></img>
                ) : (
                  <img
                    className="img img-fluid img-thumbnail mb-3"
                    alt=""
                    src={URL.createObjectURL(img)}
                  ></img>
                )}
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>

        <Form.Group className="row mb-3" controlId="is_featured">
          <Form.Label className="col-sm-3">Featured:</Form.Label>
          <Col sm={9}>
            <Form.Check
              size="sm"
              type="checkbox"
              label="Is Featured"
              name="is_featured"
              value={1}
              onChange={formik.handleChange}
              checked={formik.values.is_featured}
            />
            {formik.errors.is_featured && (
              <em className="text-danger">{formik.errors.is_featured}</em>
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

export default ProductForm;
