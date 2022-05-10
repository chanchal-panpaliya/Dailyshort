import axios from "axios";
import { useNavigate } from "react-router-dom";

//registration
export const handleRegistration = async (e,email,password,firstname,lastname,termsAndConditions,navigator,setError) =>{
    e.preventDefault();
    try {
         await axios.post("/api/auth/signup",{
            email,password,firstname,lastname,termsAndConditions
         }).then((res) => {
            if(res.status === 200 || res.status === 201){
                console.log(res)
                localStorage.setItem("token", res.data.encodedToken );
                localStorage.setItem("user", JSON.stringify(res.data.createdUser));
                setError("Registered successfully")
                navigator('/menu')
                window.location.reload();
            }

         }).catch((error)=>{
                     if(error.response.status === 422){
                        setError("email id already exist")
                        let time = setTimeout(()=>{
                            setError("")
                          },1000)
                          return()=>clearTimeout(time)
                     }
         });
               
          } catch (error) {
              console.log(error)
              setError("Not able to registered !! check ")
              let time = setTimeout(()=>{
                setError("")
              },1000)
              return()=>clearTimeout(time)
        }
}

//login
export const handleLogin = async (e,email,password,navigator,setError) => {
    e.preventDefault();
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
                } 
            }else{
                setError("login Failed ! please try again") 
            }
         });
      } catch (error) {
          console.log("error",error)
          setError("login Failed ! please try again")
      }
};

//post note
export const handle_postNote = async (e,token,newNote,handler_CreateNote) => {
    e.preventDefault();

    try {
        await axios.post("/api/notes", { note: newNote }, { headers: { authorization: token } }).then((res)=>{
            handler_CreateNote(newNote)
       });
    } catch (error) {
        console.log(error)
    }
  }


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

//pined note
export const postNotePinService = async(token,updated_note_color,handle_editNote)=> {
    handle_editNote(updated_note_color)
    //not working
    try{
        await axios.post(`/api/notes/pin/${updated_note_color.id}`,{ note: updated_note_color },{ headers: { authorization: token } }).then((res=>{    
        }))
    
    }catch(error){
        console.log(error)
    }
}

//edit note
export const editNoteService = async (token,handle_editNote,note) =>{
    try{
       await axios.post(`/api/notes/${note.id}`, { note: note }, { headers: { authorization: token } }).then((res)=>{
            handle_editNote(note)
        })
    }catch(error){
        console.log(error)
    }
}

//delete note
export const deleteNoteService = async (token,handler_DeleteNote,data) =>{
    try{
       await axios.delete(`/api/notes/${data.id}`, { headers: { authorization: token } }).then((res)=>{
            console.log(res)
            handler_DeleteNote(data) 
        })
    }catch(error){
        console.log(error)
    }
}

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
export const handle_postArchiveNote = async (token,handler_Achive,data) => {

    try {
        await axios.post(`/api/notes/archives/${data.id}`,{ note: data}, { headers: { authorization: token } }).then((res)=>{
               handler_Achive(data)
       });
    } catch (error) {
        console.log(error)
    }
}

//restore archive note
export const handle_postRestore_ArchiveNote = async (token,data,handler_CreateNote,handler_DeleteAchive) => {   
    handler_CreateNote(data),handler_DeleteAchive(data) 
    try {
        await axios.post(`/api/archives/restore/${data.id}`, { headers: { authorization: token } }).then((res)=>{
            
       });
    } catch (error) {
        console.log(error)
    }
}

//delete archive note
export const deleteArchiveNote = async (token,handler_DeleteAchive,data) =>{
    try{
       await axios.delete(`/api/archives/delete/${data.id}`, { headers: { authorization: token } }).then((res)=>{
               handler_DeleteAchive(data) 
        })
    }catch(error){
        console.log(error)
    }
}

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

//post trash
export const handle_postTrashNote = async (token,data) => {
    try {
        await axios.post(`/notes/trash/${data.id}`, { note: data }, { headers: { authorization: token } }).then((res)=>{
       });
    } catch (error) {
        console.log(error)
    }
}

//restore deleted note
export const handle_Restore_DeletedNote = async (token,data) => {
    try {
        await axios.post(`/api/trash/restore/${data.id}`, { headers: { authorization: token } }).then((res)=>{
            
       });
    } catch (error) {
        console.log(error)
    }
}

//delete trash
export const deleteTrashNote = async (token,data) =>{
    try{
       await axios.delete(`/api/trash/delete/${data.id}`, { headers: { authorization: token } }).then((res)=>{
                  
        })
    }catch(error){
        console.log(error)
    }
}
