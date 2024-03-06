import Navbar from './Navbar';
import Footer from './Footer';
import ImageUploadPreviewComponent from './ImageUploadPreview'
import axios from 'axios';
import { useFormik } from 'formik';
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react'


function EditProduct() {
    let navigate = useNavigate();
    const location = useLocation();
  const [props, setProps] = React.useState(location.state)
    const [cust, setCust] = React.useState({
        cost_price: '',
          sales_price: '',
          details:"",
          name: props.name, 
          pic: "",
          color: '',
          category: '',
          dimension: '',
          featured: '1',

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

    function changecolor(e){
        let x = cust;
        x.color = e;
        setCust({ ...cust, color: e });
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
    function deleteprod(){
        axios.post('http://localhost:8000/deleteproduct',{name: cust.name})
        .then(function(res){
            alert("Product Deleted")
            navigate('/adminHome')
        })
    }


    function done() {
      axios.patch(`http://localhost:8000/editproduct/${props._id}`, cust)
          .then(function (response) {
              alert(response.data);
              if (response.data === "Update Success") {
                  navigate('/adminHome');
              }
          })
          .catch(function (error) {
              console.error("Error: ", error);
              navigate('/error');
          });
        }

    
return (
    <div className="small-container">
    <h2 style={{textAlign: "center"}}>Edit Product</h2>

    <div className="row">
        <div className="col-sm-3" style={{textAlign: "center", padding: '2cm', margin:"30px 5cm 0cm 15%"}}>
            <div className="card" style={{width: "400px", outline: "3px ridge grey", height:"400px"}}>
            <img className="card-img-top" src={props.pic} alt="Card image cap" style={{height:"400px", width:"400px"}}/>
        </div>
        </div>
  
  <div className="col-sm-3" style={{textAlign: "center", padding: '2cm', margin:"0 0 0 0"}}>
  <h1 style={{textAlign:"left"}}>{props.name}</h1>
  <br/>
    <div style={{width: "30rem"}}>
      <div className="card-body" style={{backgroundColor:"white"}}>
        <div className='card-text row' style={{textAlign:"left", height:"270px"}}>
        <h4><b>Dimensions: </b>{props.dim} inches</h4>
        <h4><b>Color: </b>{props.color}</h4>
          <h4><b>Cost Price:</b> {props.cost_price} <b>PKR/-</b></h4>
          <h4><b>Sales Price:</b> {props.sales_price} <b>PKR/-</b></h4>
        <h4><b>Description: </b>{props.details}</h4>
        <h4><b>Category: </b>{props.category}</h4>
        
    </div>
      </div>
    </div>
    <div className='d-flex justify-content-center'>
    
      </div>
    
  </div>
  <form  style={{textAlign:"center"}}>
                <div className="row" style ={{margin:"0 0 100px 290px"}}>
            <div class="col-4">
            <br></br>
 

            <input class="form-control" type="text" placeholder="color" id= "2" name ="2" onChange={(e)=>{changecolor(e.target.value)}} aria-label="color"/>
            <br></br>
            <input class="form-control" type="text" placeholder="Dimensions(lxwxb)" id= "3" name ="4" onChange={(e)=>{changedimensions(e.target.value)}} aria-label="Dimensions"/>
            <br></br>
            <input class="form-control" type="text" placeholder="Product Description" id= "4" name ="4" onChange={(e)=>{changedetails(e.target.value)}} aria-label="Product Description"  rows="3"/>            
            <br></br>
            <input class="form-control" type="text" placeholder="url" aria-label="url" id= "5" onChange={(e)=>{changepic(e.target.value)}} name ="5" />

                 
            </div>
            <div class="col-4" style ={{margin:"0 0 0 60px"}}>
            
            <br></br>
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
            {/* <input class="form-control" type="text" placeholder="Featured" aria-label="Featured" rows="3" onChange={(e)=>{changefeatured(e.target.value)}} id= "9" name ="9"*/}
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
            <br></br>
 
            <button type="button" class="btn" onClick={done} style = {{color:"white" ,width:"150px",margin: "0 0 0 70px", backgroundColor:"#aca738"}}>Confirm Changes</button>
            <button type="button" class="btn btn-danger" onClick={()=>{deleteprod()}}  style = {{color:"white" ,width:"150px",margin: "Auto 10px", backgroundColor:""}}>Delete Item</button>
            
            </div>
            </div>
            </form>
</div>

</div>
  );
};

export default EditProduct;
