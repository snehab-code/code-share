import React from 'react'
import NoteForm from './NoteForm'
import axios from '../../config/axios'

class NoteAdd extends React.Component{

    handleSubmit = (formData) => {
        
        axios.post(`/notes`, formData)
            .then((response) => {
                this.props.history.push(`/code-admin/batches/${this.props.match.params.batchId}/agendas/${this.props.match.params.agendaId}/notes`)
            })
            .catch(err => {
                this.props.history.push('/code-admin')
            })
    }

    render() {
        const defaults = {
            htmlmixed: '',
            javascript: '',
            css : ''
          }
        return (
         <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
           <NoteForm 
                batch={this.props.match.params.batchId} 
                agenda = {this.props.match.params.agendaId} defaults = {defaults} handleSubmit = {this.handleSubmit} 
            />
         </div>   
        )
    }
}

export default NoteAdd