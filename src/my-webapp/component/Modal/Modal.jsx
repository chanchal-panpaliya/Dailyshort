import "./Modal.css";
import "../../page/subpages/index.css";
import { useState ,useContext ,useEffect} from "react";
import NoteContext from "../../context/NoteContext";
//draf-js
import { convertToRaw, EditorState ,convertFromHTML ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor  } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//context
import { useTheme } from '../../context/theme-context';
import { useAuth } from "my-webapp/context/login/AuthContext";
//service
import { editNoteService,handle_deleteTrashNote ,handle_updateArchivesNote} from "my-webapp/api/utility";

//modal edit
export const Modal =(props)=>{
    let {token} = useAuth()
    let {handle_editNote,toastdispatch} = useContext(NoteContext)
    const { darkTheme } = useTheme();
    //function
    const [gettext,settext]=useState(props.data.title)
    const [getDesc,setDesc]=useState(props.data.desc)
    const [getcolor,setColor]=useState(props.data.color)
    const [getpin,setPined]=useState(props.data.pin)
    const [getpriority,setpriority]=useState(props.data.priority)
    //draf
    const blocksFromHtml = htmlToDraft(props.data.desc);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorDataState = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = useState(editorDataState);
    let note = {
        id:props.data.id,
        title : gettext,
        desc : draftToHtml(convertToRaw(editorState.getCurrentContent())),
        color : getcolor,
        pin :getpin,
        label:props.data.label,
        priority:getpriority,
        date : props.data.date ,
        _id:props.data._id
    }
    const wrapperStyle = {
        border: '1px solid #969696',
    }
    const editorStyle = {
        height:'5rem',
        padding:'1rem'
    }
    const onEditorStateChange = (editorStateData) => {
        setEditorState(editorStateData);
    };
    return(
        <div className='modal'>
            <div className="modal-container">  
                <div className='modal-right-side'>
                    <div className='modal-right-flex-row'>
                    <div className="notes-form" style={{color:darkTheme?"black":"black"}}>
                        <input type="text" placeholder='title' value={gettext} onChange={(e)=>{settext(e.target.value)}}/>
                    <div className="modal-draft-editor"> 
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperStyle={wrapperStyle}
                        editorStyle={editorStyle}                                                                         
                        placeholder='add description'
                    />
                </div>
                <div className='flex-row col-gap-1rem flex-justify-content-center flex-align-item-center typography-padding-top-right-bottom-left'> 
                    {
                      gettext!=="" && getDesc!=="" ? 
                      <>
                          select color:  <input type="color" value={getcolor} onChange={(e)=>{setColor(e.target.value)}} /> 
                          <label> 
                                <input type="checkbox" name="pin" value={getpin} checked={getpin===true} onChange={(e)=>{setPined(!getpin)}}/> 
                                pined
                          </label>
                          <div>
                            <label> Priority : </label>
                            <label>
                                <input type="radio" name="Priority" value="High" checked={getpriority==="High"} onChange={(e)=>{setpriority(e.target.value)}}/>
                                High
                            </label>
                            <label>
                                <input type="radio" name="Priority" value="Medium" checked={getpriority==="Medium"} onChange={(e)=>{setpriority(e.target.value)}}/> 
                                Medium
                            </label>
                            <label>
                                <input type="radio" name="Priority" value="Low" checked={getpriority==="Low"} onChange={(e)=>{setpriority(e.target.value)}}/> 
                                Low
                            </label>
                          </div> 
                      </>:null
                    }
                 </div>
                 <div className="flex-row col-gap-1rem flex-justify-content-center flex-align-item-center typography-padding-top-right-bottom-left">
                    <button 
                            className={ 
                                (gettext==="" && getDesc==="") ?
                                "button button-outline-primary disabled-button-pointer":
                                'button button-outline-primary button-onhover-fillbackground'} 
                            disabled={gettext==="" && getDesc===""}
                            onClick={()=>{editNoteService(token,handle_editNote,note,toastdispatch); props.modalClose() }}
                            > Edit Note 
                    </button>
                    <button 
                            className={ 
                                (gettext==="" && getDesc==="") ?
                                "button button-outline-primary disabled-button-pointer":
                                'button button-outline-primary button-onhover-fillbackground'} 
                            disabled={gettext==="" && getDesc===""}
                            onClick={props.modalClose}
                            > Cancel 
                    </button>
                </div>
            </div>   
            </div> 
            </div>
            <i className='material-icons modal-close-modal' onClick={props.modalClose}> close </i>
        </div>
    </div> 
    )
}

