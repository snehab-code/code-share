import React from 'react'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {withRouter} from 'react-router-dom'
import {DatePicker,DateTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {connect} from 'react-redux'
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class AgendaForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.agenda ? this.props.agenda.title : '',
            description: this.props.agenda ? this.props.agenda.description : '',
            batch: this.props.agenda ? this.props.agenda.batch : this.props.batch,
            otp: this.props.agenda ? this.props.agenda.otp : Math.random().toString(36).slice(2,8).toUpperCase(),
            agendaDate: this.props.agendaDate ? moment(this.props.agendaDate) : moment(Date.now()),
            viewMinRange: this.props.agenda && this.props.agenda.viewMinRange ? moment(this.props.agenda.viewMinRange) : null,
            viewMaxRange: this.props.agenda && this.props.agenda.viewMaxRange ? moment(this.props.agenda.viewMaxRange) : null,
            duration: '',
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
        if (this.state.viewMinRange && this.state.viewMaxRange) {
            formData.viewMinRange = this.state.viewMinRange
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
    }

    handleOtpGeneration = () => {
        this.setState({otp: Math.random().toString(36).slice(2,8).toUpperCase()})
    }

    handleCancel = () => {
        this.props.closeModal()
    }

    handleDuration = (e) => {
        const duration = e.target.value 
        this.setState({duration})

        const setDuration = (unit) => {

            const time = duration.split('').filter(char => {
                if (Number(char)) {
                    return char
                } else if (char == '.') {
                    return char
                }
            }).join('')
            if (!duration.toLowerCase().includes('from now')) {
                this.setState(prevState => {
                    const startTime = moment(prevState.viewMinRange)
                    return {viewMaxRange: startTime.add(time, unit)}
                })
            } else {
                const startTime = moment(Date.now())
                this.setState({viewMaxRange: startTime.add(time, unit), viewMinRange: moment(Date.now())})
            }
        }
        
        if (duration.toLowerCase().includes('hours') || duration.toLowerCase().includes('h') || duration.toLowerCase().includes('hour')) {
            setDuration('hours')
        } else if (duration.toLowerCase().includes('days') || duration.toLowerCase().includes('d') || duration.toLowerCase().includes('day') ) {
            setDuration('days')
        } else if (duration.toLowerCase().includes('minutes') || duration.toLowerCase().includes('min') || duration.toLowerCase().includes('m')){
            setDuration('minutes')
        } else if (duration === '') {
            this.setState({viewMaxRange: this.props.agenda ? moment(this.props.agenda.viewMaxRange) : null, viewMinRange: this.props.agenda ? moment(this.props.agenda.viewMinRange) : null,})
        }



    }

    handleDateChange = (name, date) => {
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
        return (
            <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <form style={{textAlign:"center", padding:10}} onSubmit={this.handleSubmit}>

                    {/* Agenda date picker renders only on edit */}
                    {
                        !this.props.edit && this.props.agendaDate ?
                            <div>
                            <h3>{this.state.agendaDate && ` ${this.state.agendaDate.format('dddd, MMMM DD')}`}</h3>
                            </div>
                        :

                        this.props.agendaDate ? 

                            <div>
                            <h3>{this.state.agendaDate && ` ${this.state.agendaDate.format('dddd, MMMM DD')}`}</h3>
                            </div>
                        :
                        <DatePicker value={this.state.agendaDate ? this.state.agendaDate : ''} onChange={(date) => this.handleDateChange('agendaDate', date)} />

                    }

                    {/* OTP */}

                    <h2>{this.state.otp}</h2>
                    <Button size="small" color="secondary" onClick={this.handleOtpGeneration}>Regenerate OTP</Button>
                    <br/>

                    {/* Title, description */}
                    <TextField margin="dense" required={true} size="small" name="title" label="title" value={this.state.title} onChange={this.handleChange} style={{width: 300}}/>
                    <br/>
                    <div style={{width:"300px"}}>
                    </div>
                    <TextField margin="dense" size="small" name="description" label="description" multiline value={this.state.description} onChange={this.handleChange} style={{width: 300, fontSize: "8px"}}/>
                    <br/>

                    {/* Duration */}
                    <DateTimePicker 
                        margin="dense" label="Available from" style={{width: 300}}
                        value={this.state.viewMinRange}
                        onChange={(date) => this.handleDateChange('viewMinRange', date)}
                    />
                    <br/>
                    {/* <DateTimePicker 
                        margin="dense" label="to" style={{width: 300}}
                        value={this.state.viewMaxRange}
                        onChange={(date) => this.handleDateChange('viewMaxRange', date)}
                    /> */}
                    <TextField margin="dense" size="small" name="duration" label={this.state.viewMaxRange ? moment(this.state.viewMaxRange).format('MMMM Do YYYY, h:mm:ss a') : 'Duration'} value={this.state.duration} onChange={this.handleDuration} style={{width: 300, fontSize: "8px"}}/>
                    <br/>
                    <br/>
                    <Button type="submit" variant="outlined" size="small" color="secondary">Submit</Button>
                </form> 
            </MuiPickersUtilsProvider>
            </> 
        )
    }
}

const mapStateToProps = (state, props) => {
    return{
        agenda: state.agendas.find(agenda=> agenda._id === props.agendaId)
    }
}

export default withRouter(connect(mapStateToProps)(AgendaForm))