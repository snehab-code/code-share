import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {connect} from 'react-redux'

// component imports
import StudentLanding from './components/StudentLanding'
import AdminLanding from './components/AdminLanding'

function App(props) {
  return (
    <BrowserRouter>
    <CssBaseline />
      <div className="App" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1 style={{margin:0}}>Code Share</h1>

        {/* landings */}
        <Route path="/" component={StudentLanding} exact />
        <Route path="/code-admin" component={AdminLanding} />

      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user ? state.user.isLoggedIn : ''
  }
}
export default connect(mapStateToProps)(App)
