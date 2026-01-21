import { useState, useEffect } from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const API = "http://localhost:5000/api/tasks"

function App() {

  const [title, settitle] = useState("");
  const [task, settask] = useState([]);

  const fetchTask = async () => {
    const res = await axios.get(API)
    settask(res.data)
  }

  useEffect(() => {
    fetchTask();
  }, [])

  const addTask = async () => {
    if (!title.trim()) {
      return alert("enter title...")
    }


    await axios.post(API, { title });

    settitle("")
    fetchTask();
  };


 const toggleTask = async (id) => {
  await axios.put(`${API}/${id}`);
  fetchTask();
};

const deleteTask = async (id) => {
  await axios.delete(`${API}/${id}`);
  fetchTask();
};

  return (
    <>
      <Container className="py-5">
        <Card
          className="shadow-lg border-0 mx-auto align-content-center"
          style={{ maxWidth: "600px" }}
        >
          <Card.Body>
            <Card.Title className="text-center fs-2 fw-bold">
              Task Tracker
            </Card.Title>

            <div className="d-flex gap-2 mt-4">
              <Form.Control
                type="text"
                placeholder="Enter the task..."
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <Button onClick={addTask} variant="primary">
                Add
              </Button>
            </div>

            {/* Task List */}
            <ListGroup className="mt-4">
              {task.length === 0 ? (
                <p className="text-center mt-3 text-muted">No Task Found</p>
              ) : (
                task.map((task) => (
                  <ListGroup.Item
                    key={task._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task._id)}
                        className="form-check-input"
                      />

                      <span
                        className={`fw-semibold ${task.completed
                            ? "text-decoration-line-through text-muted"
                            : ""
                          }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default App
