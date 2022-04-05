const NoteReducer=(state,action)=>{
    switch(action.type){  
        //note added
        case 'ADD_TO_NOTE' :{
              return {...state,noteItems : [...state.noteItems , action.payload]}
        }  
        //note deleted
        case 'DELETE_NOTE' :{
            return{...state,noteItems : state.noteItems.filter(item=>item.id!==action.payload)}
        }
        //note edit
        case 'EDIT_NOTE':{
            return{...state,
                    noteItems : state.noteItems.map((item)=>{
                        if(item.id === action.payload.id){
                            return action.payload
                        }else{
                            return item
                        }
                    })
                }
        }
       // add note trash
        case 'ADD_DELETED_NOTE' :{
            return{...state,deletedItems : [...state.deletedItems,action.payload]}
        }
        //delete note trash
        case 'DELETED_NOTE_TRASH' :{
            return{...state,deletedItems : state.deletedItems.filter(item=>item.id!==action.payload)}
        }
        //add achive
        case 'ADD_TO_ACHIVE':{
            const checker = state.achiveItems.find((item) => {
                                return item.id === action.payload.id;
                        });
              if(checker) {
                 return{...state,achiveItems : [...state.achiveItems]}
              }else{
                return{...state,achiveItems : [...state.achiveItems,action.payload]}
              }
        }
        //edit achive
        case 'EDIT_ACHIVE':{
            return{...state,
                achiveItems:state.achiveItems.map((item)=>{
                    if(item.id === action.payload.id){
                        return action.payload
                    }else{
                        return item
                    }
                })
             }
        }
        //delete note from achive
        case 'DELETE_ACHIVE' : {  
            return{...state,achiveItems : state.achiveItems.filter(item=>item.id!==action.payload)}  
        }
        default :
        return state
    }
}

export default NoteReducer;