import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Block from './components/Block';
import ChatBot from './components/ChatBot';
import ErrorPage from './components/ErrorPage';
import AddProduct from './components/AddProductAdmin';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Profile from './components/Profile';
import Product from './components/product';
import Rewards from './components/Rewards';
import About from './components/About';
import Contactus from './components/ContactUs';
// import Trackorder from './components/trackOrder';
import Orders from './components/orderhistory';
import Verify from './components/verifyemail';
import AdminHome from './components/AdminHome';
import ViewOrders from './components/ViewOrders';
import Summary from './components/Summary';
import AdminNavbar from './components/AdminNavbar';
import EditProduct from './components/EditProduct';
import AdminProfile from './components/AdminProfile';
import AddAdmin from './components/AddAdmin';

function App() {
  
  return (
    <Router>
      <div className="App" style={{height:"100%", backgroundColor:"white", position:"relative", width:"100%", backgroundSize: "cover"}}>
          
          <Routes>
            <Route path="/" element={<><Navbar /> <Block title={"Featured Products"}/><Footer /></>}/>
            <Route path="/clocks" element={ <><Navbar /> <Block  title={"Clock"}/><Footer /></>}/>
            <Route path="/decor" element={ <><Navbar /> <Block title={"Decor"}/><Footer /></>}/>
            <Route path="/art" element={ <><Navbar /> <Block title={"Art"}/><Footer /></>}/>
            <Route path="/lights" element={ <><Navbar /> <Block title={"Light"}/><Footer /></>}/>
            <Route path="/product" element={ <><Navbar /> <Product/><Footer /></>}/>
            <Route path="/cart" element={<><Navbar /> <Cart /> <Footer /></>}/>
            <Route path="/login" element={ <><Login/></>}/>
            <Route path="/checkout" element={ <><Navbar /> <Checkout/><Footer /></>}/>
            <Route path="/profile" element={ <><Navbar /> <Profile/><Footer /></>}/>
            <Route path="/rewards" element={ <><Navbar /> <Rewards/><Footer /></>}/>
            {/* <Route path="/trackorders" element={ <><Navbar /> <Trackorder/><Footer /></>}/> */}
            <Route path="/orders" element={ <><Navbar /> <Orders/><Footer /></>}/>
            <Route path="/about" element={ <><Navbar /> <About/><Footer /></>}/>
            <Route path="/ContactUs" element={<><Navbar /> <Contactus/><ChatBot/><Footer /></>}/>
            <Route path="/verifyemail" element={<><Navbar /> <Verify/><Footer /></>}/>
            
            <Route path="*" element={<ErrorPage message={{message: "404 not found"}}/>}/>
            <Route path= '/error' element={<ErrorPage/>}/>

            {/* Admin  */}
            <Route path="/AddProduct" element={<><AdminNavbar /><AddProduct/></>}/>
            <Route path="/AddAdmin" element={<><AdminNavbar /><AddAdmin/></>}/>
            <Route path="/AdminProfile" element={<><AdminNavbar /><AdminProfile/></>}/>
            <Route path="/EditProduct" element={<><AdminNavbar /><EditProduct/></>}/>
            <Route path="/AdminHome" element={<><AdminNavbar /><AdminHome featured={featured} title={"Art"}/></>}/>
            <Route path="/ViewOrders" element={<><AdminNavbar /><ViewOrders/><Footer /></>}/>
            <Route path="/admin/summary" element={<><AdminNavbar /><Summary/><Footer /></>}/>
            <Route path="/12232OP43FF546TT765G768a53/435434234324253655756554/AdminLogin" element={<AdminLogin/>}/>

          </Routes>    
          
        </div>
        
    </Router>    
  );
}
// dummy data

let clocks = [{name: "Clocks1",
  id: 0,
  price: 4000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcujIBWtqPIEGkwP0q1O8brRVJ12KLGqY_lg&usqp=CAU"},
  {name: "Clocks2",
  id: 1,
  price: 5000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://cdn.shopify.com/s/files/1/0046/8575/8564/products/avalon-clock-clock-canvas-28358221201493_1024x1024.png?v=1631174791"},
  {name: "Clocks3",
  id: 2,
  price: 5000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://cdn.shopify.com/s/files/1/0046/8575/8564/products/avalon-clock-clock-canvas-28358221201493_1024x1024.png?v=1631174791"}]

  let decor = [{name: "Decor1",
  id: 0,
  price: 4000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "data:image/jpeg;base64,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"},
  {name: "Decor2",
  id: 1,
  price: 3000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://ii1.pepperfry.com/media/catalog/product/t/r/800x880/tree-of-life-circle-wall-art-by-wall-centre-tree-of-life-circle-wall-art-by-wall-centre-yk85wb.jpg"},
  {name: "Decor3",
  id: 2,
  price: 3000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://ii1.pepperfry.com/media/catalog/product/t/r/800x880/tree-of-life-circle-wall-art-by-wall-centre-tree-of-life-circle-wall-art-by-wall-centre-yk85wb.jpg"}]

  let art = [{name: "Art1",
  id: 0,
  price: 4000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "data:image/jpeg;base64,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"},
  {name: "Art2",
  id: 1,
  price: 4500,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://i.pinimg.com/736x/ed/f5/5e/edf55e6868286dadf5ccc111ff9b785b--contemporary-wall-art-modern-art.jpg"},
  {name: "Art3",
  id: 2,
  price: 4500,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://i.pinimg.com/736x/ed/f5/5e/edf55e6868286dadf5ccc111ff9b785b--contemporary-wall-art-modern-art.jpg"}]

  let lights = [{name: "Lights1",
  id: 0,
  price: 4000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://5.imimg.com/data5/JN/ED/HA/SELLER-1471206/2-way-led-wall-light-500x500.jpg"},
  {name: "Lights2",
  id: 1,
  price: 3000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://5.imimg.com/data5/JN/ED/HA/SELLER-1471206/2-way-led-wall-light-500x500.jpg"},
  {name: "Lights3",
  id: 2,
  price: 4999,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://4.imimg.com/data4/CK/ET/MY-3841190/led-light-500x500.jpg"}]


let featured = [
  {name: "Carpet",
  id: 0,
  price: 4000,
  quantity: 1,
  color: "Black",
  dim: "3x5x6",
  details: "nice product pls buy",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},

  {name: "Carpet2",
  id: 1,
  price: 3000,
  quantity: 1,
  color: "Red",
  dim: "3x5x6",
  details: "nice product pls buy now",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},
  {name: "Carpet3S",
  price: 1000,
  quantity: 1,
  id: 2,
  color: "Red",
  dim: "3x5x6",
  details: "nice product pls buy now",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},
  {name: "Carpet4",
  price: 3000,
  quantity: 1,
  id: 3,
  color: "Red",
  dim: "3x5x6",
  details: "nice product pls buy now",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},
  {name: "Carpet5",
  price: 3000,
  id: 4,
  quantity: 1,
  color: "Red",
  dim: "3x5x6",
  details: "nice product pls buy now",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},
  {name: "Carpet6",
  price: 3000,
  id: 5,
  quantity: 1,
  color: "Red",
  dim: "3x5x6",
  details: "nice product pls buy now",
  pic: "https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg"},
  
]

export default App;
