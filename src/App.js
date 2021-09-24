import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './pages/landing/LandingPage';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import SignInPage from './pages/sign-in/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import VerifyPhonePage from './pages/signup/VerifyPhonePage';
import AddPhotoPage from './pages/signup/AddPhotoPage';
import TellUsAboutYouPage from './pages/signup/TellUsAboutYouPage';
import SetAvailabilityPage from './pages/signup/SetAvailabilityPage';
import { UserProvider } from './state/UserContext';
import UserAuth from "./state/UserAuth";
import FindHustlerPage from './pages/search/FindHustlerPage';
import UserProfilePage from './pages/profile/UserProfilePage';
import ReviewHustlerPage from './pages/ReviewHustlerPage';
import JobsPage from './pages/jobs-page/JobsPage';
import ChooseUserTypePage from './pages/signup/ChooseUserTypePage';
import EditProfilePage from './pages/profile/edit-profile/EditProfilePage';
import EditAvailabilityPage from './pages/profile/edit-profile/EditAvailabilityPage';
import BookingsPage from './pages/bookings-page/BookingsPage';
import TestPage from './pages/TestPage';
import NavBar from './components/NavBar';
import TermsOfServicePage from './pages/terms/TermsOfServicePage';
import CongratsOnAccountPage from './pages/signup/CongratsOnAccountPage';
import SetupPaymentPage from './pages/subscription/SetupPaymentPage';
import PaymentFailedPage from './pages/subscription/PaymentFailedPage';
import AddServicesPage from './pages/signup/AddServicesPage';
import MySubscriptionPage from './pages/subscription/MySubscriptionPage';
import TermsOfServiceFooterPage from './pages/terms/TermsOfServiceFooterPage';
import SignInBeforeReviewPage from './pages/sign-in/SignInBeforeReviewPage';
import api from "./api";
import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
import NavbarBanner from './components/NavbarBanner';
import FreeTrialExpiredPage from './pages/subscription/FreeTrialExpiredPage';
import AliasProfile from "./pages/profile/AliasProfile";
import Typography from 'material-ui/styles/typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#05C9FF'
    },
    secondary: {
      main: '#DFC168'
    },
  },

  overrides: {
    // Style sheet name ⚛️
    Modal: {
      outline: "none",
      "&:focus": {
        outline: "none"
      }
    },
  },
});

const TRACKING_ID = "UA-196731501-1";
ReactGA.initialize(TRACKING_ID, { debug: true });

function App() {

  const fetchData = async () => {
    try {
      let response = await api.auth.me();
      ReactGA.set({
        userId: response?.data?.user?._id
      });
      console.log("set ReactGA", response?.data?.user?._id);
    }
    catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const [city, setCity] = useState("");

  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <UserAuth>
          <div className="App">
            <Router >
              <Route path="/" render={({ location }) => {
                // if (typeof window.ga === 'function') {
                //   window.ga('set', 'page', location.pathname + location.search);
                //   window.ga('send', 'pageview');
                // }
                ReactGA.set({ page: location.pathname + location.search }); // Update the user's current page
                ReactGA.pageview(location.pathname); // Record a pageview for the given page
                console.log("analytics page", location.pathname, location.search);
                return null;
              }} />
           
              <NavBar setCity={setCity}/>
              {/* <NavbarBanner /> */}
              <Switch>
                <Route path="/login/" component={SignInPage} />

                <Route path="/signup/" component={SignUpPage} />
                <Route path="/verify-phone/" component={VerifyPhonePage} />
                <Route path="/choose-type/" component={ChooseUserTypePage} />
                <Route path="/add-photo/" component={AddPhotoPage} />
                <Route path="/tell-us-about/" component={TellUsAboutYouPage} />
                <Route path="/set-availability/" component={SetAvailabilityPage} />
                <Route path="/profile/:id" component={UserProfilePage} />
                <Route path="/home/" component={BookingsPage} />
                <Route path="/edit-profile/" component={EditProfilePage} />
                <Route path="/edit-availability/" component={EditAvailabilityPage} />
                <Route path="/search/:searchParam" component={FindHustlerPage} />
                <Route path="/review/:id" component={SignInBeforeReviewPage} />
                <Route path="/review-signed-in/:id" component={ReviewHustlerPage} />
                <Route path="/jobs/" component={JobsPage} />
                <Route path="/terms/" component={TermsOfServiceFooterPage} />
                <Route path="/terms-of-service/" component={TermsOfServicePage} />
                <Route path="/congrats/" component={CongratsOnAccountPage} />
                <Route path="/setup-payment/" component={SetupPaymentPage} />
                <Route path="/f/" component={PaymentFailedPage} />
                <Route path="/add-services/" component={AddServicesPage} />
                <Route path="/my-subscription/" component={MySubscriptionPage} />
                <Route path="/activate-hustlehub/" component={FreeTrialExpiredPage} />
                {/* <Route path="/test/" component={TestPage} /> */}
                <Route path="/:alias/" component={AliasProfile} />
                <Route path="/*" component={() => <LandingPage city={city} />} />
              </Switch>
            </Router>
          </div>
        </UserAuth>

      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
