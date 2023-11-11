import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import React from 'react'
import Login from "./Apppages/login";
import Signup from "./Apppages/signup";
import Courses from "./Apppages/courses";


export default function Approuter() {
  return (
   <>
   <Router>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/courses" element={<Courses/>} />

    </Routes>
   </Router>

   </>
  )
}
