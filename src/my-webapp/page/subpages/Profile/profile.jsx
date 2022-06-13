import './profile.css';
import { useAuth } from 'my-webapp/context/login/AuthContext';
const Note_Profile = () =>{
    let {user} =useAuth()
    return(
        <div className='page-container'>
           <div className='page-data-display'>
               <header className='like-page-header'>
                   <span className='like-page-round-circle'> 
                       {user.firstName[0] || user.firstname[0]}
                   </span>
                  
               </header>
               <section className='like-page-body'>
               <div className="table">
                    <div className='row-table'>
                        <div className='column-table'> <b> FirstName </b> </div>
                        <div className='column-table'> {user.firstName || user.firstname}</div>
                    </div>
                    <div className='row-table'>
                        <div className='column-table'> <b> LastName </b> </div>
                        <div className='column-table'> {user.lastName || user.lastname}</div>
                    </div>  
                    <div className='row-table'>
                        <div className='column-table'> <b> Email-id </b> </div>
                        <div className='column-table'> {user.email}</div>
                    </div>
                </div>
               </section>
          </div>
        </div>
    )
} 

export default Note_Profile