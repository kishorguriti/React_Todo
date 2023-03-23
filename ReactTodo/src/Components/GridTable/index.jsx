// import React from "react";

// function GridTable() {
//   return <>i am from Grid</>;
// }

// export default GridTable;

import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConformModel from "../ConformModel";
import { useState } from "react";
import { useParams } from "react-router-dom";
import environment from "../../Pages/environment";
import { useContext } from "react";
import { userContext } from "../../Context";
import "./index.css";

function GridTable(props) {
  const navigatesTo = useNavigate();
  const mydata = props.data;

  //const { theme, setTheme } = useContext(userContext);

  const [deleteVerify, setDeleteVerify] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function gotoTodoEdit(id) {
    navigatesTo(`/todo/${id}`);
  }

  function deleteTodo(id) {
    setDeleteVerify(true);
    setDeleteId(id);
  }

  function verifyDelete(result) {
    if (!result) {
      let options = {
        method: "delete",
      };
      fetch(`${environment.api}/todos/${deleteId}`, options)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setDeleteVerify(false);
          props.func();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDeleteVerify(false);
    }
  }

  return (
    <div>
      <Table className="no-border darkbackground">
        <thead className="no-border">
          <tr className="no-border darkbackground">
            <th>#</th>
            <th>title</th>
            <th>completed</th>
            <th>target</th>
            <th>updatedAt</th>
            <th>createdAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="no-border darkbackground">
          {mydata.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.completed}</td>
              <td>{item.target}</td>
              <td>{item.updatedAt}</td>
              <td> {item.createdAt}</td>
              <td>
                <button
                  className="mx-2 bg-warning border-0 px-3"
                  onClick={() => gotoTodoEdit(item.id)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="mx-2 bg-danger border-0 px-3"
                  onClick={() => deleteTodo(item.id)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {deleteVerify && <ConformModel onClose={verifyDelete} />}
    </div>
  );
}

export default GridTable;
