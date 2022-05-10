import "./auth.css";
import { useState ,useRef ,useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import { handleLogin } from "../../api/utility";
import Header from "../../component/Header/Header";
import { useTheme } from "../../context/theme-context";

const testCredentials = {
  email: "johndoe@gmail.com",
  password: "johnDoe123",
  rememberMe: true,
};

const formInitialState = {
  email: "",
  password: "",
  rememberMe: false,
};

const Login =()=>{
  let navigator = useNavigate();
    const { darkTheme } = useTheme();
    const [formData, setFormData] = useState(formInitialState);
    const { email, password, rememberMe } = formData;
    const [hideshowpassword,sethideshowpassword]=useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
      window.scrollTo({ behavior: 'smooth', top: '0px' });
  },[])

    const handleInput = (e) =>{
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleToggle = (e) =>{
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.checked,
    }));
  }


   return(
       <div>
           <Header layout={""} sidebarOpen={""}/>
           <div className="flex-row flex-justify-content-center flex-align-item-center box-container" 
                 style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black",}}>
              <div className={darkTheme?"auth-container-darkmood" : "auth-container"}>
                <div className='flex-col'>
                  <h4>  Login </h4>
                  <form onSubmit={(e)=>handleLogin(e,email,password,navigator,setError)}>
                      <div className="flex-row  col-gap-2rem textField-container">  
                        <input type="email" name="email" value={email} placeholder="johndoe@gmail.com" className= "text-input" 
                            onChange={(e)=>handleInput(e)} style={{color:darkTheme?"white":"black"}} required/>
                        <label className="text-placeholder"> Email Id </label>                                                
                      </div>
                      <div className="flex-row  col-gap-2rem textField-container">  
                        <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input"  
                          onChange={(e)=>handleInput(e)} style={{color:darkTheme?"white":"black"}} required/>
                        <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{e.preventDefault(); sethideshowpassword(!hideshowpassword)}}/> 
                        <label className="text-placeholder"> Password </label>                                                
                      </div>
                      <div className="flex-row flex-align-item-center">
                        <input onChange={(e)=>handleToggle(e)} type='checkbox' name='rememberMe' id='remember-me' checked={rememberMe}/>
                        <small> Remember me</small>
                      </div>
                      <div className="flex-row flex-justify-content-center flex-align-item-center">
                          <button style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black",}} onClick={(e) =>{e.preventDefault(); setFormData(testCredentials)}} className="button-auth">  Use test credentials </button>
                      </div>
                      {email && password && (
                        <div className="flex-row flex-justify-content-center flex-align-item-center">
                              <button className="button button-outline-primary button-onhover-fillbackground" >  
                                    Login 
                              </button>
                        </div>
                        )}  
                  </form> 
                  <div className='flex-row justify-content-space-between typology-padding-top'>
                      <Link to="/forgotpassword"> <small> forgot password ? </small>  </Link>
                      <Link to="/register"> <small> Registartion </small> </Link>
                  </div>
                </div>
            </div>
          </div>
       </div>
   )
}

export default Login