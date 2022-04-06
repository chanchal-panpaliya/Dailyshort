import "./auth.css";
import { useState ,useRef } from 'react';
import { Link } from "react-router-dom";
import Header from "../../component/Header/Header";
import { useTheme } from "../../context/theme-context";

const ForgotPassword =()=>{
    const { darkTheme } = useTheme();
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const [hideshow_rety_Pass,Sethideshow_rety_Pass]=useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return(
        <div>
           <Header layout={""} sidebarOpen={""}/>
             <div className="flex-row flex-justify-content-center flex-align-item-center box-container" style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}>
                <div className={darkTheme?"auth-container-darkmood" : "auth-container"}>
                    <div className='flex-col'>
                        <h4> ForgotPassword </h4>
                        <form onSubmit={(e)=>handleSubmit(e)}> 
                            <div className="flex-row  col-gap-2rem textField-container">  
                                <input type="email" name="email" value={emailId} placeholder="johndoe@gmail.com" autoComplete="off" className="text-input" style={{color:darkTheme?"white":"black"}}
                                onChange={(e)=>setEmailId(e.target.value)} required/>
                                <label className="text-placeholder"> Email Id </label>                                                
                            </div>
                            <div className="flex-row  col-gap-2rem textField-container">  
                                <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input" style={{color:darkTheme?"white":"black"}} autocomplete="off" onChange={(e)=>{setPassword(e.target.value)}} required/>
                                <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                                <label className="text-placeholder"> Password </label>                                                
                            </div>
                            <div className="flex-row  col-gap-2rem textField-container">  
                                <input type={hideshow_rety_Pass?"text":"password"} value={retypedPassword} className="text-input" style={{color:darkTheme?"white":"black"}} onChange={(e)=>{setRetypedPassword(e.target.value)}} required/>
                                <input type="checkbox" className="check-show-password" value={hideshow_rety_Pass} onChange={(e)=>{Sethideshow_rety_Pass(!hideshow_rety_Pass)}}/> 
                                <label className="text-placeholder"> Confirm password </label>                                             
                            </div>
                            {emailId && password && retypedPassword && password===retypedPassword && (
                                    <button className={'button button-login'} type="submit"> Forgot Password  </button>
                            )}
                        </form>
                        <div className='flex-row justify-content-space-between typology-padding-top'>
                            <Link to="/login"> Login </Link>
                            <Link to="/register"> Registartion </Link>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    )
 }
 
 export default ForgotPassword