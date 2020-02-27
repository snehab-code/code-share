import React from 'react'
import Note from '../notes/Note'
import { connect } from 'react-redux'
import {startGetStudentNotes, removeStudentNote, addStudentNote, updateStudentNote} from '../../actions/studentNotes'
import io from 'socket.io-client'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

class StudentNoteList extends React.Component{
    constructor() {
        super()
        this.state={
            remainingTime: {}
        }
    }

    componentDidMount() {
        const socket = io('http://localhost:3010')
        // const socket = io(process.env.REACT_APP_SERVER_URL)
        // const socket = io(window.location.origin)
        socket.on('added', (message) => {
            if (message._id) {
                const newNote = message
                if (!this.props.notes.find(note=>note._id === newNote._id)) {
                    this.props.dispatch(addStudentNote(newNote))
                }
            }
        })
        socket.on('deleted', (message) => {
            if (this.props.notes.find(note => note._id === message)) {
                this.props.dispatch(removeStudentNote(message))
            }
        })
        socket.on('edited', message => {
            const find = this.props.notes.find(note => note._id===message._id)
            if (find) {
                this.props.dispatch(updateStudentNote(find._id, message))
            }
        })
        this.props.agenda._id ? this.props.dispatch(startGetStudentNotes(this.props.agenda._id)) : this.props.history.push('/')

        if (this.props.agenda.viewMaxRange && this.props.agenda.viewMaxRange && (moment(this.props.agenda.viewMaxRange) > moment.now())) {
            const remainingTime = moment.duration(moment(this.props.agenda.viewMaxRange).diff(moment.now()))
            this.setState({remainingTime})
            this.countdown()
        }
    }

    countdown = () => {
        this.timer = setInterval(() => {
            const remainingTime = moment.duration(moment(this.props.agenda.viewMaxRange).diff(moment.now()))
            if (remainingTime._milliseconds > 0) {
                this.setState({remainingTime: moment.duration(moment(this.props.agenda.viewMaxRange).diff(moment.now()))})
            }
            else {
                clearInterval()
            }
        },1000)
    }

    componentWillUnmount = () => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"100%"}}>
                <h3 style={{marginBottom:0}}>{this.props.agenda.title} - <span style={{color: "#f50057"}}>{this.props.agenda && this.props.agenda.otp}</span></h3>
                {this.props.agenda.description}
                <br/>
                { this.state.remainingTime._data &&
                    <span style={{fontSize: "2em", marginTop:"10px"}}>{this.state.remainingTime._data.hours +  " : " + (this.state.remainingTime._data.minutes > 9 ? this.state.remainingTime._data.minutes : '0'+this.state.remainingTime._data.minutes) + " : " + (this.state.remainingTime._data.seconds > 9 ? this.state.remainingTime._data.seconds : '0'+this.state.remainingTime._data.seconds)}</span>
                }

                <br/>
                {
                    this.props.notes[0] && this.props.notes[0].isLoading ? 

                    <CircularProgress color="secondary" />

                    :

                    this.props.notes[0] && this.props.notes[0]._id ? 

                    this.props.notes.map(note => {
                        return <div key={note._id} 
                        style={{margin:10, width:"80%", display:"flex", flexDirection:"column", justifyContent:"center"}}
                    >
                        <Note {...note} editAccess={false}/>
                    </div>
                    })

                    :

                    <h3>No notes have been added</h3>
                }
                <br/>
                <Link to="/" style={{textDecoration:"none"}}><Button variant="outlined" color="secondary" onClick={this.handleReset}>Back</Button></Link>
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