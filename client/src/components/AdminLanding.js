import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Switch, Route} from 'react-router-dom'
import AdminForm from './AdminForm'

import BatchList from './batches/BatchList';
import BatchShow from './batches/BatchShow'
import BatchEdit from './batches/BatchEdit'
import NoteList from './notes/NotesList'
import NoteAdd from './notes/NoteAdd'
import NoteEdit from './notes/NoteEdit'

function AdminLanding(props) {
    return(
        <>
            {
                props.isLoggedIn == false && <Redirect to="/code-admin" />
            }
            {
                props.isLoggedIn === false && <AdminForm />
            }
            {
                props.isLoggedIn && props.location.pathname==="/code-admin" && <Redirect to="/code-admin/batches" />
            }
        <Switch>
        {/* batches */}

        <Route path="/code-admin/batches" component={BatchList} exact/>
        <Route path="/code-admin/batches/:batchId" component={BatchShow} exact/>
        <Route path="/code-admin/batches/:batchId/edit" component={BatchEdit} exact />

        {/* agendas */}
        <Route path="/code-admin/batches/:batchId/agendas" component={BatchShow} exact />
        <Route path="/code-admin/batches/:batchId/agendas/:agendaId/notes" component={NoteList} exact/>

        <Route path="/code-admin/batches/:batchId/agendas/:agendaId/notes/add" component={NoteAdd} exact/>
        <Route path="/code-admin/batches/:batchId/agendas/:agendaId/notes/edit" component={NoteEdit} />

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