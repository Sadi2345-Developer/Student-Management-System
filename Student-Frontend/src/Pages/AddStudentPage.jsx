import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { addStudent } from "../Api/studentapi";
import { useNavigate } from "react-router-dom";

// Courses list for dropdown
const COURSES = ["Mern stack", "React", "AI", "Web", "Graphic"];

const AddStudentPage = () => {
  // State for all input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    city: "",
    marks: "",
  });

  const [message, setMessage] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    console.log("Current Form Data:", updatedData);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setMessage({ variant: "success", text: "Student data created Successfully!" });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage({ variant: "danger", text: "Error adding student" });
    }
  };

  return (
    <div>
      <div className="page-title-section">
        <h1>Add New Student</h1>
        <p className="subtitle">Fill in the details to register a new student</p>
      </div>

      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            {message && <Alert variant={message.variant}>{message.text}</Alert>}
            {/* Form starts here */}
            <Form onSubmit={handleSubmit}>
              {/* Student Name field */}
              <Form.Group className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Please enter your name
                </Form.Text>
              </Form.Group>

              {/* Email Address field */}
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  Please enter your valid email address
                </Form.Text>
              </Form.Group>

              {/* Course dropdown */}
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Select name="course" onChange={handleChange} required>
                  <option value="">Select a Course</option>
                  {COURSES.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* City field */}
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Marks field */}
              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="number"
                  name="marks"
                  placeholder="Enter Marks"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Save and Cancel buttons */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Save Student
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddStudentPage;
