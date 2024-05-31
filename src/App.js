import { useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AddFood from './pages/AddFood';
import UpdateFood from './pages/UpdateFood';
import Logout from './pages/Logout';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'; 
import GuestNav from './components/NavBar/GuestNav';
import AdminNav from './components/NavBar/AdminNav';
import UserNav from './components/NavBar/UserNav';
import AuthContext from './context/AuthContext';
import AuthContextProvider from './context/AuthState';
import DisplayFood from './pages/Item/DisplayFood';
import KhaltiPayment from './pages/payment/KhaltiPayment';
import SearchFood from './pages/SearchFood/SearchFood';
import PaymentPage from './pages/payment/PaymentPage';
import DisplayAllUser from './pages/User/DisplayAllUser';
import BookMovie from './pages/movies/BookMovie';
import MovieDetails from './pages/movies/MovieDetails';
import SuccessPage from './pages/payment/SuccessPage';

const NavElement=()=>{
  const{authenticated,role}=useContext(AuthContext);
  let navbar;
  if(!authenticated){
    navbar=<GuestNav/>
  }
  else{
    switch(role){
      case 'admin':
        navbar=<AdminNav/>
        break;
      case 'customer':
        navbar=<UserNav/>
        break;
      default:
        navbar=<GuestNav/>
        break;
    }
  }
  return navbar;
}
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavElement/>}> 
     <Route index element={<Home/>}/> 
     <Route path="/about" element={<About/>}/> 
     <Route path="/signUp" element={<SignUp/>}/> 
     <Route path="/login" element={<Login/>}/>
     <Route path="/addMovie" element={<AddFood/>}/>
     <Route path="/updateMovie/:id" element={<UpdateFood/>}/>
     <Route path="/logout" element={<Logout/>}/>
     <Route path="/displayMovie" element={<DisplayFood/>}/>
     <Route path="/payment" element={<KhaltiPayment/>}/>
     <Route path="/searchFood" element={<SearchFood/>}/>
     <Route path="/paymentPage" element={<PaymentPage/>}/>
     <Route path="/displayAllUser" element={<DisplayAllUser/>}/>
     <Route path="/bookMovie/:id/:time" element={<BookMovie/>}/>
     <Route path="/movieDetails/:id" element={<MovieDetails/>}/>
     <Route path="/khaltiPayment" element={<KhaltiPayment/>}/>
     <Route path="/success" element={<SuccessPage/>}/>
    </Route>
    )
)

function App() {
  return (
    <>
    <AuthContextProvider > 
    <RouterProvider router={router}/>
    </AuthContextProvider>
    
    </>
          
  );
}

export default App;
