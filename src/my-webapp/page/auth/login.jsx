import "./auth.css";
import { useState ,useRef } from 'react';
import { Link } from "react-router-dom";
import { handleLogin } from "../../api/utility";
import Header from "../../component/Header/Header";
import { useTheme } from "../../context/theme-context";

const testCredentials = {
    email: 'adarshbalika@gmail.com',
    password: 'adarshBalika123',
    rememberMe: true,
  };

  const formInitialState = {
    email: '',
    password: '',
    rememberMe: false,
  };

const Login =()=>{
    const { darkTheme } = useTheme();
    const [formData, setFormData] = useState(formInitialState);
    const { email, password, rememberMe } = formData;
    const [hideshowpassword,sethideshowpassword]=useState(false);

    const handleInput = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  const handleToggle = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.checked,
    }));


   return(
       <div>
           <Header layout={""} sidebarOpen={""}/>
           <div className="flex-row flex-justify-content-center flex-align-item-center box-container" 
                 style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black",}}>
              <div className={darkTheme?"auth-container-darkmood" : "auth-container"}>
                <div className='flex-col'>
                  <h4>  Login </h4>
                  <form onSubmit={(e)=>handleLogin({e,email,password,setFormData})}>
                      <div className="flex-row  col-gap-2rem textField-container">  
                        <input type="email" name="email" value={email} placeholder="johndoe@gmail.com" autoComplete="off" className= "text-input" 
                            onChange={handleInput} style={{color:darkTheme?"white":"black"}} required/>
                        <label className="text-placeholder"> Email Id </label>                                                
                      </div>
                      <div className="flex-row  col-gap-2rem textField-container">  
                        <input type= {hideshowpassword?"text":"password"} name="password" value={password} className="text-input" 
                          onChange={handleInput} style={{color:darkTheme?"white":"black"}} required/>
                        <input type="checkbox" className="check-show-password" value={hideshowpassword} onChange={(e)=>{sethideshowpassword(!hideshowpassword)}}/> 
                        <label className="text-placeholder"> Password </label>                                                
                      </div>
                      <div className="flex-row flex-align-item-center">
                        <input onChange={handleToggle} type='checkbox' name='rememberMe' id='remember-me' checked={rememberMe}/>
                        <small> Remember me</small>
                      </div>
                      <div className="flex-row flex-justify-content-center flex-align-item-center">
                          <a  onClick={() => setFormData(testCredentials)} className="button-auth" type="submit">  Use test credentials </a>
                      </div>
                      {email && password && (
                        <div className="flex-row flex-justify-content-center flex-align-item-center">
                          <Link to="/menu"> 
                              <button type='submit' className="button button-outline-primary button-onhover-fillbackground" >  
                                    Login 
                              </button>
                          </Link>
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