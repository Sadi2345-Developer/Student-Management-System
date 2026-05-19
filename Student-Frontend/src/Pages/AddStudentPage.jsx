import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { addStudent } from "../Api/studentapi";
import { useNavigate } from "react-router-dom";

// 1. Kurses (Courses) ki list jo dropdown mein nazar aaye gi
const COURSES = ["Mern stack", "React", "AI", "Web", "Graphic"];

const AddStudentPage = () => {
  // 2. State jo saaray input fields ka data aik object mein save karti hai
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    city: "",
    marks: "",
  });

  const [message, setMessage] = useState(null);

  // 3. Navigation ke liye hook (Aik page se doosray page janay ke liye)
  const navigate = useNavigate();

  // 4. Input fields mein typing ko capture karne wala function
  const handleChange = (e) => {
    const { name, value } = e.target; // Pata lagao kis box mein kya likha gaya hai
    const updatedData = { ...formData, [name]: value }; // Purana data aur naya data merge karo
    setFormData(updatedData); // State update karo
    console.log("Current Form Data:", updatedData); // Console mein check karo (Debugging)
  };

  // 5. Form submit honay par chalnay wala function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh honay se rokta hai (Very Important)
    try {
      // Backend API ko student ka data bhej raha hai
      await addStudent(formData);
      setMessage({ variant: "success", text: "Student data created Successfully!" }); // Kamyabi ka message
      // redirecting the user into homepage
      setTimeout(() => navigate("/"), 2000); // Wapas Home/List page par le jata hai
    } catch (error) {
      setMessage({ variant: "danger", text: "Error adding student" }); // Agar koi masla ho jaye
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">Add New Student</h2>
          {message && <Alert variant={message.variant}>{message.text}</Alert>}
          {/* Form yahan se shuru hota hai */}
          <Form onSubmit={handleSubmit}>
            {/* Student Name wala field */}
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
                Please enter your name.....
              </Form.Text>
            </Form.Group>

            {/* Email Address wala field */}
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
                Please enter your valid email address.....
              </Form.Text>
            </Form.Group>

            {/* Course select karne wala dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select name="course" onChange={handleChange} required>
                <option value="">Select a Course</option>
                {/* COURSES array se loop chala kar options banana */}
                {COURSES.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* City wala field */}
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

            {/* Marks wala field */}
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

            {/* Save aur Cancel ke buttons */}
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
  );
};

export default AddStudentPage;
