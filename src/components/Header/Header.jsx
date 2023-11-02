import { Link,useLocation } from "react-router-dom"
import "./header.css"
import { useState } from "react";
// import Hamberger from '../../assets/hamburger.svg';
const Header = ({ xenonstack,setXenonstack }) => {

  const logoutuser = ()=>{
    localStorage.removeItem('xenonstack');
    setXenonstack(false);
  }

  const location = useLocation();
  // console.log(location);

  return (
    <>
      <nav className="header">
        <div className="logo"><h2>Hello Course</h2></div>
          {/* <img src={Hamberger} id="ham" alt="" /> */}
        <div className="buttons">
          <Link to={'/'} className="btn">Home</Link>
          <Link to={'/contact'} className="btn">Contact Us</Link>
          {
            !xenonstack ? 
              location.pathname==='/signin' ? 
              <Link to={"/register"} className="btn">Sign up</Link> :
                <Link to={"/signin"} className="btn">Sign in</Link>
             : 
              <div to={'/logout'} onClick={logoutuser} className="btn">Logout <u>
                <b>{xenonstack.split('@')[0]}</b></u>
              </div>
          }


        </div>
      </nav>
    </>
  )
}

export default Header