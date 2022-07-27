import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Profile from './pages/Profile'
import NotFound404 from './pages/NotFound404';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgetPassword';
import Offers from './pages/Offers';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Contact from './pages/Contact';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import ListingDetails from './pages/ListingDetails';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/navbar/Header'

import { LoadingProvider } from './contexts/loading/loadingContext';

function App() {
  return (
      <LoadingProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/sign-in' element={<SignIn />} />
            <Route exact path='/sign-up' element={<SignUp />} />
            <Route exact path='/not-found' element={<NotFound404 />} />
            <Route path='/*' element={<NotFound404 />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/offers' element={<Offers />} />
            <Route exact path='/explore' element={<Home />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route exact path='category/:categoryName' element={<Listings />} />
            <Route exact path='/create-listing' element={<CreateListing />} />
            <Route exact path='/edit-listing/:listingId' element={<EditListing />} />
            <Route exact path='/category/:categoryName/:listingId' element={<ListingDetails />} />
            <Route exact path='/contact/:carOwnerId' element={<Contact />} />
          </Routes>
        </Router>
      </LoadingProvider>
  );
}

export default App;
