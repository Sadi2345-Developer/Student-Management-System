import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const StudentCard = ({ student, onDelete }) => {

  const navigate = useNavigate();

  if (!student) return null;
  // function that create confirmation pop-up
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${student.name}"`)) {
      onDelete(student._id);
    }
  }

  // function for routing the edit button
const handleEdit =() => navigate(`/edit/${student._id}`)

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '2.25rem' }}>{student.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {student.email}
        </Card.Subtitle>
        <Card.Text as="div">
          <div>
            <strong>Course:</strong>{student.course}
          </div>
          <div>
            <strong>City:</strong>{student.city}
          </div>
          <div>
            <strong>Marks:</strong>
            <Badge>{student.marks}</Badge>
          </div>
        </Card.Text>
        {/* {''} isko button ky agay use krny ka faida ya ha kay ya space create krta ha */}

        <Card.Footer className="text-muted pt-4 d-flex justify-content-between align-items-center">
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
