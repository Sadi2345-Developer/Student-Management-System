import { useState, useEffect } from "react";
import { deleteStudent, getAllStudents } from "../Api/studentapi";
import StudentCard from "../Components/StudentCards";
import { Row, Col, Container, Alert } from "react-bootstrap";

const HomePage = () => {
  // UseState hook is used for initialization and updation
  // defining the hooks
  // useState for getting all the students data
  const [students, setStudents] = useState([]);
  // state for handling the loading
  const [loading, setLoading] = useState(false);
  // state for handling the error
  const [error, setError] = useState(null);
  // hook to showing the messages
  const [message, setMessage] = useState(null);

  // function to get all students data
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllStudents();
      console.log("Fetched Students Data:", data);
      // passing the data to hook useState
      setStudents(data);
    } catch (error) {
      setError("could not find Student!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // using useEffect to render the data automatically
  useEffect(() => {
    fetchStudents();
  }, []);

  // creating a function to delete the student
  const handledelete = async (id) => {
    try {
      const data = await deleteStudent(id);
      // after deleting the data , now we need to filter the data
      setStudents(prev => prev.filter(s => s._id !== id))
      // showing the success message the student is deleted
      // controller.js ki file m jo message ka variable likha tha vo use hoa idr
      setMessage({ text: data.message })
    } catch (err) {
      setMessage({ text: 'COuld not delete the student' })
    }
    // hiding a message after 4 seconds
    setTimeout( () => setMessage(null, 4000))
  };

  return (
<div>
  <h1>All Students Data</h1>
  {
    message && (
      <Alert variant={message.success}>{message.text}</Alert>
    )
  }


    <Container className="mt-4">
      <h1>All Students Data</h1>

      {/* condition if there is no student data */}
      {students && students.length === 0 ? (
        <p>No students data found</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {students && students.map(s => (
            <Col key={s._id}>
              <StudentCard student={s} onDelete={handledelete} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </div>
  )
};

export default HomePage;
