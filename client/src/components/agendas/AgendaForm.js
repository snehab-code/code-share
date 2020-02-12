import React from 'react'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {withRouter} from 'react-router-dom'
import {DatePicker,DateTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {connect} from 'react-redux'


class AgendaForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.agenda ? this.props.agenda.title : '',
            description: this.props.agenda ? this.props.agenda.description : '',
            batch: this.props.agenda ? this.props.agenda.batch : this.props.batch,
            otp: this.props.agenda ? this.props.agenda.otp : Math.random().toString(36).slice(2,8).toUpperCase(),
            agendaDate: moment(this.props.agendaDate),
            viewMinRange: this.props.agenda ? moment(this.props.agenda.viewMinRange) : null,
            viewMaxRange: this.props.agenda ? moment(this.props.agenda.viewMaxRange) : null,
            isVisible: false,
            tags: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            batch: this.state.batch,
            otp: this.state.otp,
            agendaDate: this.state.agendaDate,
            isVisible: this.state.isVisible
        }
        if (this.state.viewMinRange) {
            formData.viewMinRange = this.state.viewMinRange
        }
        if (this.state.viewMaxRange) {
            formData.viewMaxRange = this.state.viewMaxRange
        }
        if (this.state.tags.length > 0) {
            formData.tags = this.state.tags
        }
        let id
        if (this.props.agenda) {id = this.props.agenda._id}
        this.props.handleSubmit(formData, id)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    handleOtpGeneration = () => {
        this.setState({otp: Math.random().toString(36).slice(2,8).toUpperCase()})
    }

    handleCancel = () => {
        this.props.closeModal()
    }

    handleDateChange = (name, date) => {
        console.log(date)
        switch (name) {
            case 'agendaDate': 
             const agendaDate = moment(date._d)
             this.setState({agendaDate})
             break;
            case 'viewMinRange' : 
             const viewMinRange = moment(date._d)
             this.setState({viewMinRange})
             break;
            case 'viewMaxRange' : 
             const viewMaxRange = moment(date._d)
             this.setState({viewMaxRange})
             break;
            default:
             console.log('whoops it broke')
        }
    }

    render() {
        console.log('agendaForm', this.props)
        return (
            <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <form style={{textAlign:"center", padding:10}} onSubmit={this.handleSubmit}>

                    {/* Agenda date picker renders only on edit */}
                    {
                        !this.props.edit ?
                            <div>
                            <h3>{this.state.agendaDate && ` ${this.state.agendaDate.format('dddd, MMMM DD')}`}</h3>
                            </div>
                        :
                        <DatePicker value={this.state.agendaDate} onChange={(date) => this.handleDateChange('agendaDate', date)} />

                    }

                    {/* OTP */}

                    <h2>{this.state.otp}</h2>
                    <Button size="small" color="secondary" onClick={this.handleOtpGeneration}>Regenerate OTP</Button>
                    <br/>

                    {/* Title, description */}
                    <TextField margin="dense" required={true} size="small" name="title" label="title" value={this.state.title} onChange={this.handleChange} style={{width: 300}}/>
                    <br/>
                    <TextField margin="dense" required={true} size="small" name="description" label="description" value={this.state.description} onChange={this.handleChange} style={{width: 300, fontSize: "8px"}}/>
                    <br/>

                    {/* Duration */}
                    <DateTimePicker 
                        margin="dense" label="Available from" style={{width: 300}}
                        value={this.state.viewMinRange}
                        onChange={(date) => this.handleDateChange('viewMinRange', date)}
                    />
                    <br/>
                    <DateTimePicker 
                        margin="dense" label="to" style={{width: 300}}
                        value={this.state.viewMaxRange}
                        onChange={(date) => this.handleDateChange('viewMaxRange', date)}
                    />
                    <br/>

                    <br/>
                    <input type="submit" />
                </form>  
                <button onClick={this.handleCancel}>Cancel</button>
            </MuiPickersUtilsProvider>
            </> 
        )
    }
}

const mapStateToProps = (state, props) => {
    return{
        agenda: state.agendas.find(agenda=> agenda._id == props.agendaId)
    }
}

export default withRouter(connect(mapStateToProps)(AgendaForm))