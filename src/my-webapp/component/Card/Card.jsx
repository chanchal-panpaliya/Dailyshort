//react
import { useContext,useState,useEffect } from 'react';
import moment from 'moment';
//context
import NoteContext from '../../context/NoteContext';
import { useTheme } from '../../context/theme-context';
//css
import './Card.css';
import '../../page/subpages/index.css';
//component
import {Modal,Modal_Confirm,Modal_Archive} from '../Modal/Modal';

export const Card = (props) =>{
    const {handler_DeleteNote,handler_Achive,handle_editNote} = useContext(NoteContext);
    const { darkTheme } = useTheme();
    const [showmodal,set_showmodal]=useState(false);
    const [getcolor,setcolor]=useState(props.data.color);
    const [getpin,setpin]=useState(props.data.pin);


    const handlechangecolor =(e)=>{
        setcolor(e.target.value)
        let updated_note_color = {
            id:props.data.id,
            title : props.data.title,
            desc : props.data.desc,
            color : e.target.value,
            pin :props.data.pin,
            label:props.data.label,
            priority:props.data.priority,
            date : props.data.date 
        }
        handle_editNote(updated_note_color)
    }

    const handleeditpin=(e)=>{
        setpin(!props.data.pin)
        let updated_note_color = {
            id:props.data.id,
            title : props.data.title,
            desc : props.data.desc,
            color : props.data.color,
            pin :!props.data.pin,
            label:props.data.label,
            priority:props.data.priority,
            date : props.data.date 
        }
        handle_editNote(updated_note_color)
    }

  return(
      <div>
        <div className="card-body" style={{backgroundColor:props.data.color,boxShadow:darkTheme?"1px 1px 10px 1px rgb(237 234 239)":""}} > 
          <div className="flex-col"> 
                <div className='flex-row card-footer-icon'>
                        <div className="card-header typography-padding-5px"> 
                            <i class="material-icons card-icon-size">event_note</i>  
                        </div>
                        <div>
                            {props.data.pin?
                            <i style={{color:"yellow"}} class="fa fa-thumb-tack" onClick={handleeditpin}></i> : 
                            <i  class="fa fa-thumb-tack" onClick={handleeditpin}></i>
                            }
                        </div>
                </div>
                <div className="typography-h4 typography-fontweight-bold typography-padding-5px note-title"> 
                        {props.data.title} 
                </div>
                <div className="typography-padding-5px"> 
                        <div className='description' dangerouslySetInnerHTML={{__html:props.data.desc}}></div>
                </div>
           </div>
           <div className='typography-padding-5px'> 
                {props.data.label!==""? 
                    <span class="badge badge-primary font-size-date">{props.data.label}</span>
                    : 
                    null} 
            </div>
            <div className='flex-row card-footer-icon typography-padding-5px'>    
                <small className='font-size-date'> Created on {moment(props.data.date).format("DD/MM/YYYY")} </small>
                <small className='flex-row col-gap-1rem'>
                    <input className='color-input' type="color" value={props.data.color} onChange={handlechangecolor} />
                    <i className="material-icons curser-pointer icon-note-hover " onClick={()=>{set_showmodal(!showmodal)}}> edit </i>
                    <i className="material-icons curser-pointer icon-note-hover " onClick={()=>handler_Achive(props.data)}>archive</i> 
                    <i className="material-icons curser-pointer icon-note-hover " onClick={()=>handler_DeleteNote(props.data)} >delete</i>
                </small>
            </div> 
            {props.data.priority!=="" ? <>
                <div className='flex-row card-footer-icon'>
                    <small className='flex-row flex-justify-content-center flex-align-item-center'> 
                        {props.data.priority==="High" ? <i style={{color:"Red"}} class="fa-solid fa-circle"></i> : null}
                        {props.data.priority==="Medium" ? <i style={{color:"Green"}} class="fa-solid fa-circle"></i> : null}
                        {props.data.priority==="Low" ? <i style={{color:"Yellow"}} class="fa-solid fa-circle"></i> : null}
                        <label class="badge"> {props.data.priority} </label>  
                    </small>
                </div>
                </>
                :null} 
            </div>
          {showmodal? <Modal data={props.data} modalClose={()=>set_showmodal(false)} /> : null}                                                                                                                                                                     
      </div>
  )
}


