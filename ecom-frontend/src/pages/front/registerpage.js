import { Form, Button, Container, Row, Col } from "react-bootstrap";

const RegisterPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col
            sm={12}
            md={{
              offset: 3,
              span: 6,
            }}
          >
            <h4 className="text-center">Register Here</h4>
            <hr />
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>What is your email?</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Enter email."
                  name="email"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Enter your password.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>What should we call you?</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter a profile name."
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Please provide your phone number.</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Your number"
                  name="phone"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>
                  You may upload a profile picture if you like.
                </Form.Label>
                <Form.Control size="sm" type="file" name="image" />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Choose your role.</Form.Label>
                <Form.Select className="mb-2" size="sm">
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Where should we deliver your package?</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter your address."
                  name="address"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>What is your house number?</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter your house number."
                  name="house_n0"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
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
