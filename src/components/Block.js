import React from 'react'
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";


const Block = (props) => {
  const [dataprops,setDataprops] = React.useState([{}]);
  const location = useLocation();

  let navigate = useNavigate();
  function productScreen(Name){
    let index = dataprops.findIndex( item => Name === item.name );
    navigate("/product", {state: dataprops[index]});
    
  }
  
  React.useEffect(() => {
    const category = location.state?.category || props.title;
    const fetchUrl = props.title === "Featured Products" 
      ? 'http://localhost:8000/home' 
      : `http://localhost:8000/product_category?category=${encodeURIComponent(category)}`;

      console.log(fetchUrl);

    axios.get(fetchUrl)
      .then(function(res) {
          setDataprops(res.data);
      })
      .catch(function(err) {
          console.log(err);
      });
  }, [props.title,location]); 

    // React.useEffect(()=> {
    //   if(props.title ==="Featured Products"){
    //     axios.get('http://localhost:8000/home')
    //     .then(function(res) {
    //         setDataprops(res.data)          
    //     }, dataprops)
    //     .catch(function(err) {
    //         console.log(err);
    //     })
    //   }else{
    //     console.log("in categories")
    //     axios.post('http://localhost:8000/product_category', {category: props.title})
    //     .then(function(res) {
    //         setDataprops(res.data)          
    //     }, dataprops)
    //     .catch(function(err) {
    //         console.log(err);
    //     })
    //   }
    // })
  

  return (
    <>
      <h2 style={{textAlign:"center"}}>{props.title}</h2>
             <div className="row" style={{margin:"0 0 55px 0cm"}}>
                 {dataprops.map((item)=>{
                   
                     return(
                       
                        <div className="col-3" style={{textAlign: "center", padding: '2cm', margin:"0 0 0 3cm"}}>
                         <div className="card" style={{width: "22rem", outline: "3px ridge grey"}}>
                         <button onClick={()=>{productScreen(item.name)}}><img className="card-img-top" src={item.pic} alt="Card image cap"/></button>
                         <div className="card-body" style={{backgroundColor:"grey"}}>
                           <p className="card-text"><h4><b>{item.name}</b></h4></p>
                           <h4><b>Rs: {item.sales_price} /-</b></h4>
                         </div>
                       </div>
                       </div>
                     )
                 })}
            </div>
      
    </>
  )
}

export default Block