import React from 'react'
import {Link} from 'react-router-dom'


export const Footer =() => {
  let footerStyle={
    position: "sticky",
    top: "100vh",
    width: "100%",
    backgroundColor: "#E5E5E5",
    opacity: "90%",
  }
    return (
    <footer className="text-light py-5" style={footerStyle}>
      <div className="row">
        <div className="col">
          <h4 style={{margin:"0px 0px 10px 50px", color:"#a7ac38"}}><b>Walls Of Destiny</b></h4>
          <p className="text text-dark" style={{margin:"0px 0px 0px 50px"}}>We are a wall decor website offering a wide product range</p>
          <p className="text text-dark" style={{margin:"0px 0px 0px 50px"}}>We aim to add color to your walls</p>
        </div>
        <div className='col'>
        <Link to={{pathname: "/about"}}><button type="button" className="btn btn-sm" style={{fontSize:"13px",color:"none", padding: "8px 30px", border:"3px solid #a7ac38", margin:"0 0 0 440px"}}><b>About Us</b></button></Link>
        <Link to={{pathname: "/ContactUs"}}><button type="button" className="btn btn-sm" style={{fontSize:"13px",color:"none", padding: "8px 30px", border:"3px solid #a7ac38", margin:"0 25px 0 5px"}}><b>Contact Us</b></button></Link>
        </div>
      </div>
      <hr  style={{margin:"20px 0 0 40px", color: '#000000',backgroundColor: '#000000',width:"37.5cm",height: ".5",borderColor : '#000000'}}/>
    </footer>
  )
}
export default Footer
