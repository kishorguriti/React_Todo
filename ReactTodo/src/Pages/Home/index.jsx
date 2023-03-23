import React, { useState, useEffect } from "react";
import Todotable from "../../Components/TodoTable";
import Button from "react-bootstrap/Button";
import environment from "../environment";
import { useNavigate } from "react-router-dom";
import { getTodoLength } from "../../Reducers/TodoReducer";
import { useDispatch } from "react-redux";
import GridTable from "../../Components/GridTable";
import ReactToPrint from "react-to-print";
import { useContext } from "react";
import { userContext } from "../../Context";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

function Home() {
  const dispatch = useDispatch();

  const componentRef = useRef();

  const tableRef = useRef(null);

  const { theme, setTheme } = useContext(userContext);

  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const navigatesTo = useNavigate();
  useEffect(() => {
    getBackendDta();
  }, []);

  function getBackendDta() {
    fetch(`${environment.api}/todos`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        console.log(res.length);
        dispatch(getTodoLength(res.length));
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeTheme() {
    // setShowTable(!showTable);    // as no need of Grid component i am not toggleing the table/grid view
    setTheme(!theme);
  }

  return (
    <>
      {showTable ? (
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="mx-5 mt-4"
            // onClick={() => setShowTable(!showTable)
            onClick={changeTheme}
            //}
          >
            Change Theme
          </Button>
          <ReactToPrint
            trigger={() => {
              return <Button className="mx-5 mt-4">Print</Button>;
            }}
            content={() => componentRef.current}
          />

          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={componentRef.current}
          >
            <Button variant="primary" className="mx-5 mt-4">
              Export excel
            </Button>
          </DownloadTableExcel>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            className="mx-5 mt-4"
            // onClick={() => setShowTable(!showTable)}
            onClick={changeTheme}
          >
            Show as Table
          </Button>
        </div>
      )}
      <div className="m-5 mt-3" ref={componentRef}>
        {showTable ? (
          <Todotable data={data} func={getBackendDta} />
        ) : (
          <GridTable data={data} func={getBackendDta} />
        )}
      </div>
    </>
  );
}

export default Home;
