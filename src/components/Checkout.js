import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import { useFormik } from 'formik';


function Checkout() {
    const location = useLocation();
    const x  = location.state;
    const navigate = useNavigate();
    let username = reactLocalStorage.get('username', "", true);
    const [total, setTotal] = React.useState(x)
    const [discount, setDiscount] = React.useState(1)

    const formik = useFormik({
        initialValues: {
          code: '',
        },
        onSubmit: values => {
          // alert(JSON.stringify(values, null, 2));
          axios.post('http://localhost:8000/DiscountCust', {
            username: username, 
            promocode: values.code,
          })
          .then(function (response) {
            if(response.data.discount < 1 )
            {
                console.log(response.data.discount);
                setDiscount(response.data.discount);
                setTotal(Math.round(total*discount));           
            }
            else
            {
              alert("Invalid Promo-code");
            }
            
          })
          .catch(function (error) {
            navigate('/error');
          });
        },
      });

    const confirm = useFormik({
        initialValues: {
            address: '',
            contact: '',
          },
          onSubmit: values =>{
            console.log("items down")
            console.log(location.items)
            axios.post('http://localhost:8000/Payment',{
                username: username,
                total: total, 
                discount: discount,
                address: values.address, 
                contact: values.contact
            })
            .then(function(res) {
                alert("Order Placed!");
                navigate("/");
                        
            })
            .catch(function(err) {
                console.log(err);
        })}
    })

    return (
        <div className="row">
            <h2 style={{textAlign: "center", margin:"50px 100px 0px -35px"}}>Checkout</h2>
            <div className="col-sm-3" style={{textAlign: "center", padding: '2cm', margin:"0px 0px 0cm 30%"}}>
                <div className="card" style={{width: "400px", outline: "3px ridge grey", height:"400px"}}>
                <h4><b>Bill: </b>{total} PKR</h4>
                <h5><b>Enter Valid Promocode</b></h5>
                <form id="confirm" onSubmit={confirm.handleSubmit}> 
                <form className="row" id="promocode" onSubmit={formik.handleSubmit}>
                    <div class="form-group" style={{margin:"0px 0px 20px 0px"}}>
                    <input type="text" class="form-control" name="code" id="code" onChange={formik.handleChange} value={formik.values.code} placeholder="GhabranaNahi30" style={{margin:"0px 0px 0px 20px", display: "inline", width:"150px", border: 'none', borderRadius: '3px', paddingLeft: '18px'}}/>
                    <button type="submit" id="log" className="btn btn-dark" style={{display: "inline", margin: '0 auto', textAlign: 'center'}}>Verify</button>
                    </div>
                </form>
                
                <div class="form-group" style={{margin:"0px 0px 20px 0px"}}>
                    <label htmlFor="email">Address</label>
                    <input type="text" className="form-control" name="address" id="address" onChange={confirm.handleChange} value={confirm.values.address} placeholder="House, Street, Area, City, Province" style={{margin:"0px 0px 0px 20px",width: '350px', height: '30px', border: 'none', borderRadius: '3px', paddingLeft: '18px'}}/>
                </div>
                <div class="form-group" style={{margin:"0px 0px 20px 0px"}}>
                    <label htmlFor="email">Phone Number</label>
                    <input type="text" className="form-control" name="contact" id="contact" onChange={confirm.handleChange} value={confirm.values.contact} placeholder="+92-XXX-XXXXXXX" style={{margin:"0px 0px 0px 20px", width: '350px', height: '30px', border: 'none', borderRadius: '3px', paddingLeft: '18px'}}/>
                </div>
                <button type="submit" onClick={()=>{confirm()}} id="log" className="btn btn-success" style={{display: "block", margin: '0 auto', textAlign: 'center'}}>Place Order</button>
                </form>
                <br></br>
                <br></br>
                <h5><b>Note: </b> Currently, only Cash on Delivery is available</h5>

                
            </div>
            </div>
      
    </div>
    
      );
}

export default Checkout