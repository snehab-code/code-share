import React from 'react'
import Note from './Note'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { startDeleteNote, startPutNote } from '../../actions/notes'
import {Link} from 'react-router-dom'

// styles for Modal

function NoteList(props){

    const handleRemove = (id) => {
        props.dispatch(startDeleteNote(id))
    }

    return (
        <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%"}}>

            <h3 style={{margin:20}}>{props.batch && props.batch.name} - <span style={{color: "#f50057"}}>{props.agenda && props.agenda.otp}</span></h3>
            
            <Link style={{textDecoration: "none"}} to={`/code-admin/batches/${props.match.params.batchId}/agendas/${props.match.params.agendaId}/notes/add`}>
                <Button variant="outlined" size="small" color="secondary">Add Notes</Button>
            </Link>
            <br/>
            
            {
                props.notes.map(note => {
                    return <div key={note._id} 
                    style={{margin:10, width:"80%", display:"flex", flexDirection:"column", justifyContent:"center"}}
                >
                    <Note {...note} editAccess={true} batchId={props.match.params.batchId} agendaId ={props.match.params.agendaId} handleRemove = {handleRemove}/>
                </div>
                })
            }
        </div> 
    )
}

const mapStateToProps = (state, props) => {
    return {
        batch: state.batches.find(batch => batch._id == props.match.params.batchId),
        agenda: state.agendas.find(agenda => agenda._id == props.match.params.agendaId),
        notes: state.notes.filter(note => note.agenda._id == props.match.params.agendaId)
    }
}

export default connect(mapStateToProps)(NoteList)