//modal confirm
export const Modal_Confirm =(props)=>{
    let {handle_deleteTrash,toastdispatch} = useContext(NoteContext)
    let {token} = useAuth()
   return(
    <div className='modal'>
    <div className="modal-container">  
        <div className='modal-right-side'>
            <div className='modal-right-flex-row'>
                <div className="flex-col">
                    <section> Do you want to delete this note permeantly?  </section>
                    <section> 
                        <small>
                            Note: If this note was saved in the archive list, then the note will be deleted only from the note list, not the archive list.
                        </small>
                    </section>
                    <section className="flex-row col-gap-1rem flex-justify-content-center flex-align-item-center">  
                        <button 
                           className="button button-outline-primary button-onhover-fillbackground"
                           onClick={()=>{handle_deleteTrashNote(token,props.data,handle_deleteTrash,toastdispatch);props.modalClose()}}> Yes </button>
                        <button className="button button-outline-primary button-onhover-fillbackground" onClick={props.modalClose}> No </button>
                    </section>
                </div>
            </div> 
        </div>
        <i className='material-icons modal-close-modal' onClick={props.modalClose}> close </i>
    </div>
</div> 
   )
}

//modal archive edit
export const Modal_Archive =(props)=>{
    //context
    let {token} = useAuth()
    let {handle_EditArchive,toastdispatch} = useContext(NoteContext)
    const { darkTheme } = useTheme();
    //state
    const [gettext,settext]=useState(props.data.title)
    const [getDesc,setDesc]=useState(props.data.desc)
    const [getcolor,setColor]=useState(props.data.color)
    const [getpin,setPined]=useState(props.data.pin)
    const [getpriority,setpriority]=useState(props.data.priority)
    const [getlabel,setlabel]=useState(props.data.label)
    //draf
    const blocksFromHtml = htmlToDraft(props.data.desc);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorDataState = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = useState(editorDataState);
    //constant
    const update_note = {
        id:props.data.id,
        title : gettext,
        desc : draftToHtml(convertToRaw(editorState.getCurrentContent())),
        color : getcolor,
        pin :getpin,
        label:getlabel,
        priority:getpriority,
        date : props.data.date ,
        _id:props.data._id
    }
    const wrapperStyle = {
        border: '1px solid #969696',
        color:'black',
    }
    const editorStyle = {
        height:'5rem',
        padding:'1rem',
        background: 'white'
    }
    //function
    const onEditorStateChange = (editorStateData) => {
        setEditorState(editorStateData);
    };
    return(
        <div className='modal'>
        <div className="modal-container">  
            <div className='modal-right-side'>
                <div className='modal-right-flex-row'>
                    <div className="notes-form" style={{color:darkTheme?"black":"black"}}>
                        <input type="text" placeholder='title' value={gettext} onChange={(e)=>{settext(e.target.value)}}/>
                        <div className="modal-draft-editor"> 
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                wrapperStyle={wrapperStyle}
                                editorStyle={editorStyle}                                                                         
                                placeholder='add description'
                            />
                        </div>
                        <div className='flex-row col-gap-1rem flex-justify-content-center flex-align-item-center typography-padding-top-right-bottom-left'> 
                        {
                         gettext!=="" && getDesc!=="" ? 
                           <>
                                select color:  <input type="color" value={getcolor} onChange={(e)=>{setColor(e.target.value)}} /> 
                                <label> 
                                        <input type="checkbox" name="pin" value={getpin} checked={getpin===true} onChange={(e)=>{setPined(!getpin)}}/> 
                                        pined
                                </label>
                                <div>
                                    <label> Priority : </label>
                                    <label>
                                        <input type="radio" name="Priority" value="High" checked={getpriority==="High"} onChange={(e)=>{setpriority(e.target.value)}}/>
                                        High
                                    </label>
                                    <label>
                                        <input type="radio" name="Priority" value="Medium" checked={getpriority==="Medium"} onChange={(e)=>{setpriority(e.target.value)}}/> 
                                        Medium
                                    </label>
                                    <label>
                                        <input type="radio" name="Priority" value="Low" checked={getpriority==="Low"} onChange={(e)=>{setpriority(e.target.value)}}/> 
                                        Low
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        label
                                        <input type="text" value={getlabel} onChange={(e)=>{setlabel(e.target.value)}}/>
                                        
                                    </label>
                                </div> 
                            </>:null
                        }
                    </div>
                    <div className="flex-row col-gap-1rem flex-justify-content-center flex-align-item-center typography-padding-top-right-bottom-left">
                    <button 
                            className={ 
                                (gettext==="" && getDesc==="") ?
                                "button button-outline-primary disabled-button-pointer":
                                'button button-outline-primary button-onhover-fillbackground'} 
                            disabled={gettext==="" && getDesc===""}
                            onClick={()=>{
                                handle_updateArchivesNote(token,handle_EditArchive,update_note,toastdispatch); props.modalClose() }}
                            > Edit Note 
                    </button>

                    <button 
                            className={ 
                                (gettext==="" && getDesc==="") ?
                                "button button-outline-primary disabled-button-pointer":
                                'button button-outline-primary button-onhover-fillbackground'} 
                            disabled={gettext==="" && getDesc===""}
                            onClick={props.modalClose}
                            > Cancel 
                    </button>
                    </div>
                  </div>   
                </div> 
             </div>
            <i className='material-icons modal-close-modal' onClick={props.modalClose}> close </i>
        </div>
    </div> 
    )
}