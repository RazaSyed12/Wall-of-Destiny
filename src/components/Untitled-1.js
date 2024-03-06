import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import {useNavigate} from "react-router-dom";

function Profile() {
    let username = reactLocalStorage.get('username', "", true);
    const navigate = useNavigate();
    const [cust, setCust] = React.useState({})
    React.useEffect( ()=>{
        axios.post('http://localhost:8000/customer_profile', {
            username: username
        })
        .then((res)=>{
            setCust(res.data)
        })
    },[])

    // const formik = useFormik({
    //     initialValues: {
    //         username: username,
    //         password: "password",
    //         conta
    //     }
    // })

    const formik = useFormik({
        initialValues: {
            address: '',
            username: '',
            contact: '',
            password: '',
            name: '',
          },
          onSubmit: values =>{
            console.log("items down")
            axios.post('http://localhost:8000/Payment',{
                username: username,
                address: values.address, 
                contact: values.contact,
                name: values.name, 
                password: values.password
            })
            .then(function(res) {
                alert("changed Placed!");
                navigate("/profile");
                        
            })
            .catch(function(err) {
                console.log(err);
        })}
    })

    // const formik = useFormik({
    //     initialValues: {
    //       username: username,
    //       password: 'password',
    //       contact: '',
    //       address: '',
    //       name: '',

    //     },
    //     onSubmit: values => {
    //       // alert(JSON.stringify(values, null, 2));
    //       console.log('here')

    //       axios.post('http://localhost:8000/update_customer_info', {
    //         username: username, 
    //         password: values.password, 
    //         address: values.address, 
    //         contact: values.contact,
    //         name: values.name,
    //       })
    //       .then(function (response) {
    //         if(response.data==="Password should be greater than 5 characters"){
    //             alert("Password should be greater than 5 characters")
    //         }else{
    //             let obj = {
    //                 username: username, 
    //                 password: values.password, 
    //                 address: values.address, 
    //                 contact: values.contact,
    //                 name: values.name,
    //             }
    //             console.log(obj)
    //         // setCust(obj)
    //     }
            
    //       })
    //       .catch(function (error) {
    //         navigate('/error');
    //       });
    //     },
    //   });

    return (
        <div className="container" style={{ margin: "50px 150px", height:"50%", backgroundColor:"white", position:"relative", width:"100%"}}>
        <div className="row">
            <h1 style={{textAlign: "center"}}>{cust.username}'s Profile</h1>
        </div>

        <div className="row" style ={{ margin: "20px"}}>
            <Avatar
                alt="Remy Sharp"
                // src="https://via.placeholder.com/150"
                sx={{ width: 128, height: 128 }}>H</Avatar>
            <div className= "col" style ={{ margin: "50px"}}>
                <button type="button" className="btn btn-success btn-sm">Upload New Avatar</button>
            </div>
            
        </div>
        <form id ="form" onSubmit={formik.handleSubmit}>
        <div className="row">
        
            <div className="col">
            
        
                <label htmlFor="addressInput" className="form-label">House Address</label>
                <input className="form-control" type="text" id = "addressInput" name = "addressInput" onChange={formik.handleChange} value={formik.values.address}/>
                <br></br>
                <label htmlFor="contactInput" className="form-label">Contact</label>
                <input className="form-control" id = "contactInput" name ="contactInput" type="text" onChange={formik.handleChange} value={formik.values.contact}/>
                <br></br>
                <br></br>
            </div>

            <div className="col" style ={{ margin: "0 50px"}}>
            <label htmlFor="nameInput" className="form-label">Name</label>
            <input className="form-control" type="text" id = "nameInput" name= "nameInput" onChange={formik.handleChange} value={formik.values.name}/>
            <br></br>
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input className="form-control" type="password" id = "passwordInput" name = "passwordInput" onChange={formik.handleChange} value={formik.values.password}/>
            <br></br>

            <button type="submit" className="btn btn-success">Apply</button>
           
            
            <br></br>
            </div>
            <div className="col-4">
            <button type="button" className="btn btn-danger">Delete My Account</button>
            </div>
        </div>
        </form>
        </div>   
    )
}

export default Profile;