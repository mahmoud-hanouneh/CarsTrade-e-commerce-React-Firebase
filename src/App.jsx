import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Profile from './pages/Profile'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import Offers from './pages/Offers';
import Explore from './pages/Explore';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
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
          <Route exact path='/' element={<Explore />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/forgot-password' element={<ForgetPassword />} />
          <Route exact path='/offers' element={<Offers />} />
          <Route exact path='/explore' element={<Explore />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route exact path='category/:categoryName' element={<Listings />} />
          <Route exact path='/create-listing' element={<CreateListing />} />
          <Route exact path='/category/:categoryName/:listingId' element={<ListingDetails />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
