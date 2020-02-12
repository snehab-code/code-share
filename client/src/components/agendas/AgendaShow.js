import React from 'react'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import AgendaEdit from './AgendaEdit'
import {Link, withRouter} from 'react-router-dom'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {connect} from 'react-redux'
import {startPutAgenda} from '../../actions/agendas'

class AgendaShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAvailable: props.agenda && props.agenda.isAvailable,
            edit: false,
        }
    }

    handleEdit = () => {
        this.setState({edit: true})
    }

    handleVisibleChange = (e) => {
        const isAvailable = e.target.checked
        const formData = {isAvailable}
        this.props.dispatch(startPutAgenda(this.props.agendaId, formData))
        this.setState({isAvailable})
    }


    render() {
        return (
            <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>

                <div>

                    <br/>
                    {   !this.props.agenda ?
                        // rendering after agenda is fetched from the server
                            ""
                        :
                        !this.state.edit ?
                        // if edit is not true, render the show component content
                        <div>
                            <div style={{textAlign:"center", marginBottom:10, width:350}}>
                                <strong>{moment(this.props.agenda.agendaDate.toString()).format('dddd, MMMM DD')}</strong>
                                <br/>
                                
                                <h2>{this.props.agenda.otp}</h2>

                                <strong>{this.props.agenda.title}</strong>
                                <br/>
                                {this.props.agenda.description}
                                <br/>

                                <FormControlLabel style={{margin:10, fontSize:"9px"}}
                                    control={
                                    <Switch checked={this.state.isAvailable} onChange={this.handleVisibleChange} value="isAvailable" />
                                    }
                                    label="Always visible"
                                    labelPlacement = "bottom"
                                />

                                {
                                    this.props.agenda.viewMinRange ? 
                                    <div style={{display:"inline-block", width:"250px", marginTop:15}}>
                                        Available: {moment(this.props.agenda.viewMinRange.toString()).format('hh:mm, dddd, MMMM DD')} to {moment(this.props.agenda.viewMaxRange.toString()).format('hh:mm, dddd, MMMM DD')}
                                    </div> 
                                    :
                                    <span>
                                        <br/>
                                        Not made available
                                    </span>
                                }
                                <br/>
                            </div>
                            
                            {/* Link to edit */}
                        
                            <div style={{textAlign:"center", marginTop:30, marginBottom:10}}>
                            
                                <Button variant="outlined" size="small" color="secondary" style={{marginRight:10}} onClick={this.handleEdit}>
                                   <EditOutlinedIcon fontSize="small" />
                                </Button>

                            {/* Link to NoteList */}

                                <Link to={
                                    Object.keys(this.props.agenda).length > 0 
                                    ? 
                                    `/code-admin/batches/${this.props.agenda.batch}/agendas/${this.props.agenda._id}` 
                                    : 
                                    ""
                                } style={{textDecoration: "none"}}>
                                    <Button variant="outlined" size="small" color="secondary">Show Notes</Button>
                                </Link>
                            
                            {/* Remove agenda */}
                            <Button variant="outlined" size="small" color="secondary" style={{marginLeft:10}} onClick = {() => this.props.handleRemove(this.props.agenda._id)}>
                                <DeleteOutlinedIcon fontSize="small"  />
                            </Button>
                            <br/>

                            </div>


                        </div>
                        : 

                        // if edit is true, render the edit component
                        <AgendaEdit id={this.props.agenda._id} agendaDate={this.props.agenda.agendaDate} closeModal = {this.props.closeModal}/>
                    }
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.agendaId) {
        return {
            agenda: state.agendas.find(agenda=> agenda._id == props.agendaId)
        }
    } else {
        return {
            agenda:state.agendas.find(agenda=> agenda._id == props.match.params.agendaId)
        }
    }
    
}

export default withRouter(connect(mapStateToProps)(AgendaShow))