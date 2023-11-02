import './App.css'
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/Header/Header'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './components/Contact/Contact';
import Course from './components/Course/Course';

function App() {

  const [xenonstack, setXenonstack] = useState(localStorage.getItem('xenonstack') || false);


  return (
    <>
     <Header xenonstack={xenonstack} setXenonstack={setXenonstack} />
     <ToastContainer />
     
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/signin' element={<Login setXenonstack={setXenonstack} />}/>
      <Route path='/contact' element={<Contact />} />
      <Route path='/course/:cid' element={<Course />} />
     </Routes>
     
     
    </>
  )
}

export default App
