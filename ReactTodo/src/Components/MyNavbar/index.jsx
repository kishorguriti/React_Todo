import React from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function MyNavbar() {
  //const [todosLength, setTodoLength] = useState("");
  // let totalTodos = localStorage.getItem("todoCount");
  // setTodoLength(todosLength);
  const todoLength = useSelector((state) => state.todoLength.value);

  return (
    <Navbar bg="warning" className="nav-style text-white" expand="lg">
      <Navbar.Brand className="ms-5" as={NavLink} to="/">
        My Todoapp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/todo" className="me-5">
            Todo
            <Badge pill variant="danger" className="ms-1">
              {todoLength}
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
