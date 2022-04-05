const NoteFilter=(state,action)=>{

    switch(action.type){  
        //label
        case 'TOGGLE_CHECKBOX' :{
            if(action.status) {
                const newlabelArr = state.isChecked;
                newlabelArr.push(action.payload)
                return {
                    ...state,
                    ...state.isChecked,
                    isChecked: [...new Set(newlabelArr)]
                }
            }
            if(!action.satus) {
                const newlabelArr = state.isChecked.filter((item) => item !== action.payload)
                return {
                    ...state,
                    ...state.isChecked,
                    isChecked: [...new Set(newlabelArr)]
                }
            }
        }
        //priority
        case 'PRIORITY' :{
             return{ ...state, priority : action.value}
        }
        //date
        case 'DATE_SORT':{
     
            return{...state,sortdate:action.value}
        }
        //pin
        case 'PIN_SORT':{
            return{...state,sortpin:action.value}
        }
        //clear
        case 'CLEAR_FILTER':{
            return{...state,isChecked:[],priority:"",sortdate:"",search:"",sortpin:""}
        }
        //search
        case 'SEARCH_BY_TITLE':{
            return{...state,search:action.payload}
        }
  
        default :
        return state
    }
}

export default NoteFilter;