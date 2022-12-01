// import logo from './logo.svg';
// import {BrowerRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
      </Routes>
    </Router> */}
    <Signup/>
    <Login/>
    
    </>
  );
}

export default App;