export const Achive_Card = (props) =>{
    const {handler_DeleteAchive,handle_EditArchive,handler_CreateNote} = useContext(NoteContext);
    const { darkTheme } = useTheme();
    const [showmodal,set_showmodal]=useState(false);
    const [getcolor,setcolor]=useState(props.data.color);
    const [getpin,setpin]=useState(props.data.pin);

    const handlechangecolor =(e)=>{
        setcolor(e.target.value)
        let updated_note_color = {
            id:props.data.id,
            title : props.data.title,
            desc : props.data.desc,
            color : e.target.value,
            pin :props.data.pin,
            label:props.data.label,
            priority:props.data.priority,
            date : props.data.date 
        }
        handle_EditArchive(updated_note_color)
    }

    const handleeditpin=(e)=>{
        setpin(!props.data.pin)
        let updated_note_color = {
            id:props.data.id,
            title : props.data.title,
            desc : props.data.desc,
            color : props.data.color,
            pin :!props.data.pin,
            label:props.data.label,
            priority:props.data.priority,
            date : props.data.date 
        }
        handle_EditArchive(updated_note_color)
    }

  return(
      <div>
        <div className="card-body" style={{backgroundColor:props.data.color,boxShadow:darkTheme?"1px 1px 10px 1px rgb(237 234 239)":""}}> 
          <div className="flex-col"> 
                <div className='flex-row card-footer-icon'>
                        <div className="card-header typography-padding-5px"> 
                            <i class="material-icons card-icon-size">event_note</i>  
                        </div>
                        <div>
                            {props.data.pin?
                            <i style={{color:"yellow"}} class="fa fa-thumb-tack" onClick={handleeditpin}></i> : 
                            <i  class="fa fa-thumb-tack" onClick={handleeditpin}></i>
                            }
                        </div>
                </div>
                <div className="typography-h4 typography-fontweight-bold typography-padding-5px note-title"> 
                        {props.data.title} 
                </div>
                <div className="typography-padding-5px"> 
                    <div className='description' dangerouslySetInnerHTML={{__html:props.data.desc}}></div>
                </div>
          </div>
          <div className='typography-padding-5px'> 
                {props.data.label!==""? <span class="badge badge-primary font-size-date">{props.data.label}</span>: null} 
          </div>
          <div className='flex-row card-footer-icon typography-padding-5px'>    
            <small className='font-size-date'>Created on {moment(props.data.date).format("DD/MM/YYYY")} </small>
            <small className='flex-row col-gap-1rem'>
                <input className='color-input' type="color" value={props.data.color} onChange={handlechangecolor} />
                <i className="material-icons curser-pointer icon-note-hover" onClick={()=>{set_showmodal(!showmodal)}}> edit </i>
                <i className="material-icons curser-pointer icon-note-hover" onClick={()=>handler_DeleteAchive(props.data)}>delete</i>
                <i className="material-icons curser-pointer icon-note-hover" onClick={()=>{handler_CreateNote(props.data),handler_DeleteAchive(props.data)}}>undo</i>
            </small>
        </div>
        {props.data.priority!=="" ? <>
            <div className='flex-row card-footer-icon typography-padding-5px'>
                <small className='flex-row flex-justify-content-center flex-align-item-center'> 
                    {props.data.priority==="High" ? <i style={{color:"Red"}} class="fa-solid fa-circle"></i> : null}
                    {props.data.priority==="Medium" ? <i style={{color:"Green"}} class="fa-solid fa-circle"></i> : null}
                    {props.data.priority==="Low" ? <i style={{color:"Yellow"}} class="fa-solid fa-circle"></i> : null}
                    <label class="badge"> {props.data.priority} </label>  
                </small>
            </div>
            </>:""} 
            </div>  
            {showmodal? <Modal_Archive data={props.data} modalClose={()=>set_showmodal(false)} /> : null}                                                                                                                                                                             
      </div>
  )
}

export const Trash_Card = (props) =>{
    const [showmodal,set_showmodal]=useState(false);
    const { darkTheme } = useTheme();
    let {handle_deleteTrash,handler_CreateNote} = useContext(NoteContext);
  return(
      <div>
        <div className="card-body" style={{backgroundColor:props.data.color,boxShadow:darkTheme?"1px 1px 10px 1px rgb(237 234 239)":""}}> 
          <div className="flex-col"> 
              <div className='flex-row card-footer-icon'>
                    <div className="card-header typography-padding-5px"> 
                        <i class="material-icons card-icon-size">event_note</i>  
                    </div>
                    <div>
                        {props.data.pin?<i style={{color:"yellow"}} class="fa fa-thumb-tack"></i> : ""}
                    </div>
              </div>
              <div className="typography-h4 typography-fontweight-bold typography-padding-5px note-title"> 
                    {props.data.title} 
              </div>
              <div className="typography-padding-5px"> 
                <div className='description' dangerouslySetInnerHTML={{__html:props.data.desc}}></div>
              </div>
          </div>
          <div className='typography-padding-5px'> 
                    {props.data.label!==""? 
                         <span class="badge badge-primary font-size-date">{props.data.label}</span>
                        : 
                     null} 
           </div>
            <div className='flex-row card-footer-icon typography-padding-5px'>    
                <small className='font-size-date'> Created on {moment(props.data.date).format("DD/MM/YYYY")} </small>
                <small className='flex-row col-gap-1rem'>
                    <i className="material-icons curser-pointer" onClick={()=>{set_showmodal(!showmodal)}}>delete</i>
                    <i className="material-icons curser-pointer" onClick={()=>{handler_CreateNote(props.data),handle_deleteTrash(props.data)}}>undo</i>
                </small>
            </div>
            {props.data.priority!=="" ? <>
                <div className='flex-row card-footer-icon typography-padding-5px'>
                    <small className='flex-row flex-justify-content-center flex-align-item-center'> 
                       {props.data.priority==="High" ? <i style={{color:"Red"}} class="fa-solid fa-circle"></i> : null}
                       {props.data.priority==="Medium" ? <i style={{color:"Green"}} class="fa-solid fa-circle"></i> : null}
                       {props.data.priority==="Low" ? <i style={{color:"Yellow"}} class="fa-solid fa-circle"></i> : null}
                        <label class="badge"> {props.data.priority} </label>  
                    </small>
                </div>
                </>
            :""} 
            </div> 
            {showmodal? <Modal_Confirm data={props.data} modalClose={()=>set_showmodal(false)}/> :null}                                                                                                                                                                    
      </div>
  )
}



