import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Profile from './pages/Profile'
import NotFound404 from './pages/NotFound404';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Contact from './pages/Contact';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import ListingDetails from './pages/ListingDetails';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/navbar/Header'
import Footer from './components/Footer';

import { UserProvider } from './contexts/user/UserContext';
import { LoadingProvider } from './contexts/loading/LoadingContext';


function App() {
  return (
    <UserProvider>
      <LoadingProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/sign-in' element={<SignIn />} />
              <Route exact path='/sign-up' element={<SignUp />} />
              <Route path='*' element={<NotFound404 />} />
              <Route exact path='/forgot-password' element={<ForgotPassword />} />
              <Route exact path='/explore' element={<Home />} />
              <Route path='/profile' element={<PrivateRoute route='/sign-in' />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route exact path='category/:categoryName' element={<Listings />} />
              <Route exact path='/create-listing' element={<CreateListing />} />
              <Route exact path='/edit-listing/:listingId' element={<EditListing />} />
              <Route exact path='/category/:categoryName/:listingId' element={<ListingDetails />} />
              <Route path='/contact/:carOwnerId' element={<PrivateRoute route='/sign-in' />}>
                <Route path='/contact/:carOwnerId' element={<Contact />} />
              </Route>
            </Routes>
            
            <Footer />
          </Router>
      </LoadingProvider>
      </UserProvider>
  );
}

export default App;
