import React from 'react'
import NoteForm from './NoteForm'
import {connect} from 'react-redux'
import {startPutNote} from '../../actions/notes'

function NoteEdit(props){

    const handleSubmit = (id, formData) => {
        props.dispatch(startPutNote(id, formData, props.history, props.match.params.batchId, props.match.params.agendaId))
    }
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"80%"}}>
            <h3 style={{textAlign:"center"}}>Edit a note</h3>
        <NoteForm 
            batch={props.match.params.batchId} 
            agenda = {props.match.params.agendaId} 
            handleSubmit = {handleSubmit}
            code = {props.location.state.code}
            title = {props.location.state.title}
            description = {props.location.state.title}
            tags = {props.location.state.tags}
        />
        </div>   
    )
}


export default connect()(NoteEdit)