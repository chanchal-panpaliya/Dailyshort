import { useReducer ,useEffect } from "react";
import NoteContext from "./NoteContext";
import NoteReducer from "./NoteReducer";
import ToastReducer from "./Toast/ToastReducer";
import NoteFilter from "./NoteFilter";


const NoteState =({ children })=>{
        
      const noteItems=
          localStorage.getItem("notelist") == null
            ? []
            : JSON.parse(localStorage.getItem("notelist"))
    
      const achiveItems =
          localStorage.getItem("achivelist") == null
            ? []
            : JSON.parse(localStorage.getItem("achivelist"))
      
      const deletedItems =
          localStorage.getItem("trashlist") == null
            ? []
            : JSON.parse(localStorage.getItem("trashlist"))
    
    //note
    const [note,dispatch] = useReducer(NoteReducer,{noteItems,achiveItems,deletedItems})
    //toast
    const [toast,toastdispatch] = useReducer(ToastReducer,{showToast:false , toastList : []})
    //filter
    const [filter,filterdispatch] = useReducer(NoteFilter,{isChecked:[],priority:"",sortdate:"",search:"",sortpin:""})
    useEffect(() => {
        localStorage.setItem("notelist", JSON.stringify(note.noteItems));
        localStorage.setItem("achivelist", JSON.stringify(note.achiveItems));
        localStorage.setItem("trashlist", JSON.stringify(note.deletedItems));
      }, [note.noteItems,note.achiveItems,note.deletedItems]);
    //function
    //create note
    const handler_CreateNote=(item)=>{
        dispatch({type:"ADD_TO_NOTE",payload:item})
        toastdispatch({type:'SUCCESS',payload:"Note created"})
    }
      //edit note
    const handle_editNote=(item)=>{
        dispatch({type:"EDIT_NOTE",payload:item})
        toastdispatch({type:'SUCCESS',payload:"Note edited"})
    }
    //delete note
    const handler_DeleteNote=(item)=>{
        dispatch({type:"DELETE_NOTE",payload:item.id}) 
        dispatch({type:"ADD_DELETED_NOTE",payload:item})
        toastdispatch({type:'WARNING',payload:"Note added trash memory"})
    }
    //create archive note
    const handler_Achive=(item)=>{
        const checker = note.achiveItems.find((list) => {
          return list.id === item.id;
        });
        if(checker){
          toastdispatch({type:'INFO',payload:"Note already added in achive list"})
        }else{
          dispatch({type:"ADD_TO_ACHIVE",payload:item})
          toastdispatch({type:'SUCCESS',payload:"Note added to achived list"})
          dispatch({type:"DELETE_NOTE",payload:item.id})
        }   
    }
    //edit archive note
    const handle_EditArchive=(item)=>{
      dispatch({type:"EDIT_ACHIVE",payload:item})
      toastdispatch({type:'SUCCESS',payload:"Archive Note edited"})
    }
    //delete archive note
    const handler_DeleteAchive=(item)=>{
        dispatch({type:"DELETE_ACHIVE",payload:item.id})
        toastdispatch({type:'DANGER',payload:"Note removed from achived"})
    }

   //delete trash note
   const handle_deleteTrash=(item)=>{
    dispatch({type:"DELETED_NOTE_TRASH",payload:item.id})
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
                handler_CreateNote,
                handler_DeleteNote,
                handler_Achive,
                handle_EditArchive,
                handler_DeleteAchive,
                deleteToast ,
                handle_editNote,
                handle_deleteTrash
            }}>
            { children }
        </NoteContext.Provider>
    )
}

export default NoteState;