//react
import { useContext,useState,useEffect} from 'react';
//context
import NoteContext from '../../../context/NoteContext';


const SetLabel=(props)=>{
    const {noteItems,handle_editNote,filter} = useContext(NoteContext);
    const [getlabel,setlabel]=useState(props.note.label);
    const handleAddlabel =(item,getlabel)=>{
        let note = {
            id:item.id,
            title : item.title,
            desc : item.desc,
            color : item.color,
            pin :item.pin,
            label:getlabel,
            priority:item.priority,
            date : item.date 
        }
        handle_editNote(note)
    }
    return(
        <>
          <div className='flex-row'>
             <input type="text" id={props.index} value={getlabel} placeholder="add label" onChange={(e)=>{setlabel(e.target.value)}}/> 
             <button onClick={()=>handleAddlabel(props.note,getlabel)}>add/edit</button>
          </div>
        </>
    )
}

export default SetLabel