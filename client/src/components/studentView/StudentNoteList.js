import React from 'react'
import Note from '../notes/Note'
import { connect } from 'react-redux'
import {startGetStudentNotes} from '../../actions/studentNotes'
import {addStudentNote} from '../../actions/studentNotes'
import io from 'socket.io-client'

class StudentNoteList extends React.Component{

    componentDidMount() {
        // const socket = io('http://localhost:3010')
        const socket = io(window.location.origin)
        socket.on('message', (message) => {
            if (message._id) {
                const newNote = message
                if (!this.props.notes.find(note=>note._id === newNote._id)) {
                    this.props.dispatch(addStudentNote(newNote))
                }
            }
        })
        this.props.agenda._id ? this.props.dispatch(startGetStudentNotes(this.props.agenda._id)) : this.props.history.push('/')
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%"}}>
                <h3 style={{marginBottom:0}}>{this.props.agenda.title} - <span style={{color: "#f50057"}}>{this.props.agenda && this.props.agenda.otp}</span></h3>
                
                {this.props.agenda.description}
                <br/>
                
                {
                    this.props.notes.map(note => {
                        return <div key={note._id} 
                        style={{margin:10, width:"80%", display:"flex", flexDirection:"column", justifyContent:"center"}}
                    >
                        <Note {...note} editAccess={false}/>
                    </div>
                    })
                }
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agenda: state.studentAgenda,
        notes: state.studentNotes
    }
}

export default connect(mapStateToProps)(StudentNoteList)