const NoteReducer=(state,action)=>{
    switch(action.type){  
        //note added
        case 'ADD_TO_NOTE' :{
              return {...state,noteItems : action.payload}
        } 
        //note edit
        case 'EDIT_NOTE':{
            return {...state,noteItems : action.payload}
        } 
        //note deleted
        case 'DELETE_NOTE' :{
            return {...state,noteItems : action.payload.notes , deletedItems:action.payload.trash}
        }
        
        //add achive
        case 'ADD_TO_ACHIVE':{
            return{...state,achiveItems : action.payload}
        }
        //edit achive
        case 'EDIT_ACHIVE':{
             return{...state,achiveItems : action.payload}
        }
        case 'RESTORE_TO_ACHIVE':{
             return{...state,achiveItems : action.payload.archives,noteItems:action.payload.notes}
        }
       
        //delete note from achive
        case 'DELETE_ACHIVE' : {  
            return{...state,achiveItems : action.payload.archives , deletedItems:action.payload.trash}
        }

         // add note trash
         case 'RESTORE_NOTE_TRASH' :{
            return{...state,deletedItems : action.payload.trash ,achiveItems:action.payload.archives,noteItems:action.payload.notes}
         }


         //delete note trash
         case 'DELETED_NOTE_TRASH' :{
             return{...state,deletedItems : action.payload}
         }
        default :
        return state
    }
}

export default NoteReducer;