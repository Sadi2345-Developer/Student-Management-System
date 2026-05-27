import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student, onDelete }) => {
  const navigate = useNavigate();

  if (!student) return null;

  // function that creates confirmation pop-up
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${student.name}"`)) {
      onDelete(student._id);
    }
  }

  // function for routing the edit button
  const handleEdit = () => navigate(`/edit/${student._id}`)

  return (
    <Card className="student-card">
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2">
          {student.email}
        </Card.Subtitle>
        <Card.Text as="div">
          <div>
            <strong>Course:</strong> {student.course}
          </div>
          <div>
            <strong>City:</strong> {student.city}
          </div>
        </Card.Text>

        <Card.Footer className="d-flex justify-content-between align-items-center">
          <span>Marks: <Badge bg="primary">{student.marks}</Badge></span>
          <div>
            <Button variant="warning" size="sm" className="me-2" onClick={handleEdit}>Edit</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
