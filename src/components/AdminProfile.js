import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import { useFormik } from 'formik';

function AdminProfile() {
    let username = reactLocalStorage.get('adminUsername', "", true);
    const navigate = useNavigate();
    const [cust, setCust] = React.useState({

        username: username,
        password: 'password',
    })

    function deleteaccount() {
        axios.post('http://localhost:8000/deactivate_account_admin',{username: username})
            .then(function(res) {
                reactLocalStorage.remove('adminUsername');
                navigate("/12232OP43FF546TT765G768a53/435434234324253655756554/AdminLogin")
                alert("Changed password");                       
            })
            
    }

    function changepassword(e){
        let x = cust;
        x.password = e;
        setCust(x)
    }

    function done(){
        axios.post('http://localhost:8000/update_admin_info',cust)
            .then(function(res) {
                console.log(res)
                alert(res);                        
            })
            .catch(function(err) {
                console.log(err);
        })}

    return (
        <div className="container" style={{ margin: "50px 150px", height:"50%", backgroundColor:"white", position:"relative", width:"100%"}}>
        <div className="row">
            <h1 style={{/*textAlign: "center",*/ color: '#a7ac38', margin: '0% 50% 0% 35%'}}>My Profile</h1>
        </div>
        <div className="row" style ={{ margin: "20px"}}>
            <Avatar
                alt="Remy Sharp"
                // src="https://via.placeholder.com/150"
                sx={{ width: 128, height: 128 }}>H</Avatar>

            
        </div>
        
        <div className="row">
            <div className="col">
            
            
            <label for="passwordInput" className="form-label">Password</label>
            <input className="form-control" type="password" id = "passwordInput" name= "passwordInput" onChange={(e)=>{changepassword(e.target.value)}} placeholder="********"/>
            <br></br>
            <button type="button" onClick={done} className="btn btn-success">Apply</button>
            <br></br>
            </div>
            <div className="col-4">
            <button style = {{margin: '24px 0px 0px 0px'}}type="button" className="btn btn-danger" onClick={()=>{deleteaccount()}}>Delete My Account</button>
            </div>
        </div>
        </div>   
    )
}

export default AdminProfile;