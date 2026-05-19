import { useState, useEffect } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../Api/studentapi";

const COURSES = ["Mern stack", "React", "AI", "Web", "Graphic"];

const EditStudentPage = () => {
  // read the
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    marks: "",
    city: "",
  });

  // state for handling the error
  const [error, setError] = useState({});
  // hook to showing the message
  const [message, setMessage] = useState(null);

  // fetch the student saved data once the page load
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        //finally giving all data from database to hook
        setFormData({
          name: data.data.name,
          email: data.data.email,
          course: data.data.course,
          marks: data.data.marks,
          city: data.data.city,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudent();
  }, [id]);

  // fetch to capture every character of input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Pata lagao kis box mein kya likha gaya hai
    const updatedData = { ...formData, [name]: value }; // Purana data aur naya data merge karo
    setFormData(updatedData); // State update karo
    console.log("Current Form Data:", updatedData); // Console mein check karo (Debugging)
  };

  // function will run when we submit the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh honay se rokta hai (Very Important)
    try {
      // Backend API ko student ka data bhej raha hai
      await updateStudent(id, { ...formData });
      setMessage({ variant: "success", text: "Student data updated Successfully!" }); // Kamyabi ka message
      // redirecting the user into homepage
      setTimeout(() => navigate("/"), 2000); // Wapas Home/List page par le jata hai
    } catch (error) {
      setMessage({ variant: "danger", text: "Error updating student" }); // Agar koi masla ho jaye
    }
  };

  return (
    <div>
      <Container>
        <h1>Edit Student Record</h1>
        {message && <Alert variant={message.variant}>{message.text}</Alert>}
        {/* Form yahan se shuru hota hai */}
        <Form onSubmit={handleSubmit}>
          {/* Student Name wala field */}
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              value={formData.name}
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
              value={formData.email}
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
            <Form.Select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
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
              value={formData.city}
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
              value={formData.marks}
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
      </Container>
    </div>
  );
};
export default EditStudentPage;
