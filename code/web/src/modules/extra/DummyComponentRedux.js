// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// App Imports
// import { someAction } from './api/actions'

// Component
class DummyComponentRedux extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // this.props.someAction()
  }

  render() {
    return (
      <div>
        <h1>Dummy Component Redux</h1>
      </div>
    )
  }
}

// Component Properties
DummyComponentRedux.propTypes = {
  dummyId: PropTypes.number.isRequired,
  // someAction: PropTypes.func.isRequired,
}

// Component State
function dummyComponentReduxState(state) {
  return state
}
// ANNOTATION: This component could be a good 'launching off point' for developing our new Component StyleSurvey

export default connect(dummyComponentReduxState, { /* someAction */ })(DummyComponentRedux)
