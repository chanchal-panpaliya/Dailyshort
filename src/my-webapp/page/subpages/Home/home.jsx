//react
import { useContext,useState ,useEffect} from 'react';
import moment from 'moment';
import { v4 as uuid } from "uuid";
//component
import { Card } from '../../../component/Card/Card';
//css
import "../index.css";
//context
import NoteContext from '../../../context/NoteContext';
import {getLabelNote,getPriority,getdate,getSearchCart,getpin} from '../../subpages/utility/filterutility';
//draf-js
import { convertToRaw, EditorState ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Note_Home = () =>{
    const {noteItems,handler_CreateNote,filter} = useContext(NoteContext);
    const [gettext,settext]=useState("")
    const [getDesc,setDesc]=useState("")
    const [getcolor,setColor]=useState("#555555")
    const [get_pin,setPined]=useState(false)
    const [getpriority,setpriority]=useState("")
    const [editorState,seteditorState] = useState(EditorState.createEmpty())
    const [rawMessage,setrawMessage]=useState("")
    //function
    const LabelNote = getLabelNote(noteItems,filter.isChecked);
    const PriorityNote = getPriority(LabelNote,filter.priority);
    const SortBydateNote = getdate(PriorityNote,filter.sortdate);
    const SortBypin = getpin(SortBydateNote,filter.sortpin)
    const SearchByTitle = getSearchCart(SortBypin,filter.search);
    //

    useEffect(()=>{
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    },[])
    
    //constant 
    let note = {
        id:uuid(),
        title : gettext,
        desc : editorState,
        color : getcolor,
        pin :get_pin,
        label:"",
        priority:getpriority,
        date : moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    }

    
    const wrapperStyle = {
        border: '1px solid #969696',
        color:'black',
    }

    const editorStyle = {
        height:'5rem',
        padding:'1rem',
        background: 'white',
    }

    const clearnote=()=>{
        window.location.reload(); // clear fun not working - draft.js added reload for temp based
        settext("")
        setColor("#555555")
        setpriority("")
        setPined(false)
        seteditorState(EditorState.createEmpty());
    }

    const onEditorStateChange =(editorState)=>{
        seteditorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

  
    return(
        <div className='flex-col flex-justify-content-center flex-align-item-center row-gap-1rem typology-padding-top'>
            <div className="notes-form">
                <input type="text" placeholder='title' value={gettext} onChange={(e)=>{settext(e.target.value)}}/>
               <div className='draft-editor'> 
                    <Editor
                        initialEditorState={editorState}
                        wrapperStyle={wrapperStyle}
                        editorStyle={editorStyle}                                                                            
                        onEditorStateChange={onEditorStateChange}
                        placeholder='add description'
                    />
                </div>
                <div className='flex-row col-gap-1rem flex-justify-content-center flex-align-item-center'> 
                    {
                      gettext!=="" && editorState!=="" ? 
                      <>
                           select background color:  
                           <input type="color" value={getcolor} onChange={(e)=>{setColor(e.target.value)}} /> 
                           <label> 
                                <input type="checkbox" name="pin" value={get_pin} checked={get_pin===true} onChange={(e)=>{setPined(!get_pin)}}/> 
                                pined
                           </label>
                           <div>
                                <label> <span className='forth'>*</span> Priority : </label>
                                <label>
                                    <input type="radio" name="Priority" value="High" onChange={(e)=>{setpriority(e.target.value)}}/>
                                    High
                                </label>
                                <label>
                                    <input type="radio" name="Priority" value="Medium" onChange={(e)=>{setpriority(e.target.value)}}/> 
                                    Medium
                                </label>
                                <label>
                                    <input type="radio" name="Priority" value="Low" onChange={(e)=>{setpriority(e.target.value)}}/> 
                                    Low
                                </label>
                           </div>
                           
                      </>:null
                    }
                 </div>
                 {gettext && editorState && getpriority && (
                    <button 
                        className={ (gettext==="" && editorState==="") ? "button button-outline-primary disabled-button-pointer":
                                                                    'button button-outline-primary button-onhover-fillbackground'} 
                        disabled={gettext==="" && editorState===""}
                        onClick={()=>{handler_CreateNote(note);clearnote()}}> Add Note 
                    </button>
                )}
            </div>
            {SearchByTitle.length>0?<h3> PINNED </h3>:null}
                <div className='typology-padding-top grid-note-cart'>
                  {SearchByTitle.length>0 && SearchByTitle.map((item,index)=>{
                    return item.pin===true? <Card data={item}/>:null  
                  })}
                </div>
            {SearchByTitle.length>0?<h3> OTHERS </h3>:null}
            <div className='typology-padding-top grid-note-cart'>
                  {SearchByTitle.length>0 && SearchByTitle.map((item,index)=>{
                         return item.pin===false ?  <Card data={item}/> : null
                  })}
            </div>
        </div>
    )
} 

export default Note_Home;