import {IoIosUnlock} from "react-icons/io";
import Avatar from '@mui/material/Avatar';


function Verify() {
    let inputstyle={
        width: "36px",
        height: "42px",
        fontSize: "36px",
        border: "none",
        textAlign:'center',
        margin:"50px 3px",
    }
    return(
        <div className="container-fluid" style={{alignContent:"center", backgroundSize:"cover",backgroundImage: "url('https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')" ,backgroundColor:"green"}}>
        <div className="container" style={{width:"25%",backgroundColor:"#E5E5E5", margin:"15% auto",border:"solid", borderColor:"grey"}}>
            <Avatar
                alt="Remy Sharp"
                sx={{ margin:"10% 42%", width: 50, height: 50, backgroundColor:"#a7ac38" }}><IoIosUnlock style = {{width:"20",height:"20"}}/></Avatar>
            <h3 style={{margin:"30px 0 10px 0", textAlign:'center'}}>Verify Account</h3>
            <p style={{margin:"0 0 0px 0px", textAlign:'center'}}>Enter the verification code sent to your email</p>
            <div className="code-container" style={{width:"80%",backgroundColor:"#E5E5E5", margin:"0 50px"}}>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
                <input type="text" className="code" placeholder="*" style = {inputstyle} required/>
            </div>
            <button type="submit" id="log" className="btn" style={{color:"white",backgroundColor:"#a7ac38", width:"140px", display: "block", margin: '0px auto 50px auto', textAlign: 'center'}}>VERIFY</button>
        </div>
        </div>
    )
}
export default Verify