import { useState, useEffect } from "react";
import { deleteStudent, getAllStudents } from "../Api/studentapi";
import StudentCard from "../Components/StudentCards";
import { Container, Alert } from "react-bootstrap";

const HomePage = () => {
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
      setMessage({ text: data.message, variant: 'success' })
    } catch (err) {
      setMessage({ text: 'Could not delete the student', variant: 'danger' })
    }
    // hiding a message after 4 seconds
    setTimeout(() => setMessage(null), 4000)
  };

  return (
    <div>
      {/* Page Title - shown only once */}
      <div className="page-title-section">
        <h1>All Students</h1>
        <p className="subtitle">Manage and view all student records</p>
      </div>

      {message && (
        <Container>
          <Alert variant={message.variant}>{message.text}</Alert>
        </Container>
      )}

      <Container className="mt-2 mb-5">
        {/* condition if there is no student data */}
        {students && students.length === 0 ? (
          <div className="empty-state">
            <p>No students data found</p>
          </div>
        ) : (
          <div className="student-cards-grid">
            {students && students.map(s => (
              <StudentCard key={s._id} student={s} onDelete={handledelete} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
};

export default HomePage;
