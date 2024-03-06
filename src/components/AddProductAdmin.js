// import Navbar from './Navbar';
// import Footer from './Footer';
// import ImageUploadPreviewComponent from './ImageUploadPreview'
import axios from 'axios';
// import { useFormik } from 'formik';
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react'

 


function AddProduct() {
    let navigate = useNavigate();
    const [cust, setCust] = React.useState({
        cost_price: '',
          sales_price: '',
          details:"",
          name: "", 
          pic: "",
          color: '',
          category: '',
          dimension: '',
          featured: 'Yes',

    })
    
    function changesalep(e){
        let x = cust;
        x.sales_price = e;
        setCust(x)
    }
    function changecostp(e){
        let x = cust;
        x.cost_price= e;
        setCust(x)
    }
    function changedetails(e){
        let x = cust;
        x.details = e;
        setCust(x)
    }
    function changename(e){
        let x = cust;
        x.name = e;
        setCust(x)
    }
    function changecolor(e){
        let x = cust;
        x.color = e;
        setCust(x)
    }
    function changecategory(e){
        let x = cust;
        x.category = e;
        setCust(x)
    }
    function changedimensions(e){
        let x = cust;
        x.dimension = e;
        setCust(x)
    }
    function changefeatured(e){
        let x = cust;
        x.featured = e;
        setCust(x)
    }
    function changepic(e){
        let x = cust;
        x.pic = e;
        setCust(x)
    }

    // const formik = useFormik({
    //     initialValues: {
    //       cost_price: '',
    //       sales_price: '',
    //       details:"",
    //       name: "", 
    //       pic: "",
    //       color: '',
    //       category: '',
    //       dimension: '',
    //       featured: '',

    //     },
    //     onSubmit: values => {
    //       // alert(JSON.stringify(values, null, 2));
        //   axios.post('http://localhost:8000/addproduct', {
        //   cost_price: values.cost_price,
        //   sales_price: values.sales_price,
        //   details: values.details,
        //   name: values.name, 
        //   pic: values.pic,
        //   color: values.color,
        //   category: values.category,
        //   dimension: values.dimension,
        //   featured: values.featured,
        //   })
        //   .then(function (response) {
        //     alert("added")
            
        //   })
        //   .catch(function (error) {
        //     navigate('/error');
        //   });
        // },
    //   });

    function done(){
        axios.post('http://localhost:8000/addproduct', {
          cost_price: cust.cost_price,
          sales_price: cust.sales_price,
          details: cust.details,
          name: cust.name, 
          pic: cust.pic,
          color: cust.color,
          category: cust.category,
          dimensions: cust.dimension,
          featured: cust.featured,
          })
          .then(function (response) {
            alert(response.data)
            if(response.data==="Success"){
            navigate('/adminHome')}
            
          })
          .catch(function (error) {
            navigate('/error');
          });
    }
    
    return (
    <div className="Product" style={{height:"100vh",width:"100wh",backgroundColor:"white"}}>
    <div class="container" style={{margin: "50px 150px",backgroundSize:"cover",backgroundColor:"white", position:"relative", width:"100%"}}>
        <div class="row align-items-center">
        <div class="col-2">
            
            
            </div>
            <h1 style={{margin:"70px 0 0 200px"}}>Product Details:</h1>
            <form  >
            <br></br>
            <div className='container' style={{height:"55vh", width:"60vw",backgroundColor:"#E5E5E5", borderRadius:"15px", margin:"0 0 100px 200px"}}>
            <div className='row' style={{margin:"70px 0 0 70px "}}>
            <div class="col-5">
 
            <input class="form-control" type="text" placeholder="Name" id= "1" name ="1" onChange={(e)=>{changename(e.target.value)}}  aria-label="name"/>
            <br></br>
            <input class="form-control" type="text" placeholder="color" id= "2" name ="2" onChange={(e)=>{changecolor(e.target.value)}} aria-label="color"/>
            <br></br>
            <input class="form-control" type="text" placeholder="Dimensions(lxwxb)" id= "3" name ="4" onChange={(e)=>{changedimensions(e.target.value)}} aria-label="Dimensions"/>
            <br></br>
            <input class="form-control" type="text" placeholder="Product Description" id= "4" name ="4" onChange={(e)=>{changedetails(e.target.value)}} aria-label="Product Description"  rows="3"/>            
            <br></br>
            <input class="form-control" type="text" placeholder="url" aria-label="url" id= "5" onChange={(e)=>{changepic(e.target.value)}} name ="5" />

                 
            </div>
            <div class="col-5" style={{margin:"0px 0 0 40px "}}>
            
            <input class="form-control" type="text" placeholder="cost price" aria-label="cost_price" onChange={(e)=>{changecostp(e.target.value)}} id= "6" name ="6" />
            <br></br>
            <input class="form-control" type="text" placeholder="sales price" aria-label="sales_price" onChange={(e)=>{changesalep(e.target.value)}} id= "7" name ="7" />
            <br></br>
            {/* <input class="form-control" type="text" placeholder="Category" aria-label="Category" id= "8" onChange={(e)=>{changecategory(e.target.value)}} name ="8" /> */}
            <select 
                className="form-control" 
                aria-label="Category" 
                id="8" 
                onChange={(e) => { changecategory(e.target.value); }} 
                name="8"
            >
                <option value="">Select a Category</option>
                <option value="Clocks">Clocks</option>
                <option value="Decor">Decor</option>
                <option value="Art">Art</option>
                <option value="Lights">Lights</option>
            </select>

            <br></br>
            {/* <input class="form-control" type="text" placeholder="Featured" aria-label="Featured" rows="3" onChange={(e)=>{changefeatured(e.target.value)}} id= "9" name ="9" />*/}
            <div>
            <label class="form-label">Featured</label>
                <div className="form-check">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name="featured" 
                        id="featuredYes" 
                        value="Yes" 
                        onChange={(e) => { changefeatured(e.target.value); }} 
                    />
                    <label class="form-check-label" for="featuredYes">
                        Yes
                    </label>
                </div>
                <div className="form-check">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name="featured" 
                        id="featuredNo" 
                        value="No" 
                        onChange={(e) => { changefeatured(e.target.value); }} 
                    />
                    <label class="form-check-label" for="featuredNo">
                        No
                    </label>
                </div>
            </div>
            <br></br>
            <button type="button" class="btn" onClick={()=>{done()}} style = {{fontSize:"18px",backgroundColor:"#aca738",color:"white",margin: "Auto 0 auto 200px"}}>Add Product</button>
            </div>
            </div>
            </div>
            </form>
        </div>
        
    </div> 
    
    
    </div>
    )
}

export default AddProduct
