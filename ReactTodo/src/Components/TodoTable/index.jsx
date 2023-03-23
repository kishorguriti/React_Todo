import React from "react";
//import { Table } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import ConformModel from "../ConformModel";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTodoLength } from "../../Reducers/TodoReducer";
import environment from "../../Pages/environment";
import "./index.css";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

//
import { useContext } from "react";
import { userContext } from "../../Context";

import { useEffect } from "react";
function Todotable(props) {
  useEffect(() => {
    AllMyData();
  }, []);

  const [MybData, setMybdata] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const mydata = props.data;
  // console.log(mydata); // this is array
  const navigatesTo = useNavigate();
  const dispatch = useDispatch();

  const [deleteVerify, setDeleteVerify] = useState(false);

  const { theme, setTheme } = useContext(userContext);
  const style = theme && "dark";

  function gotoTodoEdit(id) {
    navigatesTo(`/todo/${id}`);
  }

  function deleteTodo(id) {
    setDeleteVerify(true);
    setDeleteId(id);
  }

  function AllMyData() {
    fetch(`${environment.api}/todos`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setMybdata(res);
        dispatch(getTodoLength(res.length));
      });
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MybData.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function OnSearch(event) {
    let text = event.target.value;
    console.log(text);

    if (!text) {
      AllMyData();
    } else {
      let filterd = MybData.filter((todo) => {
        return todo.title.toLowerCase().includes(text.toLowerCase());
      });
      setMybdata(filterd);
      console.log(filterd);

      if (filterd.length <= 5) {
        setRowsPerPage(5);
        setPage(0);
      }
    }
  }
  // console.log(MybData);
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
          // props.func();
          AllMyData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDeleteVerify(false);
    }
  }

  //

  //
  return (
    //<>
    // <div>
    //   <Table striped bordered hover>
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>title</th>
    //         <th>completed</th>
    //         <th>target</th>
    //         <th>updatedAt</th>
    //         <th>createdAt</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {mydata.map((item, index) => (
    //         <tr key={item.id}>
    //           <td>{index + 1}</td>
    //           <td>{item.title}</td>
    //           <td>{item.completed}</td>
    //           <td>{item.target}</td>
    //           <td>{item.updatedAt}</td>
    //           <td> {item.createdAt}</td>
    //           <td>
    //             <button
    //               className="mx-2 bg-warning border-0 px-3"
    //               onClick={() => gotoTodoEdit(item.id)}
    //             >
    //               <i className="bi bi-pencil-square"></i>
    //             </button>
    //             <button
    //               className="mx-2 bg-danger border-0 px-3"
    //               onClick={() => deleteTodo(item.id)}
    //             >
    //               <i className="bi bi-trash3"></i>
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>

    //   {deleteVerify && <ConformModel onClose={verifyDelete} />}
    // </div>
    //</>

    <>
      <input placeholder="Enter Title" fontSize="small" onChange={OnSearch} />
      <div className="table-responsive">
        <Table
          className={`${style}`}
          sx={{ minWidth: 500, marginTop: "10px" }}
          aria-label="custom pagination table"
        >
          <TableHead className="bg-info">
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>title</TableCell>
              <TableCell align="left">status</TableCell>
              <TableCell align="left">target</TableCell>

              <TableCell align="left">Updated At</TableCell>
              <TableCell align="left">created At</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? MybData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : MybData
            ).map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className={`${style}`} component="th" scope="row">
                  {todo.id}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  {todo.title}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  {todo.completed}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  {todo.target}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  {todo.updatedAt}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  {todo.createdAt}
                </TableCell>
                <TableCell className={`${style}`} align="left">
                  <EditIcon
                    fontSize="small"
                    className="ms-3"
                    onClick={() => gotoTodoEdit(todo.id)}
                  />
                  <DeleteIcon
                    fontSize="small"
                    className="ms-3"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} className={`${style}`} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter className={`${style}`}>
            <TableRow className={`${style}`}>
              <TablePagination
                className={`${style}`}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={MybData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>

        {deleteVerify && <ConformModel onClose={verifyDelete} />}
      </div>
    </>
  );
}

export default Todotable;
