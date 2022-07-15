import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/ui/Header';
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
import { LoadingProvider } from './contexts/loading/loadingContext';

import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <LoadingProvider>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='category/:categoryName' element={<Listings />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/category/:categoryName/:listingId' element={<ListingDetails />} />
      </Routes>
    </Router>
    </LoadingProvider>
  );
}

export default App;
