import React from 'react'
import axiosStudent from '../../config/axiosStudent'
import Note from './Note'
import Button from '@material-ui/core/Button'
import io from 'socket.io-client'
import axios from '../../config/axios'

class NoteList extends React.Component{
    constructor() {
        super()
        this.state = {
            notes: [],
            editAccess: false,
            otp: ""
        }
    }

    componentDidMount() {
        if (this.props.match.path == "/agendas/:agendaId") {
            this.setState({editAccess: false, otp: this.props.location.state? this.props.location.state.otp:""})
            if (!this.props.location.state) {
                this.props.history.push('/')
            }
            axiosStudent.get(`https://dct-code-share-redux.herokuapp.com/api/agendas/${this.props.match.params.agendaId}/notes`)
                .then(response => {
                    const notes = response.data
                    if(Array.isArray(notes)) {
                        this.setState({notes})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            
                let socketUrl
                if (window.location.href.includes('localhost')) {
                    socketUrl = `http://localhost:3010/agendas/${this.props.match.params.agendaId}`
                } else {
                    socketUrl = window.location.href
                }
                const socket = io(socketUrl)
                // const socket = io(`http://localhost:3010/agendas/${this.props.match.params.agendaId}`)
                socket.on('message', (message) => {
                    if (message._id) {
                        const note = message
                        this.setState(prevState => {
                            if (!prevState.notes.find(ele =>  ele._id == note._id )) {        
                                return {notes: [note, ...prevState.notes]}
                            } else {
                                return {notes: [...prevState.notes]}
                            }
                        })
                    }
        
                })
        } else {
            this.setState({editAccess: true})
            axios.get(`/agendas/${this.props.match.params.agendaId}/notes`)
                .then(notes => {
                    this.setState({notes: notes.data})
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`/agendas/${this.props.match.params.agendaId}`)
                .then(agenda => {
                    this.setState({otp: agenda.data.otp})
                })
                .catch(err => {
                    this.props.history.push('/code-admin')
                })
        }  
    }
    handleNotesAdd = () => {
        this.props.history.push(`/code-admin/batches/${this.props.match.params.batchId}/agendas/${this.props.match.params.agendaId}/notes/add`)
    }
    handleEdit = (id) =>{
        this.props.history.push(`/code-admin/batches/${this.props.match.params.batchId}/agendas/${this.props.match.params.agendaId}/notes/edit/${id}`)
    }
    handleRemove = (id) =>{
        
        // axios.delete(`/notes/${id}` )
        // .then(response =>{
        //     this.setState(prevState => ({
        //         notes : prevState.notes.filter(note => note._id !== response.data._id)
        //     }))
        // })
        // .catch(err => alert(err))
    }

    render() { 
        return (
         <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%"}}>
            <h3>{this.state.otp}</h3>
            <br/>
            {
                this.state.editAccess && <Button variant="outlined" size="small" color="secondary" onClick={this.handleNotesAdd}>Add Notes</Button>
            }
            {
                this.state.notes.map(note => {
                    return <div key={note._id} 
                    style={{margin:10, backgroundImage: "linear-gradient(to left,  #e4f0f7, #f2f9fc)", border:"1px solid white", width:"70%", display:"flex", flexDirection:"column", justifyContent:"center"}}
                >
                    <Note batch={this.props.match.params.batchId} 
                         agenda = {this.props.match.params.agendaId} 
                         {...note} 
                         editAccess={this.state.editAccess} handleEdit ={this.handleEdit} handleRemove = {this.handleRemove}/>
                </div>
                })
            }
         </div>   
        )
    }
}

export default NoteList