//react
import { Link } from "react-router-dom";
import {useEffect} from 'react';
//css
import '../index'
//component
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
//context
import { useTheme } from "../../context/theme-context";
const Home = () =>{
const { darkTheme } = useTheme();

useEffect(()=>{
   window.scrollTo({ behavior: 'smooth', top: '0px' });
},[])

return(
   <div>
      <Header layout={""} sidebarOpen={""}/>
       <div className="home-container"> 
            <header className="position-absolute home-header-container"> 
               <div> </div>
            </header>
            <section className="home-section typography-align-center" style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}>
               <div className="letterspace-Small typography-h4 typography-padding-top-right-bottom-left"> Meet your modern  </div>
               <div className="typography-h1 typography-fontweight-black heading-title"> Note Taking App </div>
               <p className="typography-p-small typography-padding-top-right">Manage your daily tasks and workflow in a modern way and boost your efficiency without any efforts</p>
               <Link to="/register"> 
                  <button className="button button-onhover button-extra-large button-onhover-shadow border-radius-round-Medium typography-padding-top-right-bottom-left text-transform"> 
                    Join Now
                  </button>
               </Link>
               <Link to="./login" className="typography-padding-top typography-padding-top-right-bottom-left"> 
                  <small> Already have an account? </small>  
               </Link>                       
            </section> 
            <Footer/> 
      </div>
   </div>
  )
}

export default Home;