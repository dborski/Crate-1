// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'

// User routes
// Annotation: Changes the url and renders components
export default {
  login: {
    path: '/user/login',
    component: Login
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }
}
// ANNOTATION: Another route will need to be added here in order for our StyleSurvey Component
// to render, and for the user to be taken to our new route:
//
// styleSurvey: {
//   path: '/user/style-preferences',
//   component: StyleSurvey,
//   auth: true
// }

// TODO: going to need new route for styleSurvey
// TODO: Create a new component called styleSurvey