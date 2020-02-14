import React from 'react'
import {Link, withRouter} from 'react-router-dom'

// fullCalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './fullCalendar.css'

// modal
import Modal from 'react-modal'

// components
import AgendaAdd from './AgendaAdd'
import AgendaShow from './AgendaShow'
import {startDeleteAgenda} from '../../actions/agendas'

import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'

// styles for Modal
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'white',
        display               : "flex",
        flexDirection         : "column",
        alignItems            : "center"
      }
}

class AgendaList extends React.Component{
    constructor() {
        super()
        this.state = {
            newDate: null,
            modalIsOpen: false,
            agendaShow: null,
            add: false
        }
    }

    componentDidMount() {
        Modal.setAppElement('#root')  
    }

    handleDateClick = (newDate) => {
        newDate = newDate.date
        this.setState({newDate, modalIsOpen: true, add: true})
    }

    handleEventClick = (event) => {
        const agendaId = event.event._def.extendedProps.agendaId
        this.setState({agendaShow: agendaId, modalIsOpen: true})
    }

    handleRemove = (id) => {
        this.props.dispatch(startDeleteAgenda(id))
        this.closeModal()
    }

    closeModal = () => {
        this.setState({modalIsOpen: false, agendaShow: null, newDate: null, add:false})
    }

    render() {
        console.log(this.props)
        return (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Agenda Modal"
                    >
                    {   
                    // if event was clicked this renders
                        this.state.agendaShow ?
                        <AgendaShow agendaId={this.state.agendaShow} closeModal = {this.closeModal} handleEditAdd={this.handleEditAdd} handleRemove={this.handleRemove}/>
                        :
                    // else date was clicked and this renders. Added additional condition to prevent add from rerendering when edit is submitted (when agendaShow still has the id)
                        this.state.add && <AgendaAdd agendaDate = {this.state.newDate} batchId = {this.props.match.params.batchId} closeModal = {this.closeModal} handleEditAdd={this.handleEditAdd}/>
                    }
                </Modal>
                

                <div style={{width:"50%", zIndex: 0}}>      
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                        left: "prev,next today",
                        center: "",
                        right: "title"
                        }}
                        buttonText = {{
                            today: 'today',
                            prev: '<',
                            next: '>'
                        }}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={this.props.calendarEvents}
                        dateClick={this.handleDateClick}
                        eventClick={this.handleEventClick}
                    />
                </div>
                
                <Link style={{textDecoration:"none"}} to="/code-admin/batches"><Button size="small" color="secondary">Back</Button ></Link>
                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        agendas: state.agendas.filter(agenda=> agenda.batch == props.match.params.batchId),
        calendarEvents: state.agendas.filter(agenda=> agenda.batch == props.match.params.batchId).map(agenda=> {
            return {
                title: agenda.title,
                start: agenda.agendaDate,
                allDay: true,
                agendaId: agenda._id
            }
        })
    }
} 

export default withRouter(connect(mapStateToProps)(AgendaList))