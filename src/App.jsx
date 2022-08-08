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

import { LoadingProvider } from './contexts/loading/LoadingContext';
import { UserProvider } from './contexts/user/UserContext';

const ROUTES = {
  Home: {id: '1', element: Home, path: '/'},
  SignIng: {id: '2', element: SignIn, path: '/sign-in'},
  SignUp: {id: '3', element: SignUp, path: '/sign-up'},
  ForgotPassword: {id: '4', element: ForgotPassword, path: '/forgot-password'},
  Listings: {id: '5', element: Listings, path: '/category/:categoryName'},
  CreateListing: {id: '6', element: CreateListing, path: '/create-listing'},
  EditListing: {id: '7', element: EditListing, path: '/edit-listing/:listingId'},
  ListingDetails: {id: '8', element: ListingDetails, path: '/category/:categoryName/:listingId'},
  NotFound404: {id: '9', element: NotFound404, path: '/*'}
}

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
          <Router>
            <Header />
            <Routes>
              {Object.entries(ROUTES).map(route => {
                const [key, value] = route;
                const TopLevelComponent = value.element;
                return (
                  <Route
                    key={key}
                    path={value.path}
                    element={<TopLevelComponent />}
                  />
                )
              })
              }
            
              <Route path='/profile' element={<PrivateRoute route='/sign-in' />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route path='/contact/:carOwnerId' element={<PrivateRoute route='/sign-in' />}>
                <Route path='/contact/:carOwnerId' element={<Contact />} />
              </Route>

            </Routes>

            <Footer />
          </Router>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
