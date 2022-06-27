import axios from "axios";


//registration
export const handleRegistration = async (email,password,firstname,lastname,termsAndConditions,navigator,setError,toastdispatch) =>{
    try {
         await axios.post("/api/auth/signup",{
            email,password,firstname,lastname,termsAndConditions
         }).then((res) => {
            if(res.status === 200 || res.status === 201){
                //console.log(res)
                localStorage.setItem("token", res.data.encodedToken );
                localStorage.setItem("user", JSON.stringify(res.data.createdUser));
                setError("Registered successfully")
                navigator('/menu')
                window.location.reload();
                toastdispatch({type:'SUCCESS',payload:"REGISTERED SUCCESSFUL"}) 
            }

         }).catch((error)=>{
                     if(error.response.status === 422){
                        setError("email id already exist")
                        toastdispatch({type:'WARNING',payload:"email id already exist"})
                        let time = setTimeout(()=>{
                            setError("")
                          },1000)
                          return()=>clearTimeout(time)
                     }
         });
               
          } catch (error) {
            
              setError("Not able to registered !! check ")
              toastdispatch({type:'DANGER',payload:"Not able to registered !!"})
              let time = setTimeout(()=>{
                setError("")
              },1000)
              return()=>clearTimeout(time)
        }
}

//login
export const handleLogin = async (email,password,navigator,setError,toastdispatch) => {
    try {
        await axios.post("/api/auth/login",{
            email,password 
        }).then((res)=>{
            if(res.status === 200){
                if(res.data){
                    localStorage.setItem("token", res.data.encodedToken );
                    localStorage.setItem("user", JSON.stringify(res.data.foundUser));
                    navigator('/menu')
                    window.location.reload();
                    toastdispatch({type:'SUCCESS',payload:"LOGIN SUCCESSFUL"})
                } 
            }else{
                setError("login Failed ! please try again") 
                toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
            }
         });
      } catch (error) {
          setError("login Failed ! please try again")
          toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
      }
};

//----------------------------------------note------------------------------------------------------------
//get all note
export const handle_getNote = async (token) => {  
  try {
      let data = [];

     data = await axios.get("/api/notes", { headers: { authorization: token } }).then((res)=>{
             return res.data.notes   
     });
     return data
  } catch (error) {
      console.log(error)
  }
}

//post note
export const handle_postNote = async (e,token,newNote,handler_CreateNote,toastdispatch) => {
    e.preventDefault();
    try {
        await axios.post("/api/notes", { note: newNote }, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 201){
                handler_CreateNote(res.data.notes)
                toastdispatch({type:'SUCCESS',payload:"Note created"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
       });
    } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
  }


//edit note
export const editNoteService = async (token,handle_editNote,note,toastdispatch) =>{
    try{
       await axios.post(`/api/notes/${note._id}`, { note: note }, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 201){
                handle_editNote(res.data.notes)
                toastdispatch({type:'SUCCESS',payload:"Note Edited"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
        })
    }catch(error){
        toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

//delete note
export const deleteNoteService = async (token,handler_DeleteNote,data,toastdispatch) =>{
    try{
       await axios.delete(`/api/notes/${data._id}`, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 200){
                handler_DeleteNote(res.data) 
                toastdispatch({type:'DANGER',payload:"Note deleted"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
        })
    }catch(error){
       toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

//----------------------------------------archive------------------------------------------------------------
//get all note
export const handle_getArchiveNote = async (token) => {  
    try {
        let data = [];
       data = await axios.get("/api/archives", { headers: { authorization: token } }).then((res)=>{
               return res.data.archives   
       });
       return data
    } catch (error) {
        console.log(error)
    }
  }

//post archive note
export const handle_postArchiveNote = async (token,handler_Achive,data,toastdispatch) => {

    try {
        await axios.post(`/api/notes/archives/${data._id}`,{ note: data}, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 201){
               handler_Achive(res.data.archives)
               toastdispatch({type:'SUCCESS',payload:"Note moved to archived list"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"}) 
            }
       });
    } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

//edit archive note
export const handle_updateArchivesNote = async(token,handle_EditArchive,note,toastdispatch)=>{
        try{
           await axios.post(`/api/archives/${note._id}`, { note: note }, { headers: { authorization: token } }).then((res)=>{
                if(res.status === 200){
                    handle_EditArchive(res.data.archives)
                    toastdispatch({type:'SUCCESS',payload:"Archived Note Updated"})
                }else{
                    toastdispatch({type:'DANGER',payload:"ERROR!!!"}) 
                }
            })
        }catch(error){
            toastdispatch({type:'DANGER',payload:"ERROR!!!"})
        }
}

//restore archive note
export const handle_postRestore_ArchiveNote = async (token,data,handle_RestoreArchive,toastdispatch) => {   
     
    try {
        await axios.post(`/api/archives/restore/${data._id}`,{ note: data}, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 200){
                handle_RestoreArchive(res.data)
                toastdispatch({type:'SUCCESS',payload:"Archived Note Restored"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
       });
    } catch (error) {
       toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

//delete archive note
export const deleteArchiveNote = async (token,handler_DeleteAchive,data,toastdispatch) =>{
    try{
       await axios.delete(`/api/archives/delete/${data._id}`, { headers: { authorization: token } }).then((res)=>{

            if(res.status === 200){       
                handler_DeleteAchive(res.data) 
                toastdispatch({type:'DANGER',payload:"Archive note deleted"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }

        })
    }catch(error){
        toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

/**---------------------------------------trash------------------------------------------------------- */

//fetch trash
export const handle_getTrashNote = async (token) => {  
    try {
        let data = [];
       data = await axios.get("/api/trash", { headers: { authorization: token } }).then((res)=>{
               return res.data.trash   
       });
       return data
    } catch (error) {
       console.log(error)
    }
  }

//restore deleted note
export const handle_Restore_DeletedNote = async (token,data,handle_RestoreTrash,toastdispatch) => {
    try {
        await axios.post(`/api/trash/restore/${data._id}`,{}, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 201){ 
                handle_RestoreTrash(res.data)
                toastdispatch({type:'SUCCESS',payload:"Trash Note Restored"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
       });
    } catch (error) {
        toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}

//delete trash
export const handle_deleteTrashNote = async (token,data,handle_deleteTrash,toastdispatch) =>{
    try{
       await axios.delete(`/api/trash/delete/${data._id}`, { headers: { authorization: token } }).then((res)=>{
            if(res.status === 200){
                handle_deleteTrash(res.data.trash)
                toastdispatch({type:'DANGER',payload:"Trash deleted"})
            }else{
                toastdispatch({type:'DANGER',payload:"ERROR!!!"})
            }
        })
    }catch(error){
       toastdispatch({type:'DANGER',payload:"ERROR!!!"})
    }
}
