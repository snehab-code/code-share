import React from 'react'
import AgendaForm from './AgendaForm'
import {startPutAgenda} from '../../actions/agendas'
import {connect} from 'react-redux'

function AgendaEdit(props) {

    const handleSubmit = (formData, id) => {
        props.dispatch(startPutAgenda(id, formData))
        props.closeModal()
    }
    
    return (
        <div>
            <strong>Edit</strong> 
            <AgendaForm edit={true} handleSubmit={handleSubmit} closeModal = {props.closeModal} agendaDate={props.agendaDate} agendaId={props.id}/>
        </div>
        )
}
export default connect()(AgendaEdit)