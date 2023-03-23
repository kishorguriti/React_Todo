import logo from "./logo.svg";
import "./App.css";
import MyNavbar from "./Components/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import Nopage from "./Pages/Nopage";
// import { useContext } from "react";
import { userContext } from "./Context";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <userContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
