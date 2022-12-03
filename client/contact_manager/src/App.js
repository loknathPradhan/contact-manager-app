<<<<<<< HEAD
// import logo from './logo.svg';
// import {BrowerRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
=======
import React from "react";
>>>>>>> 5cf9a2adc54a15da77f013604c5cea399529a342

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ImportUI from "./import/ImportUI";
import { AuthProvider } from "../src/useauth/Useauth";
import Signup from "./signup/Signup";
import Login from "./login/Login";
function App() {
  return (
<<<<<<< HEAD
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
      </Routes>
    </Router> */}
    <Signup/>
    <Login/>
    
    </>
=======
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/contact"
          element={
            <AuthProvider>
              <ImportUI />
            </AuthProvider>
          }
        />
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
>>>>>>> 5cf9a2adc54a15da77f013604c5cea399529a342
  );
}

export default App;
