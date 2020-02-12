import React from 'react'
import {connect} from 'react-redux'
import AgendaForm from './AgendaForm'
import {startPostAgenda} from '../../actions/agendas'

function AgendaAdd(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostAgenda(formData))
        props.closeModal()
    }
 
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <AgendaForm batch={props.batchId} handleSubmit = {handleSubmit} agendaDate={props.agendaDate} closeModal = {props.closeModal} />
        </div>   
    )
}

export default connect()(AgendaAdd)