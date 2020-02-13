import React from 'react'
import NoteForm from './NoteForm'
import axios from '../../config/axios'

class NoteEdit extends React.Component{
    constructor() {
        super()
        this.state = {
            note : {},
            tagNames : []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id       
        axios.all([    
            axios.get(`/notes/${id}`),
            axios.get(`/tags`)

        ])
        .then(axios.spread((note,tags) =>{
            this.setState({note:note.data,tags:tags.data})
            
        }))
        .catch(err => {
            this.props.history.push('/code-admin')
        })
    }

    handleSubmit = (formData) => {
        formData.tags = formData.tags.map(t=> t.value)
        
        axios.put(`/notes/${this.props.match.params.id}`, formData)
        .then((response) => {
            this.props.history.push(`/code-admin/batches/${this.props.match.params.batchId}/agendas/${this.props.match.params.agendaId}/notes`)
        })
        .catch(err => {
            this.props.history.push('/code-admin')
        })
    }
    
    render() {
        return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <strong>Edit</strong>        {
               (Object.keys(this.state.note).length !=0 ) && <NoteForm {...this.state.note} handleSubmit = {this.handleSubmit} />
           } 

         </div>   
        )
    }
}

export default NoteEdit