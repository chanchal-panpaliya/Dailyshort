//react
import { useState, useEffect ,useContext ,useRef} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//component
import Note_Home from "../subpages/Home/home";
import Note_Achiver from "../subpages/Archive/achiver";
import Note_Label from "../subpages/Label/label";
import Note_Trash from "../subpages/Trash/trash";
import Note_Profile from "../subpages/Profile/profile";
import Header from "../../component/Header/Header";
import Filter from "my-webapp/component/Filter/Filter";
//css
import './menu.css';
//context
import { useTheme } from "../../context/theme-context";
import {getLabelNote,getPriority,getdate,getSearchCart,getpin} from '../subpages/utility/filterutility';
import NoteContext from '../../context/NoteContext';
//constant
import {submenulist} from "./constant";


const Menu = () =>{
     const [route,setRoute]=useState("home")
     const navigate = useNavigate();
     const { darkTheme } = useTheme();
     const [side_toggle,setside_toggle] = useState(false)
     const {noteItems,filter} = useContext(NoteContext);
     //function
     const LabelNote = getLabelNote(noteItems,filter.isChecked);
     const PriorityNote = getPriority(LabelNote,filter.priority);
     const SortBydateNote = getdate(PriorityNote,filter.sortdate);
     const SortBypin = getpin(SortBydateNote,filter.sortpin)
     const SearchByTitle = getSearchCart(SortBypin,filter.search);
    
    useEffect(()=>{
      const noteItems=
      localStorage.getItem("route") == null
        ? "home"
        : localStorage.getItem("route")

      setRoute(noteItems)

    },[setRoute]) 

     const sidebarOpen=()=>{
      setside_toggle(true)
     }

     const sidebarClose=()=>{
      setside_toggle(false)
     }
    

    return(
         <div>
           <Header layout={"mobile"} sidebarOpen={()=>setside_toggle(!side_toggle)} />
            <div className="menu-container-grid" style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}>
              <div className={side_toggle?"sidebar-responsive":"sidebar"} style={{backgroundColor:darkTheme?"black":"white",color:darkTheme?"white":"black"}}>
                <div className={side_toggle?"sidebar-header flex-justify-content-flex-end":"sidebar-header"}> 
                  {side_toggle? <i className="fa fa-times" onClick={()=>sidebarClose()}> </i>: <Link to="/"> <i>  <h3> Dailyshort </h3> </i> </Link>}
                </div>
                <div className="sidebar-menulist">
                  <div className="sidebar__menu">
                    {
                      submenulist.map((item,index)=>{
                        return(
                          <div 
                          className={ item.route === route ?"sidebar__link active_menu_link":"sidebar__link"} 
                          style={{backgroundColor:darkTheme?"black":"",color:darkTheme?"white":""}}
                          key={index} onClick={() =>{setRoute(item.route); localStorage.setItem("route",item.route); sidebarClose()}}>
                            <i class="material-icons menu-icon">{item.Icon}</i>
                            <label className="sidebar_button"> {item.name} </label>
                          </div>
                        )
                      })
                    }
                    <div className="sidebar__logout" onClick={() =>{sidebarClose(); navigate("/login") }}>
                      <i className="fa fa-home"></i>
                      <label className="sidebar_button"> Logout </label>
                    </div>
                    {route==="home"?<Filter data={SearchByTitle} originaldata={noteItems}/>:null} 
                  </div>
                </div>
              </div>
              {/* main */}
              <main id="main">
                {route === "home" && <Note_Home/>}
                {route === "archive" && <Note_Achiver />}
                {route === "label" && <Note_Label/>}
                {route === "trash" && <Note_Trash/>}
                {route === "profile" && <Note_Profile/>}
              </main>
           </div> 
         </div>
    )
}

export default Menu;