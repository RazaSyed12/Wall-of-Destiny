import React, {useState} from 'react'
//import Items from './ViewOrdersItems'
//import App from '../../src/App';

function ViewOrders () {
    //const [item, setItem] = useState(App);
    return (
        <>
        <header>
            <div className = "orders-heading">
                <h1 style={{fontSize: 25, margin: "80px 60px 40px 60px", color: "#a7ac38"}}>Orders</h1>
            </div>
        </header>

        <div className = "order-item-container" style = {{width: '91.5%', height: '15rem', backgroundColor: '#E5E5E5', margin: '20px auto 30px auto', display: 'grid', gridTemplateColumns: '200px 300px auto auto', padding: '20px'}}>
            <div classname = "order-number">
                <h2 style={{fontSize: 12.5, margin: "0px -15px 10px 5px", color: "black", fontWeight: 300}}>Order #<span style = {{fontWeight: 'bold'}}> 1</span></h2>
                <img src= "https://5.imimg.com/data5/ANDROID/Default/2021/3/BP/RP/QV/26379028/product-jpeg-1000x1000.jpg" alt = "order-picture" width = "100" height = "80" style = {{margin : "5px -10px 10px 5px"}}/>
            </div>
            <div classname = "title">
                <h3 style={{fontSize: 15, color: "black", margin: "50px 0px 10px 0px" /*display: 'flex', flexDirection: 'column'*/}}>Lamansh Metal Wall Decor</h3>
                <price style={{fontSize: 12, color: "#a7ac38", margin: "50px 0px 10px 0px"}}>PKR 1500</price>
            </div>
            <div classname = "quantity">
                <quantity style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'center'/* alignItems: 'center', flexDirection: 'column'*/}}>Qty: 2</quantity>
            </div>
            <div classname = "deliver-date">
                <date style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'flex-end', /*flexDirection: 'column'*/}}>Delivered on: 03 Jan 2022</date>
            </div>
        </div>

        <div className = "order-item-container" style = {{width: '91.5%', height: '15rem', backgroundColor: '#E5E5E5', margin: '20px auto 30px auto', display: 'grid', gridTemplateColumns: '200px 300px auto auto', padding: '20px'}}>
            <div classname = "order-number">
                <h2 style={{fontSize: 12.5, margin: "0px -15px 10px 5px", color: "black", fontWeight: 300}}>Order #<span style = {{fontWeight: 'bold'}}> 1</span></h2>
                <img src="https://5.imimg.com/data5/ANDROID/Default/2021/3/BP/RP/QV/26379028/product-jpeg-1000x1000.jpg" alt = "order-picture" width = "100" height = "80" style = {{margin : "5px -10px 10px 5px"}}/>
            </div>
            <div classname = "title">
                <h3 style={{fontSize: 15, color: "black", margin: "50px 0px 10px 0px" /*display: 'flex', flexDirection: 'column'*/}}>Lamansh Metal Wall Decor</h3>
                <price style={{fontSize: 12, color: "#a7ac38", margin: "50px 0px 10px 0px"}}>PKR 1500</price>
            </div>
            <div classname = "quantity">
                <quantity style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'center'/* alignItems: 'center', flexDirection: 'column'*/}}>Qty: 2</quantity>
            </div>
            <div classname = "deliver-date">
                <date style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'flex-end', /*flexDirection: 'column'*/}}>Delivered on: 03 Jan 2022</date>
            </div>
        </div>
        <div className = "order-item-container" style = {{width: '91.5%', height: '15rem', backgroundColor: '#E5E5E5', margin: '20px auto 30px auto', display: 'grid', gridTemplateColumns: '200px 300px auto auto', padding: '20px'}}>
            <div classname = "order-number">
                <h2 style={{fontSize: 12.5, margin: "0px -15px 10px 5px", color: "black", fontWeight: 300}}>Order #<span style = {{fontWeight: "bold"}}> 1</span></h2>
                <img src="https://5.imimg.com/data5/ANDROID/Default/2021/3/BP/RP/QV/26379028/product-jpeg-1000x1000.jpg" alt = "order-picture" width = "100" height = "80" style = {{margin : "5px -10px 10px 5px"}}/>
            </div>
            <div classname = "title">
                <h3 style={{fontSize: 15, color: "black", margin: "50px 0px 10px 0px" /*display: 'flex', flexDirection: 'column'*/}}>Lamansh Metal Wall Decor</h3>
                <price style={{fontSize: 12, color: "#a7ac38", margin: "50px 0px 10px 0px"}}>PKR 1500</price>
            </div>
            <div classname = "quantity">
                <quantity style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'center'/* alignItems: 'center', flexDirection: 'column'*/}}>Qty: 2</quantity>
            </div>
            <div classname = "deliver-date">
                <date style = {{fontSize: 15, color: "black", margin: "50px 0px 0px 0px", display: 'flex', justifyContent: 'flex-end', /*flexDirection: 'column'*/}}>Delivered on: 03 Jan 2022</date>
            </div>
        </div>
        </>
    )
}
export default ViewOrders;