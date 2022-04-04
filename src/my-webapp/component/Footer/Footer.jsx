import { useTheme } from "../../context/theme-context";
import {footerlink} from './FooterConstant';
const Footer =()=>{
    const { darkTheme } = useTheme();
    return(
        <footer style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}> 
               <div className="flex-col flex-justify-content-center flex-align-item-center"> 
                         <p className="typography-p-small">Made with by Chanchal Panpaliya</p> 
                         <div className="flex-row col-gap-2rem flex-justify-content-center flex-align-item-center">
                            
                            {
                                footerlink.map((item,index)=>{
                                    return <li key={index}> 
                                                <a href={item.link} className={darkTheme?"default-color":""} target="_blank" rel="noopener noreferrer"> {item.name} </a>  
                                            </li>
                                })
                            }
                               
                         </div>
                 
                </div>
           </footer>
    )
}

export default Footer;