import React from 'react'
import Note from './notes/Note'
import { connect } from 'react-redux'
import {startGetStudentNotes, removeStudentNotes} from '../actions/studentNotes'

// styles for Modal

class StudentNoteList extends React.Component{

    componentDidMount() {
        this.props.agenda._id ? this.props.dispatch(startGetStudentNotes(this.props.agenda._id)) : this.props.history.push('/')
    }

    // componentWillUnmount() {
    //     this.props.dispatch(removeStudentNotes())
    // }

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

const mapStateToProps = (state, props) => {
    console.log(state, 'mapStateToProps')
    return {
        agenda: state.studentAgenda,
        notes: state.studentNotes
    }
}

export default connect(mapStateToProps)(StudentNoteList)