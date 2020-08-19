// App Imports
import List from '../../modules/crate/List'

// Crate routes
export default {
  list: {
    path: '/crates',
    component: List,
    auth: true
  }
}

// TODO here is the path specific to our track