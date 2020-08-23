// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
// Whoever made this applications is referring to the reducer/s as STATE… everywhere…
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }
// ANNOTATION: Once the user's data has been retrieved from the backend, it is then being set when this reducer is called in code/web/src/modules/user/api/actions.js
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default:
      return state
  }
}

// TODO: Create new case for ADD_STYLE_PREFERENCE
// TODO: modifies user.details.stylePreference