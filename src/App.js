//react
import { useContext } from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'; 
//component
import Home from "./my-webapp/page/home/home";
import Menu from "./my-webapp/page/menu/menu";
import Login from "./my-webapp/page/auth/login";
import Register from './my-webapp/page/auth/register';
import ForgotPassword from './my-webapp/page/auth/forgotpassword';
import {Toast} from "./my-webapp/component/Toast/Toast";
import PageNotFound from "./my-webapp/page/404error/pagenotfound";
//css
import "./App.css";
//constext
import NoteContext from './my-webapp/context/NoteContext';

function App() {
  const {toastList} = useContext(NoteContext);
  return (
    <div className="App">
      <Router>
         <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="*" element={<PageNotFound/>}/>
         </Routes>
        </Router>                                   
        <Toast data={toastList} />
    </div>
  );
}

export default App;
