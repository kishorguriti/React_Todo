import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { date } from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import environment from "../environment";
import { useFormik } from "formik";
import * as Yup from "yup";

function Todo() {
  const initialvalues = {
    title: "",
    completed: "",
    target: "",
    updatedAt: "",
    createdAt: "",
  };

  //

  const params = useParams();
  console.log(params.id);
  const id = params.id;

  const [todoTitle, setTodoTitle] = useState("");
  // const [todo, setTodo] = useState(initialvalues);
  const [time, setTime] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const updatedate = new Date();
  const [Todoerror, setTodoError] = useState(false);
  const [todoErrorMsg, setTodoErrorMsg] = useState("");
  const [check, setCheck] = useState(false);

  let createdate;
  let x;

  const userInput = {
    title: todoTitle,
    completed: taskStatus,
    target: time,
    updatedAt: updatedate,
    // createdAt: createdate,
  };
  const navigatesTo = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`${environment.api}/todos/${id}`, {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setTodoTitle(res.title);
          if (res.completed === "Done") {
            setCheck(true);
          }
          setTime(res.target);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // put and post

  function handleSubmit(event) {
    event.preventDefault();

    if (todoTitle.length === 0) {
      setTodoError(true);
      setTodoErrorMsg("* Required");
      return;
    }
    if (todoTitle.length <= 3) {
      setTodoError(true);
      setTodoErrorMsg("Title must be more than 3 characters");
      return;
    }

    if (!id) {
      //post
      createdate = new Date();
      userInput.createdAt = createdate;

      fetch(`${environment.api}/todos`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInput),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          navigatesTo("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //put
      userInput.createdAt = "2023-03-14T05:45:07.174Z"; // default time
      // userInput.createdAt = created;    stored in a state
      fetch(`${environment.api}/todos/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInput),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          navigatesTo("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function Checkbox(e) {
    console.log(e.target.checked);

    if (e.target.checked) {
      setTaskStatus("Done");
      setCheck(true);
    } else {
      setTaskStatus("pending");
      setCheck(false);
    }
  }

  return (
    <Container className="my-5 w-75">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <Form.Text className="text-muted">
            {Todoerror && todoTitle.length < 4 ? (
              <p className="text-danger">{todoErrorMsg} </p>
            ) : (
              ""
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={check}
            onChange={(e) => Checkbox(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Target</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Todo;
