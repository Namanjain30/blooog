import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Nprovider } from "./Context/Namecontext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Createpost from "./Components/Createpost";
import About from "./Components/About";
// import Contact from "./Components/Contact";
import Detail from "./Components/Detail";
import Update from './Components/Update'
import { Allprovider } from "./Context/Allcontex";

function App() {
  const [isautro, setisautro] = useState("false");

  const Provideroute = ({ isautro }) => {
    return isautro === "true" ? (
      <>
        <Header />
        <Outlet />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };

  return (
    <Allprovider>
      <Nprovider>
      <Router>
        <Routes>
          <Route path="/" element={<Provideroute isautro={isautro} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/create" element={<Provideroute isautro={isautro} />}>
            <Route path="/create" element={<Createpost />} />
          </Route>
          <Route path="/about" element={<Provideroute isautro={isautro} />}>
            <Route path="/about" element={<About />} />
          </Route>
          
          <Route path="/detail/:id" element={<Provideroute isautro={isautro} />}>
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
          <Route path="/update/:id" element={<Provideroute isautro={isautro} />}>
            <Route path="/update/:id" element={<Update/>} />
          </Route>
          <Route path="/login" element={<Login setisautro={setisautro} />} />
        </Routes>
      </Router>
    </Nprovider>
    </Allprovider>
  );
}

export default App;
