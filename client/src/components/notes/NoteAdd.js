import React from 'react'
import NoteForm from './NoteForm'
import {startPostNote} from '../../actions/notes'
import {connect} from 'react-redux'

function NoteAdd(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostNote(formData, props.history, props.match.params.batchId, props.match.params.agendaId))
    }

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h3 style={{textAlign:"center"}}>Add a note</h3>
        <NoteForm 
            batch={props.match.params.batchId} 
            agenda = {props.match.params.agendaId} handleSubmit = {handleSubmit} 
        />
        </div>   
    )
}

export default connect()(NoteAdd)