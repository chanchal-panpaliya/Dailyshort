//react
import { Link } from 'react-router-dom';
import { useEffect} from 'react';
//css
import './Header.css';
import "../../page/menu/menu.css";
//context
import { useTheme } from '../../context/theme-context';

const Header = (props) =>{
    const { darkTheme , setDarkTheme} = useTheme();

    useEffect(() => {
        localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
      }, [darkTheme]);

    const onThemeTogglerClick = () =>{
        setDarkTheme(!darkTheme)
    }

    return(
        <div>
            <div className='header-container'>
                <div className='header-container-flex'>
                {/* /note title/ */}
                <div className='header-left-end'></div>
                <div className='header-logo'>
                {
                    props.layout==="mobile"?
                    <>
                     <div className="sidebar-icon" onClick={props.sidebarOpen}> 
                        <i className="fa fa-bars"> </i>
                     </div>
                    </>:
                    null
                }
                    <div>
                        <Link to="/" > 
                            <i style={{color:darkTheme?"white":"white"}}>  <h2> Dailyshort </h2> </i>
                        </Link>
                    </div>
                </div>
                {/* /theme button/ */}
                <div className='header-right-container'>
                    <span onClick={onThemeTogglerClick} className="themeicon-onhover"> 
                    {darkTheme?
                        <i class="fa fa-moon-o"></i>:
                        <i class="fa-solid fa-sun"></i>
                    } 
                    </span> 
                </div>
                <div className='header-right-end'>
                </div>
            </div>   
           </div>
        </div>
    )
}

export default Header;