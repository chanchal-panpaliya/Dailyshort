import { useReducer ,useEffect } from "react";
import NoteContext from "./NoteContext";
import NoteReducer from "./NoteReducer";
import ToastReducer from "./Toast/ToastReducer";
import NoteFilter from "./NoteFilter";
//service
import { handle_getNote ,handle_getArchiveNote,handle_getTrashNote,handle_postTrashNote} from "my-webapp/api/utility";
//auth context
import { useAuth } from "./login/AuthContext";

const NoteState =({ children })=>{
        let{token}=useAuth()
    
    //note
    const [note,dispatch] = useReducer(NoteReducer,{noteItems:[],achiveItems:[],deletedItems:[]})
    //toast
    const [toast,toastdispatch] = useReducer(ToastReducer,{showToast:false , toastList : []})
    //filter
    const [filter,filterdispatch] = useReducer(NoteFilter,{isChecked:[],priority:"",sortdate:"",search:"",sortpin:""})
    useEffect(() => {
       handle_getNote(token).then(res=>{
            note.noteItems = res
       });
       //
       handle_getArchiveNote(token).then(res=>{
        note.achiveItems = res
       })
       //
       handle_getTrashNote(token).then(res=>{
        note.deletedItems = res
       })
      },[note.noteItems,note.achiveItems,note.deletedItems]);

      
    //function
    //create note
    const handler_CreateNote=(item)=>{
        dispatch({type:"ADD_TO_NOTE",payload:item})
    }
      //edit note
    const handle_editNote=(item)=>{
        dispatch({type:"EDIT_NOTE",payload:item})
    }
    //delete note
    const handler_DeleteNote=(item)=>{
        dispatch({type:"DELETE_NOTE",payload:item}) 
    }
    //create archive note
    const handler_Achive=(item)=>{
          dispatch({type:"ADD_TO_ACHIVE",payload:item})  
    }
    //edit archive note
    const handle_EditArchive=(item)=>{
      dispatch({type:"EDIT_ACHIVE",payload:item})
    }

    const handle_RestoreArchive=(item)=>{
      dispatch({type:"RESTORE_TO_ACHIVE",payload:item})
    }

    //delete archive note
    const handler_DeleteAchive=(item)=>{
        dispatch({type:"DELETE_ACHIVE",payload:item})
    }

    
   //delete trash note

   const handle_RestoreTrash=(item)=>{
    dispatch({type:"RESTORE_NOTE_TRASH",payload:item})
  }

   const handle_deleteTrash=(item)=>{
    dispatch({type:"DELETED_NOTE_TRASH",payload:item})
  }

    //toast
   const deleteToast = (id) =>{
        toastdispatch({type:'REMOVE_TOAST',payload:id})  
    }

    return(
        <NoteContext.Provider value={{
                noteItems:note.noteItems,
                achiveItems:note.achiveItems,
                deletedItems:note.deletedItems,
                toastList : toast.toastList,
                filter,filterdispatch,
                toast,toastdispatch,
                handler_CreateNote,
                handler_DeleteNote,
                handler_Achive,
                handle_EditArchive,
                handle_RestoreArchive,
                handler_DeleteAchive,
                deleteToast ,
                handle_editNote,
                handle_RestoreTrash,
                handle_deleteTrash
            }}>
            { children }
        </NoteContext.Provider>
    )
}

export default NoteState;