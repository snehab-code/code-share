import React from 'react'
import NoteForm from './NoteForm'
import {startPostNote} from '../../actions/notes'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function NoteAdd(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostNote(formData, props.history, props.match.params.batchId, props.match.params.agendaId))
    }
    console.log('note add rendered')
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
            <h4 style={{marginBottom:10, marginTop:10}}><Link to="/code-admin/batches" style={{textDecoration: "none", color:"rgba(0, 0, 0, 0.7)"}} >Batches</Link> / <Link style={{textDecoration: "none", color:"rgba(0, 0, 0, 0.7)"}} to={`/code-admin/batches/${props.match.params.batchId}/agendas`}>
            {props.batch && props.batch.name}</Link> / <span style={{color: "#f50057"}}>{props.agenda && props.agenda.otp}</span></h4>
            <h3 style={{textAlign:"center"}}>Add a note</h3>
        {props.tags[0] && <NoteForm 
            batch={props.match.params.batchId} 
            agenda = {props.match.params.agendaId} handleSubmit = {handleSubmit} 
        />}
        </div>   
    )
}

const mapStateToProps = (state, props) => {
    return {
        tags: state.tags,
        batch: state.batches.find(batch => batch._id === props.match.params.batchId),
        agenda: state.agendas.find(agenda => agenda._id === props.match.params.agendaId)
    }
}

export default connect(mapStateToProps)(NoteAdd)