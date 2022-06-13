import "./auth.css";
import { useState ,useRef ,useEffect,useContext} from 'react';
import { handleRegistration } from "../../api/utility";
import { Link , useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import { useTheme } from "../../context/theme-context";
import NoteContext from "my-webapp/context/NoteContext";


const Register =()=>{
    let navigator = useNavigate();
    const { darkTheme } = useTheme();
    let {toastdispatch} = useContext(NoteContext)
    const [firstname,setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [error, setError] = useState("");
    const [lastname,setLastName]=useState("");
    const [termsAndConditions,settermsAndConditions]=useState(false);
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const [hideshow_rety_Pass,Sethideshow_rety_Pass]=useState(false);

    useEffect(()=>{
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    },[])

    const validateemail=(e)=>{
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailId(e.target.value)
        if (!emailRegex.test(e.target.value.toLowerCase())) {
            setError("Enter a valid email address");
        } else {
            setError("");
        }
    }


    return(
        <div>
            <Header layout={""} sidebarOpen={""}/>
            <div className="flex-row flex-justify-content-center flex-align-item-center box-container" style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}>
                <div className={darkTheme?"auth-container-darkmood" : "auth-container"}>
                    <div className='flex-col'>
                    <h4> Registration </h4>
                    <form onSubmit={(e)=>handleRegistration(e,emailId,password,firstname,lastname,termsAndConditions,navigator,setError,toastdispatch)}>
                        <div className="flex-row">
                            <section>
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input type="text" name="firstName" value={firstname} placeholder="John" className="text-input" style={{color:darkTheme?"white":"black"}} onChange={(e)=>{setName(e.target.value)}} required/>
                                    <label className="text-placeholder"> Enter First Name </label>                                                
                                </div>
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input type="text" name="lastName" value={lastname} placeholder="Doe" className="text-input" style={{color:darkTheme?"white":"black"}} onChange={(e)=>{setLastName(e.target.value)}} required/>
                                    <label className="text-placeholder"> Enter Last Name </label>                                                
                                </div>    
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input type="email" name="email" value={emailId} placeholder="johndoe@gmail.com" autocomplete="off" className="text-input" style={{color:darkTheme?"white":"black"}} onChange={(e)=>validateemail(e)} required/>
                                    <label className="text-placeholder"> Email Id </label>                                                
                                </div>
                            </section>
                            <section>
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input"  style={{color:darkTheme?"white":"black"}} autocomplete="off" onChange={(e)=>{setPassword(e.target.value)}} required/>
                                    <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                                    <label className="text-placeholder"> Password </label>                                                
                                </div>
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input type={hideshow_rety_Pass?"text":"password"} value={retypedPassword} className="text-input" style={{color:darkTheme?"white":"black"}} onChange={(e)=>{setRetypedPassword(e.target.value)}} required/>
                                    <input type="checkbox" className="check-show-password" value={hideshow_rety_Pass} onChange={(e)=>{Sethideshow_rety_Pass(!hideshow_rety_Pass)}}/> 
                                    <label className="text-placeholder"> Confirm password </label>                                             
                                </div>
                                <div className="flex-row  col-gap-2rem textField-container">  
                                    <input  type='checkbox' name="termsAndConditions" value={termsAndConditions} onChange={()=>settermsAndConditions(!termsAndConditions)}/>  
                                    <small > I accept all Terms & Conditions </small>                                         
                                </div>
                            </section>
                        </div>
                        <div className="flex-row flex-justify-content-center flex-align-item-center">
                            {(password!==retypedPassword) && (retypedPassword!=="") ? "password not matched" : ""}  
                            {error}
                        </div>
                        {firstname && lastname && emailId && password && retypedPassword && password===retypedPassword && !error && termsAndConditions && (
                                    <div className="flex-row flex-justify-content-center flex-align-item-center">
                                        <button className="button button-outline-primary button-onhover-fillbackground" type="submit"> sign up  </button>
                                    </div>
                        )}   
                    </form>  
                    <div className="flex-row flex-justify-content-center flex-align-item-center">
                    <Link to="/login"> Login </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
 }
 
 export default Register