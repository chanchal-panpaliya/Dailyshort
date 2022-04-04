import axios from "axios";

//registration
export async function handleRegistration(data){
    
    try {
        console.log(data)

         await axios.post("/api/auth/signup",data).then((res) => console.log(res));

          } catch (error) {
              console.log(error)
        }
}

//login
export const handleLogin = async ({e,email,password,setFormData}) => {
    e.preventDefault();
    try {
     await axios.post('/api/auth/login', {
          email,
          password
        }).then((res)=>
             console.log(res)
        );
      } catch (error) {
          console.log(error)
      }

  };