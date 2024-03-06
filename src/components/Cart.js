import React from 'react'
import {Link} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Cart(props) {
  const [items, setItems] = React.useState([])
  let navigate = useNavigate();
  React.useEffect(()=> {
    let username = reactLocalStorage.get('username', "", true);
    axios.post('http://localhost:8000/ViewCart',{
      username: username
    })
    .then(function(res) {
      console.log(res)
      if(res.data=="Cart is empty"){
        alert("Cart is empty")
      }
      else{
        setItems(res.data)
      }
                  
    }, items)
    .catch(function(err) {
        console.log(err);
    })
  }, [])
    
    React.useEffect(()=>{
      let x = items.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;
      }, 0);
      setTotal(x+200); 
    })
    
    const [total, setTotal] = React.useState(0)
    function removeItem(id){
      let i = items.findIndex( item => id === item.id );
      let username = reactLocalStorage.get('username', "", true);
        
      axios.post('http://localhost:8000/DeleteItemFromCart', {
        username: username,
        product_name: items[i].name
        })

        const newItems = items.filter(function(item) {
            return item.id !== id
        })
         
        setItems(newItems); 
    }

    function handleChange(e,id){
        const { value } = e.target;
        let i = items.findIndex( item => id === item.id );
        let username = reactLocalStorage.get('username', "", true);
        if(value>items[i].quantity){
          axios.post('http://localhost:8000/AddToCart', {
          username: username,
          product_name: items[i].name
      })}
      else if(value<items[i].quantity){
        axios.post('http://localhost:8000/DeleteFromCart', {
        username: username,
        product_name: items[i].name
    })}
        if (value<1){
            removeItem(i);
        }else{

        
        const newItems = items.map(item => {
          if (item.id !== id) {
            return { ...item };
          }
        let name, price, pic, color
        for (const item of items) {
            if(item.id === id){
                name = item.name
                price = item.price
                pic = item.pic
                color = item.color
            }
        }   
          return { id, name, price, color, pic, quantity: value };
        })
        setItems(newItems);
    }
    };
    if(items.length < 1){
        return(
            <div style={{height:"380px", textAlign:"center", backgroundColor:"white", margin: "4cm 0cm 1cm 9cm", position:"relative", width:"850px"}}>
    <h2>Nothing in Cart</h2>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PokqMe-w1F3IzUuz8b8xcvHessPvz_TCAw&usqp=CAU"/>
    </div>
        )
    }

  return (
    <>
        <h2 style={{textAlign:"center", margin:"50px 0px 50px 0px"}}>Shopping Cart</h2>
        <hr style={{size:"8", width:"75%", color:"red", margin:"0px 0px 10px 200px"}}></hr>
        {items.map((item)=>{
            return(
        <>
        <ul class="nav row">
            <li class="nav-item col">
                <><img className="card-img-top" src={item.pic} alt="Card image cap" style={{margin:"0px 0px 10px 200px", height:"70px", width:"70px"}}/></>
            </li>
            <li class="nav-item col-2" style={{margin:"25px 0 0 0", }}>
                <h5>{item.name}</h5>
            </li>
            <li class="nav-item col" style={{margin:"25px 0 0 0"}}>
                <h5>{item.color}</h5>
            </li>
            <li class="nav-item col" style={{margin:"25px 0 0 0"}}>
                <h5>PKR: {item.price}</h5>
            </li>
            <li class="nav-item col" style={{margin:"25px 0 0 0"}}>
                <div className="product-quantity" style={{float: "left", width: '10%'}}>
                    <input type="number" onChange={(e) => handleChange(e, item.id)} value={item.quantity} min="0" style={{width: "40px"}}/>
                    {console.log(item.quantity)}
                </div>
            </li>
            <li class="nav-item col" style={{margin:"25px 0 0 0"}}>
            <button className='btn btn-outline-success' onClick={()=>removeItem(item.id)} style={{display: "inline-block", margin: '0 0 0 0px', textAlign: 'right'}}><i class='fas fa-times-circle' style={{fontSize:'28px',color:'red'}}></i></button>
            </li>
            
        </ul>
        <hr style={{size:"8", width:"75%", color:"red", margin:"0px 0px 0px 200px"}}></hr>
        <br></br>
        </>
        )})}
    <div class="card" style={{textAlign: "center", margin:"50px 50px 50px 620px", width:"300px"}}>
  <div class="card-header">
  <h4 class="card-title" >Total Bill</h4>
  <h5>Subtotal: PKR {total-200}</h5>
  <h5>Delivery: PKR 200</h5>
  <h5>Total:    PKR {total}</h5>
  </div>
  <div class="card-body">

<button className="btn btn-success " onClick={()=>{navigate("/checkout", {state: total})}}>Checkout</button>
  

  </div>
</div>  
    </>
  );
}

export default Cart
