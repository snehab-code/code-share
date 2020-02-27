import React from 'react'
import NoteForm from './NoteForm'
import {connect} from 'react-redux'
import {startPutNote} from '../../actions/notes'

function NoteEdit(props){

    const handleSubmit = (formData, id) => {
        props.dispatch(startPutNote(id, formData, props.history, props.match.params.batchId, props.match.params.agendaId))
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"80%"}}>
            <h3 style={{textAlign:"center"}}>Edit a note</h3>
        {props.tags[0] && <NoteForm 
            batch={props.match.params.batchId} 
            agenda = {props.match.params.agendaId} 
            handleSubmit = {handleSubmit}
            code = {props.location.state.code}
            title = {props.location.state.title}
            description = {props.location.state.description}
            tags = {props.location.state.tags}
            noteId = {props.location.state.noteId}
        />}
        </div>   
    )
}

const mapStateToProps = (state) => {
    return {tags: state.tags}
}

export default connect(mapStateToProps)(NoteEdit)