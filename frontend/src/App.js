
import './App.css';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import  LogIn  from './components/Login';
import Home from './components/Home';
import {Routes, Route} from "react-router-dom";
import CreateBlog from './components/CreateBlog';
import IndividualBlog from './components/IndividualBlog';
import UpdateBlog from './components/UpdateBlog';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/signup" element={<RegistrationForm />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/createblog' element={<CreateBlog />}/>
        <Route path='/blog/:id' element={<IndividualBlog />}/>
        <Route path='/update/:id' element={<UpdateBlog />}/>
      </Routes>
    </div>
  );
}

export default App;
