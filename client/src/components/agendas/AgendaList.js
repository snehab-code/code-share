import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './fullCalendar.css'
import Modal from 'react-modal'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DataTable, {createTheme} from 'react-data-table-component'
import moment from 'moment'
import AgendaAdd from './AgendaAdd'
import AgendaShow from './AgendaShow'
import {startDeleteAgenda} from '../../actions/agendas'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import Swal from 'sweetalert2'

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
            add: false,
            showList: true,
            columns: [
                {
                    name: 'Title',
                    selector: 'title',
                    sortable: true,
                    grow: 4,
                    cell: row => `${row.title.title}`,
                },
                {
                    name: 'Description',
                    selector: 'description',
                    grow: 2
                },
                {
                    name: 'Date',
                    selector: 'agendaDate',
                    sortable: true,
                    cell: row => `${moment(row.agendaDate).format('ddd, MMM DD')}`,
                    grow: 2
                },
                {
                    name: 'OTP',
                    selector: 'otp',
                    center: true
                },
                {
                    name: 'Available',
                    selector: 'isAvailable',
                    cell: row => row.isAvailable ? <CheckIcon size="small" color="secondary" /> : <ClearIcon size="small" />,
                    center: true
                },
                {
                    name: 'Viewable',
                    selector: 'isViewable',
                    cell: row => row.isViewable ? <CheckIcon size="small" color="secondary" /> : <ClearIcon size="small" />,
                    center: true
                }
            ]
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
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all notes linked to this agenda",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.props.dispatch(startDeleteAgenda(id))
                this.closeModal()
            }
          })
    }

    handleRowClicked = (row) => {
        const agendaId = row.title.id
        this.setState({agendaShow: agendaId, modalIsOpen: true})
    }

    handleView = (val) => {
        this.setState({showList: val})
    }

    handleAdd = () => {
        this.setState({modalIsOpen: true, add: true})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false, agendaShow: null, newDate: null, add:false})
    }

    render() {
        return(
            <>
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
                {
                    this.state.showList ?
                    <>
                    <Button style={{marginTop:"-5px"}} size="small" color="secondary" onClick={() => this.handleView(false)}>Calendar View</Button>
                    <DataTable
                        title="Agendas"
                        highlightOnHover
                        actions={(
                            <IconButton
                            color="secondary"
                            onClick={this.handleAdd}
                          >
                            <Add />
                          </IconButton>
                        )}
                        columns={this.state.columns}
                        data={this.props.listAgendas}
                        onRowClicked={this.handleRowClicked}
                    />
                    </>
                    :
                    <>
                    <Button style={{marginTop:"-5px"}} size="small" color="secondary" onClick={() => this.handleView(true)}>List View</Button>
                    <div style={{width:"60%", minWidth:300, zIndex:0}}>      
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
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        agendas: state.agendas.filter(agenda=> agenda.batch === props.match.params.batchId),
        listAgendas: state.agendas.filter(agenda => agenda.batch === props.match.params.batchId).map(agenda=> {
            return {
                title: {title: agenda.title, id: agenda._id},
                description: agenda.description,
                agendaDate: agenda.agendaDate,
                isAvailable: agenda.isAvailable,
                isViewable: moment()._d > moment(agenda.viewMinRange)._d && moment()._d < moment(agenda.viewMaxRange)._d ? true : false,
                otp: agenda.otp
            }
        }),
        calendarEvents: state.agendas.filter(agenda=> agenda.batch === props.match.params.batchId).map(agenda=> {
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