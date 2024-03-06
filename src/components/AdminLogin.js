 import React from 'react'
import './Login.css'
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";



function Login() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      axios.post('http://localhost:8000/loginAdmin', {
        username: values.username,
        password: values.password
      })
      .then(function (response) {
        if(response.data === "In kara isko")
        {
          reactLocalStorage.set('adminUsername',values.username);
          navigate('/adminHome');
        }
        else
        {
          alert("Incorrect Fields");
        }
        
      })
      .catch(function (error) {
        console.log(error);
        navigate('/error');
      });
    },
  });

  return (
    <div style={{ height: '195%' }}>
    <div className="split left">
    <div class="centered">
      <img style ={{width:"110vh",height:"100vh"}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUpZbDo4CyRqjJD_lTxD1zLpgmcMA1te95cA&usqp=CAU' alt="Avatar woman"/>
    </div>

    <div className="split right">
    <div className="centered">
    
    <form id = "login_form" onSubmit={formik.handleSubmit} style={{width: '400px', height: '500px', overflow: 'hidden', margin: '200px 0 0px 0px', padding: '20px', background: 'white'}} >
          <h2 style={{margin:"0 0 30px 0",textAlign:'left'}}>Sign In</h2>
      
          <div className="form-group">
              <input type="text" className="form-control" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} placeholder="Username" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:""}}/>
          </div>
          <div className="form-group">
              <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" style={{width: '400', height: '40px', paddingLeft: '8px', backgroundColor:"white"}}/>
          </div>
          <a href="#" style={{color: '#a7ac38',textAlign:'right'}}><p>Forgot password?</p></a>
          <br></br>
          <button type="submit" id="log" className="btn" style={{width:"100px",display: "block", margin: '0 auto', textAlign: 'center',backgroundColor:"#a7ac38"}}>SIGN IN</button>
          <br></br>
      </form>    
    </div>
    </div>
    </div>
    </div>
  )
}

export default Login