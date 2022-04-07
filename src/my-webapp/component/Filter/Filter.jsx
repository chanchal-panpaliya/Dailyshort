//react
import { useEffect , useState , useContext} from "react";
//css
import "./Filter.css";
//context
import NoteContext from "../../context/NoteContext";
import { useTheme } from '../../context/theme-context';

const Filter = (props) =>{
    let {filter,filterdispatch} = useContext(NoteContext);
    const { darkTheme } = useTheme();
    const [checklist , setChecklist ] = useState([])
    const [showfiter,setshowfilter]=useState(false);
   
    useEffect(()=>{  
         let time1 = setTimeout(()=>{
            let unique_list = props.originaldata.length>0 && [...new Set(props.originaldata.map(q => q.label))];
            let updated_list = unique_list.length>0 && unique_list.filter((item)=>item!=="")
              if(unique_list[0]!==""){
               setChecklist(updated_list) 
              }
         },0)
       return ()=> clearTimeout(time1)  
    })

 
    return(
        <div className="font-size-small">
            <input type="search" 
                placeholder="search note by title" 
                className='search-note'
                value={filter.search}
                onChange={(e)=>{filterdispatch({type:"SEARCH_BY_TITLE",payload:e.target.value})}} 
            /> 
            <button onClick={()=>setshowfilter(!showfiter)}> filter </button> 
            {  
            showfiter ?
                <div className="filter-box-container" style={{color:darkTheme?"black":"black"}}> 
                    {/* ----chcekbox--*/}
                    <div className="flex-row col-gap-1rem">
                    <label> <b className="typography-fontweight-semibold "> Filter by label: </b>  </label>
                    <div className="flex-row col-gap-1rem ">
                        {
                            checklist.length>0 ? checklist.map((item,index)=>{
                            return(
                                <>
                                    <label key={index} className="chcekbox-item">
                                        <span> {item} </span>
                                        <input  type="checkbox" name="label"  value={item} checked={filter.isChecked.includes(item)}
                                        onChange={(e)=>{ filterdispatch({type:"TOGGLE_CHECKBOX",payload: e.target.value,status: e.target.checked})}}
                                        />
                                    </label> 
                                </>
                            )
                        }) : <small> No label added on note </small>
                        }
                    </div>
                    </div>
                    {/* ----priority--*/}
                    <div>
                    <label> <b className="typography-fontweight-semibold"> Priority : </b>  </label>
                    <section className="flex-row col-gap-1rem">
                        <label>
                            <input type="radio" name="Priority" value="High" checked={filter.priority === "High"} 
                                onChange={(e) =>{  filterdispatch({ type: "PRIORITY", value: e.target.value })} } />
                            High
                        </label>

                        <label>
                            <input type="radio" name="Priority" value="Medium" checked={filter.priority === "Medium"} 
                                onChange={(e) =>{ filterdispatch({ type: "PRIORITY", value: e.target.value })}}  />
                            Medium
                        </label>

                        <label>
                            <input type="radio" name="Priority" value="Low" checked={filter.priority === "Low"} 
                                onChange={(e) =>{ filterdispatch({ type: "PRIORITY", value: e.target.value })}}  />
                            Low
                        </label>
                    </section> 
                    </div>
                    {/* ----date--*/}
                    <div>
                        <label> <b className="typography-fontweight-semibold"> Sort By date : </b>  </label>
                        <section className="flex-row col-gap-1rem">
                            <label>
                                <input type="radio" name="sortbydate" value="Newest" checked={filter.sortdate === "Newest"} 
                                onChange={(e) =>{ filterdispatch({ type: "DATE_SORT", value: e.target.value })}}  /> 
                                Newest First
                           </label>
                            <label>
                                <input type="radio" name="sortbydate" value="Oldest" checked={filter.sortdate === "Oldest"} 
                                    onChange={(e) =>{ filterdispatch({ type: "DATE_SORT", value: e.target.value })}}  />
                                Oldest First
                            </label>

                        </section> 
                    </div>
                    {/* ---pin--*/}
                    <div>
                    <label> <b className="typography-fontweight-semibold"> Sort By pin : </b>  </label>
                    <section className="flex-row col-gap-1rem">
                        
                        <label>
                            <input type="radio" name="sortbypin" value="pin" checked={filter.sortpin === "pin"} 
                                onChange={(e) =>{filterdispatch({ type: "PIN_SORT", value: e.target.value })}}  />
                            pin
                        </label>

                        <label>
                            <input type="radio" name="sortbypin" value="unpin" checked={filter.sortpin === "unpin"} 
                                onChange={(e) =>{ filterdispatch({ type: "PIN_SORT", value: e.target.value })} } />
                            unpin
                        </label>

                    </section> 
                    </div>
                    {/* ---clear--*/}
                    <section>
                        <button onClick={()=>{ setshowfilter(false); filterdispatch({type:"CLEAR_FILTER"})}}> clear/close </button>
                    </section>    
                </div> : null
            }           
        </div>
    )
}

export default Filter;