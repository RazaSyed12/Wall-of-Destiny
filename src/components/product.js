import React from 'react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {useLocation} from 'react-router-dom';

function Product() {
  const location = useLocation();
  const [props, setProps] = React.useState(location.state)
  console.log(props)
  const addCart = () =>{

    let username = reactLocalStorage.get('username', "", true);
    axios.post('http://localhost:8000/AddToCart', {
        username: username,
        product_name: location.state.name
      })
    alert("Product added successfully")
  }

    return (
    <div className="small-container">
    

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
          <h4><b>Price:</b> {props.price} <b>PKR/-</b></h4>
        <h4><b>Description: </b>{props.details}</h4>
    </div>
      </div>
    </div>
    <div className='d-flex justify-content-center'>
      <button type="button" className="btn btn-dark btn-lg" onClick={()=>{addCart()}} style={{ margin:"10px"}}><b>Add to Cart</b></button>
      <button type="button" className="btn btn-success btn-lg" style={{ margin:"10px"}}><b>Buy Now</b></button>
      </div>
  </div>
  
</div>

</div>
  );
}

export default Product;
