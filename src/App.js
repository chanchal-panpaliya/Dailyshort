//react
import { useContext } from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'; 
//component
import Home from "./my-webapp/page/home/home";
import Login from "./my-webapp/page/auth/login";
import Register from './my-webapp/page/auth/register';
import ForgotPassword from './my-webapp/page/auth/forgotpassword';
import {Toast} from "./my-webapp/component/Toast/Toast";
import PageNotFound from "./my-webapp/page/404error/pagenotfound";
import Menu from 'my-webapp/page/menu/menu';
//css
import "./App.css";
//constext
import NoteContext from './my-webapp/context/NoteContext';
import {useAuth} from './my-webapp/context/login/AuthContext';

function App() {
  let {token} = useAuth()
  const {toastList} = useContext(NoteContext);

  return (
    <div className="App">
      <Router>
         <Routes>
              {token!==null ? 
              <>
                <Route exact path="/menu" element={<Menu/>}/>
                <Route exact path="/" element={<Menu/>}/>
                <Route  path="/login" element={<Menu/>} />
                <Route  path="/register" element={<Menu/>} />
              </>
               : 
               <>
                <Route exact path="/" element={<Home/>}/>
                <Route  path="/login" element={<Login/>} />
                <Route  path="/register" element={<Register/>} />
                <Route exact path="/menu" element={<Home/>}/> 
               </>
             }
              <Route  path="/forgotpassword" element={<ForgotPassword/>} />
              <Route exact path="*" element={<PageNotFound/>}/>
         </Routes>
        </Router>                                   
        <Toast data={toastList}/>
    </div>
  );
}

export default App;
