import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import AdminForm from './AdminForm'

import BatchList from './batches/BatchList';
import BatchShow from './batches/BatchShow'
import AgendaShow from './agendas/AgendaShow'
import AgendaList from './agendas/AgendaList'

function AdminLanding(props) {
    console.log(props)
    return(
        <>
            {
                props.isLoggedIn === false && <Redirect to="/code-admin" />
            }
            {
                props.isLoggedIn === false && <AdminForm />
            }
            {
                props.isLoggedIn && props.location.pathname=="/code-admin" && <Redirect to="/code-admin/batches" />
            }
        <Switch>
        {/* batches */}

        <Route path="/code-admin/batches" component={BatchList} exact/>
        <Route path="/code-admin/batches/:batchId" component={BatchShow} exact/>

        {/* agendas */}
        <Route path="/code-admin/batches/:batchId/agendas" component={AgendaList} />
        <Route path="/code-admin/batches/agendas/:agenda" component={AgendaShow} />

        {/* student agenda view */}
        
      </Switch>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(AdminLanding)