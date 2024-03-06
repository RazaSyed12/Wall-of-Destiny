function Orders() {
    return(
        <div className="row">
            <h2 style={{margin:"100px 0 20px 180px",color:"#a7ac38"}}>Orders</h2>
            <div className="container" style={{margin:"20px auto",backgroundColor:"#E5E5E5"}}>
                <div className="row" style={{margin:"35px 0 0px 20px"}}>
                    <h4>Order# 112-453-21</h4>
                </div>
                <div className="row" style={{margin:"10px 0 20px 20px"}}>
                    <div className="col-2" style={{backgroundColor:""}}>
                        <img style={{height:"120px", width:"120px" }} src="https://5.imimg.com/data5/VY/GJ/AF/SELLER-13363886/2way-500x500.jpg" alt="..." class="img-thumbnail"></img>
                    </div>
                    <div className="col" style={{backgroundColor:""}}>
                        <h5>World Map Wall Clock</h5> 
                        <p style={{color:"#a7ac38"}}>PKR 1500</p>
                    </div>
                    <div className="col" style={{backgroundColor:""}}>
                        <p style={{margin:"6px 30px 0 30px",color:"grey"}}>Qty: <a style={{color:"black"}}>2</a></p>
                    </div>
                    <div className="col" style={{backgroundColor:""}}>
                        <p style={{margin:"6px 0 0 30px",color:"grey"}}>Status: <a style={{color:"black"}}>Shipped</a></p>
                    </div>
                </div>
            </div>    
        </div>
    )
}
export default Orders